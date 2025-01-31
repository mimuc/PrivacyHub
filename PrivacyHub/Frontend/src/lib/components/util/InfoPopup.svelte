<script lang="ts">
	export let dataPopup: string;
	export let icon: string = '';
</script>

<div class="card p-4 variant-filled-surface max-w-80" data-popup={dataPopup}>
	<div class="flex flex-col items-center text-sm">
		{#if icon}
			<i class={`fa-solid ${icon} text-2xl mb-2`} />
		{/if}
		<slot />
	</div>
	<div class="arrow variant-filled-surface" />
</div>