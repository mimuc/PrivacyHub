<script lang="ts">
	import ApiClient from '$lib/api/ApiClient.js';
	import type BaseDevice from '$lib/api/devices/BaseDevice';

	export let device: BaseDevice;
</script>

<div class="card flex items-center space-x-8 px-8 h-20">
	<i class="fa-solid fa-question"></i>
	<p>{[device.vendor, device.product].filter(Boolean).join(' ')}</p>
</div>