import DefaultOverview from '$lib/components/deviceOverviews/DefaultOverview.svelte';
import type { SvelteComponent } from 'svelte';
import BaseDeviceHistory from '$lib/components/deviceHistories/BaseDeviceHistory.svelte';
import { HubConnectionStatus } from '$lib/store/GeneralStore';
import ApiClient from '$lib/api/ApiClient';
import type { AccessLevel } from '$lib/util/EnvChecker';

export enum ConnectionStatus {
	CONNECTED,
	DISCONNECTED,
}

export enum PrivacyState {
	LOCAL,
	ONLINE,
	ONLINE_SHARED,
}

export interface IReturnBaseDeviceState {
	connectionStatus: ConnectionStatus;
	timestamp: number;
}

export default class BaseDevice {
	protected _nodeId: string;
	protected _endpointId: string;
	protected _vendor: string | undefined;
	protected _product: string | undefined;
	protected _manualPairingCode: string;
	protected _qrCode: string;

	protected accessLevel: AccessLevel;

	connectionStatus: ConnectionStatus;
	privacyState: PrivacyState;
	connectedProxy: number;

	constructor(
		nodeId: string,
		endpointId: string,
		vendor: string | undefined,
		product: string | undefined,
		manualPairingCode: string,
		qrCode: string,
		connectionStatus: ConnectionStatus,
		privacyState: PrivacyState,
		connectedProxy: number,
		accessLevel: AccessLevel
	) {
		this._nodeId = nodeId;
		this._endpointId = endpointId;
		this._vendor = vendor;
		this._product = product;
		this._manualPairingCode = manualPairingCode;
		this._qrCode = qrCode;
		this.connectionStatus = connectionStatus;
		this.privacyState = privacyState;
		this.connectedProxy = connectedProxy;
		this.accessLevel = accessLevel;
	}

	initialize = (): Promise<void> => {
		return new Promise<void>((resolve) => {
			resolve();
		});
	}

	getHistory = (): Promise<IReturnBaseDeviceState[]> => {
		return new Promise<IReturnBaseDeviceState[]>((resolve, reject) => {
			ApiClient.getHistory<IReturnBaseDeviceState>(this.accessLevel, this._nodeId, this._endpointId).then((data) => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	getOverviewComponent: any = () => {
		return DefaultOverview;
	}

	getHistoryComponent: any = () => {
		return BaseDeviceHistory;
	}

	getHistoryComponentTitle = (): string => {
		return '';
	}

	getHistoryComponentAttributeName = (): string => {
		return '';
	}

	getHistoryComponentMappings = (): any => {
		return [];
	}

	get nodeId(): string {
		return this._nodeId;
	}

	get endpointId(): string {
		return String(this._endpointId);
	}

	get vendor() {
		return this._vendor;
	}

	get product() {
		return this._product;
	}

	get manualPairingCode(): string {
		return this._manualPairingCode;
	}

	get qrCode(): string {
		return this._qrCode;
	}

	get formattedVendorAndProduct(): string {
		if (!this._vendor && !this._product) return 'Unknown device';
		return [this._vendor, this._product].filter(Boolean).join(' - ')
	}
}
