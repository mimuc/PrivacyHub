<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { AccessLevel } from '$lib/util/EnvChecker.js';

	export let accessLevel: AccessLevel;

	const drawerStore = getDrawerStore();
	const drawerClose = () => {
		drawerStore.close();
	};
</script>

<nav class="list-nav grow">
	<ul>
		<li>
			<a href="/" on:click={drawerClose}>
				<i class="fa-solid fa-grip text-4xl w-9"></i>
				<span>Dashboard</span>
			</a>
		</li>
		<!--{#if accessLevel === AccessLevel.PRIVATE }-->
		<li>
			<a href="/history" on:click={drawerClose}>
				<i class="fa-solid fa-square-poll-vertical text-4xl w-9"></i>
				<span>History</span>
			</a>
		</li>
		<!--{/if}-->
		<li>
			<a href="/about" on:click={drawerClose}>
				<i class="fa-solid fa-circle-question text-4xl w-9"></i>
				<span>About</span>
			</a>
		</li>
		<li>
			<a href="/settings" on:click={drawerClose}>
				<i class="fa-solid fa-gear text-4xl w-9"></i>
				<span>Settings</span>
			</a>
		</li>
	</ul>
</nav>
<!--&lt;!&ndash;Align bottom&ndash;&gt;-->
<!--<div class="align-bottom p-4">-->
<!--	<LightSwitch />-->
<!--</div>-->
