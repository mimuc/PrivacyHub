import { writable, type Writable } from 'svelte/store';
import { Socket } from 'socket.io-client';

export const socketStore: Writable<Socket> = writable();

export enum HubConnectionStatus {
	CONNECTED,
	DISCONNECTED
}
export const connectedStore: Writable<HubConnectionStatus> = writable(HubConnectionStatus.DISCONNECTED);