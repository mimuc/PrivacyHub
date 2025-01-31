<script lang="ts">
	import { getModalStore, ListBox, ListBoxItem, type ModalSettings } from '@skeletonlabs/skeleton';
	import ApiClient from '$lib/api/ApiClient';
	import BaseDevice from '$lib/api/devices/BaseDevice';
	import { createEventDispatcher, onMount } from 'svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import type { AccessLevel } from '$lib/util/EnvChecker';

	const modalStore = getModalStore();
	const dispatch = createEventDispatcher<{ select:{ device: BaseDevice } }>();

	export let isLoading = true;
	export let accessLevel: AccessLevel;

	let deviceList: BaseDevice[] = [];

	let selectedDevice: BaseDevice;

	// const numberOfTestDevices = 0;
	const getDeviceList = () => {
		isLoading = true;
		ApiClient.getNodes(accessLevel)
			.then((nodes) => {
				deviceList = nodes;
				// if (deviceList.length < numberOfTestDevices) {
				// 	for (let i = deviceList.length; i < numberOfTestDevices; i++) {
				// 		deviceList.push(new BaseDevice(i.toString(), "0", "Test", "Test"));
				// 	}
				// }
				selectedDevice = deviceList[0];
				handleSelect();
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

	const handleSelect = () => {
		dispatch('select', { device: selectedDevice })
	};

	onMount(() => {
		getDeviceList();
	});
</script>

<div class="card p-4" data-popup="popupClick">
	{#if isLoading}
		<LoadingSpinner />
	{:else}
		<ListBox>
			{#each deviceList as device}
				<ListBoxItem
					class="close-popup"
					bind:group={selectedDevice}
					name="medium"
					value={device}
					on:change={handleSelect}
				>{device.formattedVendorAndProduct}</ListBoxItem>
			{/each}
		</ListBox>
	{/if}
</div>