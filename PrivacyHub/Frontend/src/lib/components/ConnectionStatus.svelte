<script lang="ts">
	import { connectedStore, HubConnectionStatus } from '$lib/store/GeneralStore';
	import { getModeUserPrefers, modeCurrent } from '@skeletonlabs/skeleton';

	let currentMode = getModeUserPrefers();
	modeCurrent.subscribe((value) => {
		currentMode = value;
	});
</script>
<div>
	{#if $connectedStore === HubConnectionStatus.CONNECTED}
<!--		<div class="flex items-center space-x-2 px-4 py-2 rounded-full" class:bg-connected-light={currentMode} class:bg-connected-dark={!currentMode}>-->
		<div class="flex items-center space-x-2 px-4 py-2 rounded-full">
			<i class="fa-solid fa-link" class:text-connected-light={!currentMode} class:text-connected-dark={currentMode}></i>
			<p class:text-connected-light={!currentMode} class:text-connected-dark={currentMode}>Connected</p>
		</div>
	<!--{:else if $connectedStore === ConnectionStatus.CONNECTING}-->
	<!--	<p>Connecting</p>-->
	{:else if $connectedStore === HubConnectionStatus.DISCONNECTED}
<!--		<div class="flex items-center space-x-2 px-4 py-2 rounded-full" class:bg-disconnected-light={currentMode} class:bg-disconnected-dark={!currentMode}>-->
		<div class="flex items-center space-x-2 px-4 py-2 rounded-full">
			<i class="fa-solid fa-link-slash" class:text-disconnected-light={!currentMode} class:text-disconnected-dark={currentMode}></i>
			<p class:text-disconnected-light={!currentMode} class:text-disconnected-dark={currentMode}>Not connected</p>
		</div>
	{:else}
		<p>Unknown</p>
	{/if}
</div>