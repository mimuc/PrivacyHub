/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { require } from "@project-chip/matter-node-ble.js/require";
import { BLE_MATTER_SERVICE_UUID } from "@project-chip/matter.js/ble";
import { Logger } from "@project-chip/matter.js/log";
import { ByteArray } from "@project-chip/matter.js/util";
import type { Peripheral } from "@abandonware/noble";
import { BleOptions } from "./BleNode.js";

const logger = Logger.get("NobleBleClient");
// // process.env.NOBLE_HCI_DEVICE_ID = "1";
// const noble = require("@stoprocent/noble");
let noble: typeof import("@abandonware/noble");

function loadNoble(hciId?: number) {
    logger.info(`Loading Noble with hciId ${hciId} ...`);
    // load noble driver with the correct device selected
    if (hciId !== undefined) {
        process.env.NOBLE_HCI_DEVICE_ID = hciId.toString();
    }
    noble = require("@abandonware/noble");
    if (typeof noble.on !== "function") {
        // The following commit broke the default exported instance of noble:
        // https://github.com/abandonware/noble/commit/b67eea246f719947fc45b1b52b856e61637a8a8e
        noble = (noble as any)({ extended: false });
    }
}

export class NobleBleClient {
    private readonly discoveredPeripherals = new Map<
        string,
        { peripheral: Peripheral; matterServiceData: ByteArray }
    >();
    private shouldScan = false;
    private isScanning = false;
    private nobleState = "unknown";
    private deviceDiscoveredCallback: ((peripheral: Peripheral, manufacturerData: ByteArray) => void) | undefined;

    constructor(options?: BleOptions) {
        loadNoble(options?.hciId);
        try {
            noble.reset();
        } catch (error: any) {
            logger.debug(
                `Error resetting BLE device via noble (can be ignored, we just tried): ${
                    (error as unknown as Error).message
                }`,
            );
        }

        noble.on("stateChange", (state: string) => {
            this.nobleState = state;
            logger.debug(`Noble state changed to ${state}`);
            if (state === "poweredOn") {
                if (this.shouldScan) {
                    void this.startScanning();
                }
            } else {
                void this.stopScanning();
            }
        });
        noble.on("discover", (peripheral: Peripheral) => this.handleDiscoveredDevice(peripheral));
        noble.on("scanStart", () => (this.isScanning = true));
        noble.on("scanStop", () => (this.isScanning = false));
    }

    public setDiscoveryCallback(callback: (peripheral: Peripheral, manufacturerData: ByteArray) => void) {
        this.deviceDiscoveredCallback = callback;
        for (const { peripheral, matterServiceData } of this.discoveredPeripherals.values()) {
            this.deviceDiscoveredCallback(peripheral, matterServiceData);
        }
    }

    public async startScanning() {
        if (this.isScanning) return;

        this.shouldScan = true;
        if (this.nobleState === "poweredOn") {
            logger.debug("Start BLE scanning for Matter Services ...");
            await noble.startScanningAsync([BLE_MATTER_SERVICE_UUID], false);
        } else {
            logger.debug("noble state is not poweredOn ... delay scanning till poweredOn");
        }
    }

    public async stopScanning() {
        this.shouldScan = false;
        logger.debug("Stop BLE scanning for Matter Services ...");
        await noble.stopScanningAsync();
    }

    private handleDiscoveredDevice(peripheral: Peripheral) {
        // The advertisement data contains a name, power level (if available), certain advertised service uuids,
        // as well as manufacturer data.
        // {"localName":"MATTER-3840","serviceData":[{"uuid":"fff6","data":{"type":"Buffer","data":[0,0,15,241,255,1,128,0]}}],"serviceUuids":["fff6"],"solicitationServiceUuids":[],"serviceSolicitationUuids":[]}
        logger.debug(
            `Found peripheral ${peripheral.address} (${peripheral.advertisement.localName}): ${Logger.toJSON(
                peripheral.advertisement,
            )}`,
        );

        if (!peripheral.connectable) {
            logger.info(`Peripheral ${peripheral.address} is not connectable ... ignoring`);
            return;
        }
        const matterServiceData = peripheral.advertisement.serviceData.find(
            serviceData => serviceData.uuid === BLE_MATTER_SERVICE_UUID,
        );
        if (matterServiceData === undefined || matterServiceData.data.length !== 8) {
            logger.info(`Peripheral ${peripheral.address} does not advertise Matter Service ... ignoring`);
            return;
        }

        this.discoveredPeripherals.set(peripheral.address, { peripheral, matterServiceData: matterServiceData.data });

        this.deviceDiscoveredCallback?.(peripheral, matterServiceData.data);
    }
}
