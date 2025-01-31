import BaseDevice, { ConnectionStatus, PrivacyState } from '$lib/api/devices/BaseDevice';
import ApiClient from '$lib/api/ApiClient';
import OnOffPluginUnitOverview from '$lib/components/deviceOverviews/OnOffPluginUnitOverview.svelte';
import type { AccessLevel } from '$lib/util/EnvChecker';
import AttributeHistory from '$lib/components/deviceHistories/AttributeHistory.svelte';
import type { HistoryAttributeMapping } from '$lib/components/deviceHistories/HistoryUtils';
import ExtendedColorLightOverview from '$lib/components/deviceOverviews/ExtendedColorLightOverview.svelte';

export interface IReturnExtendedColorLightState {
	connectionStatus: ConnectionStatus;
	onOffState: boolean;
	hue: number;
	saturation: number;
	value: number;
	timestamp: number;
}

export default class ExtendedColorLight extends BaseDevice {
	state: boolean;
	hue: number;
	saturation: number;
	value: number;

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
		super(
			nodeId,
			endpointId,
			vendor,
			product,
			manualPairingCode,
			qrCode,
			connectionStatus,
			privacyState,
			connectedProxy,
			accessLevel
		);
		this.state = false;
		this.hue = 0;
		this.saturation = 0;
		this.value = 0;
	}

	override initialize = (): Promise<void> => {
		return new Promise<void>((resolve, reject) => {
			ApiClient.getOnOff(this.accessLevel, this.nodeId, this.endpointId).then((state) => {
				this.state = state || false;
				ApiClient.getLightLevel(this.accessLevel, this.nodeId, this.endpointId).then((lightLevel) => {
					this.value = lightLevel;

					ApiClient.getColorHueSaturation(this.accessLevel, this.nodeId, this.endpointId).then((color) => {
						this.hue = color.hue;
						this.saturation = color.saturation;
						resolve();
					}).catch((error) => {
						console.error('Error getting color hue saturation:', error);
						reject(error.toString());
					});
				}).catch((error) => {
					console.error('Error getting light level:', error);
					reject(error.toString());
				});
				// ApiClient.getColorHSV(this.accessLevel, this.nodeId, this.endpointId).then((color) => {
				// 	this.hue = color.hue;
				// 	this.saturation = color.saturation;
				// 	this.value = color.value;
				// 	resolve();
				// }).catch((error) => {
				// 	console.error('Error getting color HSV:', error);
				// 	reject(error.toString());
				// });
			}).catch((error) => {
				console.error('Error getting on off state:', error);
				reject(error.toString());
			});
		});
	}

	override getHistory = (): Promise<IReturnExtendedColorLightState[]> => {
		return new Promise<IReturnExtendedColorLightState[]>((resolve, reject) => {
			ApiClient.getHistory<IReturnExtendedColorLightState>(this.accessLevel, this._nodeId, this._endpointId).then((data) => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	override getOverviewComponent = () => {
		return ExtendedColorLightOverview;
	}

	override getHistoryComponent = () => {
		return AttributeHistory;
	}

	override getHistoryComponentTitle = (): string => {
		return 'On / Off State';
	}

	override getHistoryComponentAttributeName = (): string => {
		return 'onOffState';
	}

	override getHistoryComponentMappings = (): any => {
		const mappings: HistoryAttributeMapping[] = [
			{ attributeValue: true, text: 'ON', color: '#3c8eae' },
			// { attributeValue: true, text: 'ON', color: '#97b14b' },
			{ attributeValue: false, text: 'OFF', color: '#e0e0e0' },
			// { attributeValue: false, text: 'OFF', color: '#ad5151' },
		];
		return mappings;
	}
}