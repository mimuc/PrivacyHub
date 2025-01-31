import BaseDevice, { ConnectionStatus, PrivacyState } from '$lib/api/devices/BaseDevice';
import ApiClient from '$lib/api/ApiClient';
import ContactSensorOverview from '$lib/components/deviceOverviews/ContactSensorOverview.svelte';
import type { AccessLevel } from '$lib/util/EnvChecker';
import type { HistoryAttributeMapping } from '$lib/components/deviceHistories/HistoryUtils';
import AttributeHistory from '$lib/components/deviceHistories/AttributeHistory.svelte';

export interface IReturnContactSensorState {
	connectionStatus: ConnectionStatus;
	booleanState: boolean;
	timestamp: number;
}

export default class ContactSensor extends BaseDevice {
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
			ApiClient.getBooleanState(this.accessLevel, this.nodeId, this.endpointId).then((state) => {
				this.state = state || false;
				resolve();
			}).catch((error) => {
				console.error('Error:', error);
				reject(error.toString());
			});
		});
	}

	override getHistory = (): Promise<IReturnContactSensorState[]> => {
		return new Promise<IReturnContactSensorState[]>((resolve, reject) => {
			ApiClient.getHistory<IReturnContactSensorState>(this.accessLevel, this._nodeId, this._endpointId).then((data) => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	override getOverviewComponent = () => {
		return ContactSensorOverview;
	}

	override getHistoryComponent = () => {
		return AttributeHistory;
	}

	override getHistoryComponentTitle = (): string => {
		return 'Contact State';
	}

	override getHistoryComponentAttributeName = (): string => {
		return 'booleanState';
	}

	override getHistoryComponentMappings = (): any => {
		const mappings: HistoryAttributeMapping[] = [
			{ attributeValue: true, text: 'Closed', color: '#3c8eae' },
			{ attributeValue: false, text: 'Open', color: '#e0e0e0' },
		];
		return mappings;
	}
}