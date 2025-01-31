<script lang="ts">
	import { type SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type OnOffPluginUnit from '$lib/api/devices/OnOffPluginUnit';
	import DetailsBase from '$lib/components/deviceDetails/DetailsBase.svelte';
	import { socketStore } from '$lib/store/GeneralStore';
	import type { AccessLevel } from '$lib/util/EnvChecker';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// Socket events
	$socketStore.on('booleanState', (data) => {
		if (device.nodeId === data.nodeId && device.endpointId === data.endpointId) {
			device.state = data.state;
		}
	});

	const modalStore = getModalStore();

	const accessLevel: AccessLevel = $modalStore[0].meta.accessLevel;
	if (accessLevel === undefined) throw new Error('AccessLevel is required for this modal.');

	const device: OnOffPluginUnit = $modalStore[0].meta.device;
	if (!device) throw new Error('Device is required for this modal.');
</script>

<DetailsBase device={device} accessLevel={accessLevel} icon="fa-satellite-dish">
	<span class="flex flex-col justify-center items-center">
		{#if device.state}
			<!--		<i class="fa-solid fa-check text-3xl text-green-500 ml-auto"></i>-->
			<i class="fa-solid fa-circle text-6xl text-green-500"></i>
			<div class="text-2xl text-green-500">Closed</div>
		{:else}
			<!--		<i class="fa-solid fa-times text-3xl text-red-500 ml-auto"></i>-->
			<i class="fa-regular fa-circle text-6xl text-red-500"></i>
			<div class="text-2xl text-red-500">Open</div>
		{/if}
	</span>
</DetailsBase>