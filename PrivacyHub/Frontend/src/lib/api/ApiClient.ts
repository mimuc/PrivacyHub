import BaseDevice, { PrivacyState } from '$lib/api/devices/BaseDevice';
import OnOffPluginUnit from '$lib/api/devices/OnOffPluginUnit';
import ContactSensor from '$lib/api/devices/ContactSensor';
import { AccessLevel } from '$lib/util/EnvChecker';
import { PUBLIC_ONLINE_BACKEND_URL } from '$env/static/public';
import { BACKEND_URL } from '$lib/util/BackendUrl';
import ExtendedColorLight from '$lib/api/devices/ExtendedColorLight';


// export type DeviceOverview = {
// 	nodeId: string;
// 	vendor: string | undefined;
// 	product: string | undefined;
// 	state: boolean;
// };



export default abstract class ApiClient {
	// private static readonly BACKEND_URL = 'http://192.168.178.21:8000';

	static getBackendUrl = (accessLevel: AccessLevel): string => {
		console.log('Access Level:', accessLevel);
		let backendUrl: string;
		switch (accessLevel) {
			case AccessLevel.PUBLIC:
				backendUrl = PUBLIC_ONLINE_BACKEND_URL;
				break;
			case AccessLevel.PRIVATE:
				backendUrl = BACKEND_URL;
				break;
		}
		console.log('Requested Backend URL:', backendUrl);
		return backendUrl;
	}


	static commissionNodeBLE = (accessLevel: AccessLevel, pairingCode: string, useThread: boolean): Promise<void> => {
		const backendUrl = this.getBackendUrl(accessLevel);

		const payload = {
			pairingCode: pairingCode
		};

		return new Promise<void>((resolve, reject) => {
			fetch(`${backendUrl}/pairing/ble-${useThread ? 'thread' : 'wifi'}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})
				// .then(response => response.json())
				.then((data) => {
					if (data.ok) {
						console.log('Success:', data);
						resolve();
						return;
					}
					return data.text();
				}).then((errorData) => {
					reject(errorData);
				}).catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});
	};

	static getNodes = (accessLevel: AccessLevel): Promise<BaseDevice[]> => {
		const backendUrl = this.getBackendUrl(accessLevel);
		const url = new URL(`${backendUrl}/nodes`);
		url.searchParams.append('accessLevel', accessLevel.toString());

		return new Promise<any>((resolve, reject) => {
			fetch(url.toString())
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					return response.json();
				})
				.then((data) => {
					const nodes: BaseDevice[] = [];
					Promise.all(data.map((node: any) => {
						return new Promise<void>((resolve, reject) => {
							const nodeId: string = node.nodeId;
							const endpointId: string = node.endpointId;
							const vendor: string | undefined = node.vendor;
							const product: string | undefined = node.product;
							const type: string = node.type;
							const manualPairingCode: string = node.manualPairingCode;
							const qrCode: string = node.qrCode;
							const connectionStatus = node.connectionStatus;
							const privacyState = node.privacyState;
							const connectedProxy = node.connectedProxy;
							console.log("NODE");
							console.log(node);
							switch (type) {
								case 'ExtendedColorLight': // TODO Better way to handle this
									const extendedColorLight = new ExtendedColorLight(
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
									extendedColorLight.initialize().then(() => {
										nodes.push(extendedColorLight);
										resolve();
									});
									break;
								case 'OnOffPluginUnit': // TODO Better way to handle this
									const onOffPluginUnit = new OnOffPluginUnit(
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
									onOffPluginUnit.initialize().then(() => {
										nodes.push(onOffPluginUnit);
										resolve();
									});
									break;
								case 'ContactSensor':
									const contactSensor = new ContactSensor(
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
									contactSensor.initialize().then(() => {
										nodes.push(contactSensor);
										resolve();
									});
									break;
								default:
									console.warn(`Unknown node type: ${type}`);
									const unknownDevice = new BaseDevice(
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
									unknownDevice.initialize().then(() => {
										nodes.push(unknownDevice);
										resolve();
									});
									break;
							}
						});
					})).then(() => {
						nodes.sort((a, b) => {
							return a.nodeId.localeCompare(b.nodeId);
						});
						resolve(nodes);
					}).catch((error) => {
						console.error('Error:', error);
						reject(error.toString());
					});
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});
	};

	static getBooleanState = (accessLevel: AccessLevel, nodeId: string, endpointId: string): Promise<boolean> => {
		const backendUrl = this.getBackendUrl(accessLevel);
		return new Promise<boolean>((resolve, reject) => {
			fetch(`${backendUrl}/nodes/${nodeId}/${endpointId}/booleanState`)
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					return response.json();
				})
				.then((data) => {
					resolve(data.booleanState);
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});
	}


	static setOnOff = (accessLevel: AccessLevel, nodeId: string, endpointId: string, state: boolean): Promise<void> => {
		const payload = {
			state: state
		};
		const backendUrl = this.getBackendUrl(accessLevel);

		return new Promise<void>((resolve, reject) => {
			fetch(`${backendUrl}/nodes/${nodeId}/${endpointId}/onOff`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					resolve();
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});
	};


	static getOnOff = (accessLevel: AccessLevel, nodeId: string, endpointId: string): Promise<boolean | undefined> => {
		const backendUrl = this.getBackendUrl(accessLevel);
		return new Promise<boolean | undefined>((resolve, reject) => {
			fetch(`${backendUrl}/nodes/${nodeId}/${endpointId}/onOff`)
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					return response.json();
				})
				.then((data) => {
					resolve(data.state);
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});
	}


	static setColorHueSaturation = (accessLevel: AccessLevel, nodeId: string, endpointId: string, hue: number, saturation: number): Promise<void> => {
		const payload = {
			hue: hue,
			saturation: saturation
		};
		const backendUrl = this.getBackendUrl(accessLevel);

		return new Promise<void>((resolve, reject) => {
			fetch(`${backendUrl}/nodes/${nodeId}/${endpointId}/colorHueSaturation`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					resolve();
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});

	}

	static getColorHueSaturation = (accessLevel: AccessLevel, nodeId: string, endpointId: string): Promise<{ hue: number, saturation: number }> => {
		const backendUrl = this.getBackendUrl(accessLevel);
		return new Promise<{ hue: number, saturation: number }>((resolve, reject) => {
			fetch(`${backendUrl}/nodes/${nodeId}/${endpointId}/colorHueSaturation`)
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					return response.json();
				})
				.then((data) => {
					resolve({ hue: data.hue, saturation: data.saturation });
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});
	}

	static setLightLevel = (accessLevel: AccessLevel, nodeId: string, endpointId: string, level: number): Promise<void> => {
		const payload = {
			level: level
		};
		const backendUrl = this.getBackendUrl(accessLevel);

		return new Promise<void>((resolve, reject) => {
			fetch(`${backendUrl}/nodes/${nodeId}/${endpointId}/lightLevel`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					resolve();
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});
	}


	static getLightLevel = (accessLevel: AccessLevel, nodeId: string, endpointId: string): Promise<number> => {
		const backendUrl = this.getBackendUrl(accessLevel);
		return new Promise<number>((resolve, reject) => {
			fetch(`${backendUrl}/nodes/${nodeId}/${endpointId}/lightLevel`)
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					return response.json();
				})
				.then((data) => {
					resolve(data.level);
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});
	}


	static updatePrivacyState = (accessLevel: AccessLevel, nodeId: string, endpointId: string, privacyState: PrivacyState): Promise<void> => {
		const payload = {
			privacyState: privacyState
		};
		const backendUrl = this.getBackendUrl(accessLevel);

		return new Promise<void>((resolve, reject) => {
			fetch(`${backendUrl}/nodes/${nodeId}/${endpointId}/privacyState`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					resolve();
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});
	}

	static updateConnectedProxy = (accessLevel: AccessLevel, nodeId: string, endpointId: string, connectedProxy: number): Promise<void> => {
		const payload = {
			connectedProxy: connectedProxy
		};
		const backendUrl = this.getBackendUrl(accessLevel);

		return new Promise<void>((resolve, reject) => {
			fetch(`${backendUrl}/nodes/${nodeId}/${endpointId}/connectedProxy`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					resolve();
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});
	}

	static resetVirtualDevice = (accessLevel: AccessLevel, nodeId: string, endpointId: string): Promise<void> => {
		const backendUrl = this.getBackendUrl(accessLevel);

		return new Promise<void>((resolve, reject) => {
			fetch(`${backendUrl}/nodes/${nodeId}/${endpointId}/resetVirtualDevice`)
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					resolve();
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});

	}

	static getHistory<T>(accessLevel: AccessLevel, nodeId: string, endpointId: string, from?: number, to?: number): Promise<T[]> {
		const backendUrl = this.getBackendUrl(accessLevel);

		return new Promise<T[]>((resolve, reject) => {
			fetch(`${backendUrl}/nodes/${nodeId}/${endpointId}/history?from=${from}&to=${to}`)
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					return response.json();
				})
				.then((data) => {
					resolve(data as T[]);
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});
	}

	static sendProxyLocation = (accessLevel: AccessLevel, proxyId: number, row: number, col: number): Promise<void> => {
		const backendUrl = this.getBackendUrl(accessLevel);
		const payload = {
			row: row,
			col: col
		};

		return new Promise<void>((resolve, reject) => {
			fetch(`${backendUrl}/proxy/${proxyId}/updatepos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})
				.then((response) => {
					if (!response.ok) {
						reject(response.body);
					}
					resolve();
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error.toString());
				});
		});
	}
}
