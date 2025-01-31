<script lang="ts">
	import { type SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type OnOffPluginUnit from '$lib/api/devices/OnOffPluginUnit';
	import ApiClient from '$lib/api/ApiClient';
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

	const onOffStateChanged = () => {
		ApiClient.setOnOff(accessLevel, device.nodeId, device.endpointId, !device.state)
			.then(() => {
				// device.state = !device.state;
			})
			.catch((error) => {
				console.error('Error setting device enabled:', error.toString());
			});
	};
</script>

<DetailsBase device={device} accessLevel={accessLevel} icon="fa-plug">
	<span class="flex justify-center items-center">
		<button
			class="btn-icon btn-icon-xxxl {device.state ? 'variant-filled-primary' : 'variant-ghost'}"
			on:click={onOffStateChanged}
		><i class="fa-solid fa-power-off"></i></button>
	</span>
</DetailsBase>