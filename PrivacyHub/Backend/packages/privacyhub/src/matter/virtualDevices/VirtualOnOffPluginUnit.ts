import { NodeId, DeviceTypeId } from "@project-chip/matter-node.js/datatype";
import { ServerNode } from "@project-chip/matter.js/node";
import { Endpoint } from "@project-chip/matter.js/endpoint";
import { PairedNode } from "@project-chip/matter-node.js/device";
import { OnOffPlugInUnitDevice } from "@project-chip/matter.js/devices/OnOffPlugInUnitDevice";
import VirtualBaseDevice from "./VirtualBaseDevice.js";
import { Logger } from "@project-chip/matter-node.js/log";

const logger = Logger.get("VirtualOnOffPluginUnit");

export default class VirtualOnOffPluginUnit extends VirtualBaseDevice {
    private endpoint: Endpoint<OnOffPlugInUnitDevice> | undefined;
    private onOffEventCallback: (state: boolean) => void;

    private constructor(
        nodeId: NodeId,
        type: DeviceTypeId,
        existingNode: PairedNode,
        onOffEventCallback: (state: boolean) => void
    ) {
        super(
            nodeId,
            type,
            existingNode
        );
        this.onOffEventCallback = onOffEventCallback;
    }

    static async create(
        nodeId: NodeId,
        type: DeviceTypeId,
        existingNode: PairedNode,
        onOffEventCallback: (state: boolean) => void
    ): Promise<VirtualOnOffPluginUnit> {
        const virtualDevice = new VirtualOnOffPluginUnit(
            nodeId,
            type,
            existingNode,
            onOffEventCallback
        );
        await virtualDevice.setup();
        return virtualDevice;
    }

    override initializeVirtualDevice(): Promise<void> {
        logger.info("Initializing Virtual OnOffPluginUnit");
        return new Promise<void>((resolve, reject) => {
            ServerNode.create({
                id: this.uniqueId,

                // Provide Network relevant configuration like the port
                // Optional when operating only one device on a host, Default port is 5540
                // network: {
                //     port, // TODO
                // },

                // Provide Commissioning relevant settings
                // Optional for development/testing purposes
                commissioning: {
                    passcode: this.passcode,
                    discriminator: this.discriminator,
                },

                // Provide Node announcement settings
                // Optional: If Ommitted some development defaults are used
                productDescription: {
                    name: this.productName,
                    deviceType: DeviceTypeId(OnOffPlugInUnitDevice.deviceType),
                },

                // Provide defaults for the BasicInformation cluster on the Root endpoint
                // Optional: If Omitted some development defaults are used
                basicInformation: {
                    vendorName: this.vendorName,
                    vendorId: this.vendorId,
                    nodeLabel: this.nodeLabel,
                    productName: this.productName,
                    productLabel: this.productLabel,
                    productId: this.productId,
                    serialNumber: this.serialNumber,
                    uniqueId: this.uniqueId,
                },
            }).then((serverNode) => {
                logger.info("ServerNode created");
                this.serverNode = serverNode;
                this.endpoint = new Endpoint(
                    OnOffPlugInUnitDevice,
                    {
                        id: this.uniqueId,
                    }
                )
                return this.serverNode.add(this.endpoint);
            }).then((endpoint) => {
                logger.info("Endpoint added");
                endpoint.events.onOff.onOff$Changed.on(value => {
                    logger.info(`OnOff is now ${value ? "ON" : "OFF"}`);
                    this.onOffEventCallback(value);
                });
                // return this.serverNode?.factoryReset();
                logger.info(`Running Server Node ${this.serverNode?.id}`);
                resolve();
                // return this.serverNode?.run();
            }).then(() => {
                logger.info("ServerNode running");
            }).catch((error) => {
                return reject(error);
            });
        });
    }

    override getTypeCode(): number {
        return 266;
    }

    setOnOffState(state: boolean) {
        this.endpoint?.set({
            onOff: {
                onOff: state,
            }
        }).then(() => {
            logger.info(`Set OnOff of virtual device to ${state}`);
        }).catch((error) => {
            logger.error(`Failed to set OnOff of virtual device: ${error}`);
        });
    }
}