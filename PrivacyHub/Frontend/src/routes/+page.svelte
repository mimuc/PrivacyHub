<script lang="ts">
	import {
		getModalStore, getModeUserPrefers,
		type ModalSettings, modeCurrent,
		ProgressRadial,
		SlideToggle
	} from '@skeletonlabs/skeleton';
	import ApiClient from '$lib/api/ApiClient';
	import { nodes } from '../../.svelte-kit/generated/client/app';
	import BaseDevice from '$lib/api/devices/BaseDevice';
	import { connectedStore, HubConnectionStatus, socketStore } from '$lib/store/GeneralStore';
	import { AccessLevel } from '$lib/util/EnvChecker';

	export let data: PageData;
	console.log('Page data:', data);

	// Reload device list in online frontend when privacy state changes
	$socketStore.on('onlinePrivacyStateChange', (socketData) => {
		console.log('onlinePrivacyStateChange');
		if (data.accessLevel !== AccessLevel.PRIVATE) {
			$socketStore.removeAllListeners('connectionStatus');
			$socketStore.removeAllListeners('privacyState');
			$socketStore.removeAllListeners('booleanState');
			getDeviceList();
		}
	});

	const modalStore = getModalStore();

	let isLoading = true;

	// const codeModal: ModalSettings = {
	// 	type: 'prompt',
	// 	title: 'Enter Pairing Code',
	// 	body: 'Provide the pairing code for the device you want to add and make sure it is powered on.',
	// 	valueAttr: { type: 'text', minlength: 11, maxlength: 11, required: true },
	// 	// Returns the updated response value
	// 	response: (value: string) => {
	// 		if (value) {
	// 			addDevice(value);
	// 		}
	// 	}
	// };

	const loadingModal: ModalSettings = {
		type: 'component',
		component: 'loading',
		title: 'Commissioning Device...',
		body: 'Attempting to pair device. This may take a moment.',
		backdropClasses: 'pointer-events-none',
		valueAttr: { type: 'text', minlength: 11, maxlength: 11, required: true }
	};

	const addDevice = (pairingCode: string, useThread: boolean) => {
		console.log('Adding device with pairing code:', pairingCode);
		modalStore.trigger(loadingModal);

		ApiClient.commissionNodeBLE(data.accessLevel, pairingCode, useThread)
			.then(() => {
				console.log('Device added.');
				modalStore.close();
				getDeviceList();

				const confirmModal: ModalSettings = {
					type: 'alert',
					title: 'Device Added',
					body: 'The device has been successfully added to the network.',
					buttonTextCancel: 'Close'
				};
				modalStore.trigger(confirmModal);
			})
			.catch((error) => {
				console.error('Error adding device:', error);
				modalStore.close();

				const errorModal: ModalSettings = {
					type: 'alert',
					title: 'Error Adding Device',
					body: 'There was an error adding the device:<br>' + error.toString(),
					buttonTextCancel: 'Close'
				};
				modalStore.trigger(errorModal);
			});
	};

	const addDeviceModalSettings: ModalSettings = {
		type: 'component',
		component: 'addDeviceModal',
		meta: { pairDeviceCallback: addDevice },
	};

	const openModal = () => modalStore.trigger(addDeviceModalSettings);

	let deviceList: BaseDevice[] = [];
	const numberOfTestDevices = 0;
	const getDeviceList = () => {
		isLoading = true;
		ApiClient.getNodes(data.accessLevel)
			.then((nodes) => {
				deviceList = nodes;
				// if (deviceList.length < numberOfTestDevices) {
				// 	for (let i = deviceList.length; i < numberOfTestDevices; i++) {
				// 		deviceList.push(new BaseDevice(i.toString(), "0", "Test", "Test"));
				// 	}
				// }
				console.log('Device list:');
				console.log(deviceList);
				isLoading = false;
			})
			.catch((error) => {
				console.error('Error getting nodes:', error);

				const errorModal: ModalSettings = {
					type: 'alert',
					title: 'Error Getting Devices',
					body: 'There was an error getting the device list:<br>' + error,
					buttonTextCancel: 'Close'
				};
				modalStore.trigger(errorModal);

				deviceList = [];
				isLoading = false;
			});
	};

	connectedStore.subscribe((value) => {
		if (value === HubConnectionStatus.CONNECTED) {
			getDeviceList();
		}
	});

	let currentMode = getModeUserPrefers();
	modeCurrent.subscribe((value) => {
		currentMode = value;
	});

</script>

<div class="relative h-full w-full flex items-center self-center justify-center">

	{#if $connectedStore !== HubConnectionStatus.CONNECTED}
	<!--{#if true}-->
		<div
			class="absolute bg-surface-700 bg-opacity-60 z-10 h-full w-full flex items-center justify-center"
			 class:bg-surface-900={!currentMode} class:bg-surface-100={currentMode}
		>
			<div class="flex items-center">
				<svg
					class="animate-spin -ml-1 mr-3 h-12 w-12 text-sky-600"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<span class="text-3xl mr-4">Connecting to Hub</span>
			</div>
		</div>
	{/if}

	{#if !(isLoading && $connectedStore !== HubConnectionStatus.CONNECTED)}
		{#if isLoading}
			<!--		<ProgressRadial width="w-28"  strokeLinecap="round" track="stroke-primary-50" meter="stroke-primary-500"/>-->
			<span class="h-full w-full flex items-center justify-center">
				<svg
					class="animate-spin -ml-1 mr-3 h-12 w-12 text-sky-600"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			</span>
		{:else}
			{#if deviceList.length > 0}
				<div class="w-full grid grid-cols-[repeat(auto-fit,_100%)] sm:grid-cols-[repeat(auto-fit,_48%)] 2xl:grid-cols-[repeat(auto-fit,_32%)] gap-4 m-auto p-4 justify-center">
<!--				<div class="w-full grid grid-cols-[repeat(auto-fit,_32%)] gap-4 m-auto p-4 justify-center">-->
					{#each deviceList as device}
						<svelte:component this={device.getOverviewComponent()} device={device} accessLevel={data.accessLevel} />
					{/each}
				</div>
			{:else}
				<div class="space-y-10 text-center flex flex-col items-center">
					<h2 class="h2">Dashboard</h2>
					<p class="text-lg">No devices paired yet{data.accessLevel !== AccessLevel.PRIVATE ? " or no device in online access state" : ""}.</p>
				</div>
			{/if}
			{#if data.accessLevel === AccessLevel.PRIVATE}
				<div class="fixed bottom-4 right-4">
					<button class="btn variant-filled-primary" on:click={openModal}>
						<i class="fa-solid fa-plus"></i>
						<span>Add device</span>
					</button>
				</div>
			{/if}
		{/if}
	{/if}
</div>

<!--<div class="card flex justify-center items-center space-x-8 p-4">
						<p>{[device.vendor, device.product].filter(Boolean).join(' ')}</p>
						<SlideToggle
							name={device.nodeId}
							checked={device.state}
							active="bg-primary-500"
							on:change={() => {
								ApiClient.setOnOff(device.nodeId, device.state)
									.then(() => {
										//device.enabled = !device.enabled;
									})
									.catch((error) => {
										console.error('Error setting device enabled:', error);
									});
							}}
						/>
					</div>-->