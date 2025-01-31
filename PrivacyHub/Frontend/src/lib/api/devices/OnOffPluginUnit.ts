import BaseDevice, { ConnectionStatus, PrivacyState } from '$lib/api/devices/BaseDevice';
import ApiClient from '$lib/api/ApiClient';
import OnOffPluginUnitOverview from '$lib/components/deviceOverviews/OnOffPluginUnitOverview.svelte';
import type { AccessLevel } from '$lib/util/EnvChecker';
import AttributeHistory from '$lib/components/deviceHistories/AttributeHistory.svelte';
import type { HistoryAttributeMapping } from '$lib/components/deviceHistories/HistoryUtils';

export interface IReturnOnOffPluginUnitState {
	connectionStatus: ConnectionStatus;
	onOffState: boolean;
	timestamp: number;
}

export default class OnOffPluginUnit extends BaseDevice {
	state: boolean;

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
	}

	override initialize = (): Promise<void> => {
		return new Promise<void>((resolve, reject) => {
			ApiClient.getOnOff(this.accessLevel, this.nodeId, this.endpointId).then((state) => {
				this.state = state || false;
				resolve();
			}).catch((error) => {
				console.error('Error:', error);
				reject(error.toString());
			});
		});
	}

	override getHistory = (): Promise<IReturnOnOffPluginUnitState[]> => {
		return new Promise<IReturnOnOffPluginUnitState[]>((resolve, reject) => {
			ApiClient.getHistory<IReturnOnOffPluginUnitState>(this.accessLevel, this._nodeId, this._endpointId).then((data) => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	override getOverviewComponent = () => {
		return OnOffPluginUnitOverview;
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