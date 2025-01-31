<script lang="ts">
	export let size: number;
	export let id: string;
</script>

<style>
    .conic-gradient {
        width: 100%;
        height: 100%;
        background: conic-gradient(
                from 0deg,
                red, yellow, lime, aqua, blue, magenta, red
        );
    }
</style>

<svg width={size} height={size}>
	<defs>
		<!-- Define a circular mask to get the circular shape for the gradient -->
		<mask id="icon-circle-mask-{id}">
			<rect width="100%" height="100%" fill="black" />
			<circle cx="50%" cy="50%" r={size / 2} fill="white" />
		</mask>
		<radialGradient id="icon-white-gradient-{id}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
			<stop offset="0%" stop-color="white" />
			<stop offset="100%" stop-color="#00000000" />
		</radialGradient>
	</defs>
	<foreignObject width={size} height={size} mask="url(#icon-circle-mask-{id})">
		<div class="conic-gradient"></div>
	</foreignObject>
	<circle class="cursor-pointer" cx={size / 2} cy={size / 2} r={size / 2} fill="url(#icon-white-gradient-{id})" />
</svg>
