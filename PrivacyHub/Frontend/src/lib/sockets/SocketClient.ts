import { io } from 'socket.io-client';
import { connectedStore, HubConnectionStatus, socketStore } from '$lib/store/GeneralStore';
import { get } from 'svelte/store';
import ApiClient from '$lib/api/ApiClient';
import type { AccessLevel } from '$lib/util/EnvChecker';

export const connectSocket = (accessLevel: AccessLevel, ) => {
	if (get(socketStore) !== undefined) {
		console.log('Socket already connected');
		return;
	}
	const socket = io(ApiClient.getBackendUrl(accessLevel));

	socket.on('connect', () => {
		console.log('Connected to socket');
		connectedStore.set(HubConnectionStatus.CONNECTED);
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from socket');
		connectedStore.set(HubConnectionStatus.DISCONNECTED);
	});

	socket.on('error', (error) => {
		console.error('Socket error:', error);
	});

	socket.on('data', (data) => {
		console.log('Received data:', data);
	});

	// socket.on('onOffState', (data) => {
	// 	console.log('Received onOffState:');
	// 	console.log(data);
	// });

	socketStore.set(socket);
}