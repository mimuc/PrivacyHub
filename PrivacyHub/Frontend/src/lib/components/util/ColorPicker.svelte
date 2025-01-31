<script lang="ts">
	import * as d3 from 'd3';
	import { hsv } from 'd3-hsv';

	export let classString: string = '';
	export let size = 300;
	export let selectorSize = 20;
	export let minHue = 0;
	export let maxHue = 254;
	export let minSaturation = 0;
	export let maxSaturation = 254;
	export let onValuesChange: (hue: number, saturation: number) => void;

	let selectorDragSize = Math.round(selectorSize * 1.2);
	$: selectorDragSize = Math.round(selectorSize * 1.2)

	let circleSize = size - selectorDragSize - 2;
	$: circleSize = size - selectorDragSize - 2;

	// Bindings
	let viewBoxBinding: HTMLElement;
	let graphicBinding: HTMLElement;
	let selectorDrag = false;

	// The current value of the slider
	export let currentHue: number = 0;
	export let currentSaturation: number = 1;
	export let color: string = '#f1b74b';

	let selectorPosX = 0;
	let selectorPosY = 0;

	const dragStart = (event, d) => {
		selectorDrag = true;
		updateCurrentValues(event.x, event.y);
	};

	// Event for changing
	const dragEvent = (event, d) => {
		selectorDrag = true;
		updateCurrentValues(event.x, event.y);
	};

	const valueChanged = (event, d) => {
		selectorDrag = false;
		const exportHue = Math.round(currentHue * maxHue + minHue);
		const exportSaturation = Math.round(currentSaturation * maxSaturation + minSaturation);
		onValuesChange(exportHue, exportSaturation);
	};

	const updateCurrentValues = (localX: number, localY: number) => {
		let x = localX;
		let y = localY;
		const distanceFromCenter = Math.sqrt((x - size / 2) ** 2 + (y - size / 2) ** 2);
		// Get the angle in degrees of (x,y) relative to the center of the circle
		let angle = (Math.atan2(y - size / 2, x - size / 2) * (180 / Math.PI) + 90 + 360) % 360;

		x = size / 2 + (Math.sin(angle * (Math.PI / 180)) * Math.min(distanceFromCenter, circleSize / 2));
		y = size / 2 - (Math.cos(angle * (Math.PI / 180)) * Math.min(distanceFromCenter, circleSize / 2));

		selectorPosX = x;
		selectorPosY = y;

		currentHue = angle / 360;
		currentSaturation = Math.min(distanceFromCenter / (circleSize / 2), 1);
	};

	// The D3 Magic
	// $: handleScaling = d3.scaleLinear([minValue, maxValue], [height - cornerRadius, cornerRadius]);
	// $: upperScaling = d3.scaleLinear([minValue, maxValue], [height - cornerRadius * 2, 0]);
	// $: heightScaling = d3.scaleLinear([minValue, maxValue], [cornerRadius * 2, height]);
	// $: d3.select(viewBoxBinding).on('mousedown', clickEvent);
	// $: d3.select(viewBoxBinding).on('touchstart', touchEvent);
	$: d3.select(graphicBinding).call(d3.drag().on('drag', dragEvent).on('start', dragStart).on('end', valueChanged));

	const updateColorAndSelector = () => {
		const hueForColor = Math.round(currentHue * 360);
		const colorHSV = hsv(hueForColor, currentSaturation, 1);
		color = colorHSV.toString();

		const hueAngle = currentHue * 360;
		selectorPosX = size / 2 + Math.sin(hueAngle * (Math.PI / 180)) * circleSize / 2 * currentSaturation;
		selectorPosY = size / 2 - Math.cos(hueAngle * (Math.PI / 180))  * circleSize / 2 * currentSaturation;
	}

	$: currentHue && currentSaturation && updateColorAndSelector()

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

    .shadow {
        cursor:crosshair;
        -moz-box-shadow: -5px -5px 5px #888;
        -webkit-box-shadow: -5px -5px 5px #888;
        box-shadow: -5px -5px 5px #888;
    }
</style>

<svg bind:this={viewBoxBinding} width={size} height={size}>
	<g bind:this={graphicBinding}>
		<defs>
			<!-- Define a circular mask to get the circular shape for the gradient -->
			<mask id="circle-mask">
				<rect width="100%" height="100%" fill="black" />
				<circle cx={size / 2} cy={size / 2} r={circleSize / 2} fill="white" />
			</mask>
			<radialGradient id="white-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
				<stop offset="0%" stop-color="white" />
				<stop offset="100%" stop-color="#00000000" />
			</radialGradient>
			<filter id="my-filter" x="-1" y="-1" width="200" height="200" >
				<feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
				<feColorMatrix result="matrixOut" in="offOut" type="matrix" values=" 0.49 0 0 0 0 0 0.49 0 0 0 0 0 0.49 0 0 0 0 0 0.5 0" />
				<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="8" />
				<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
			</filter>
		</defs>
		<foreignObject width={size} height={size} mask="url(#circle-mask)">
			<div class="conic-gradient"></div>
		</foreignObject>
		<circle class="cursor-pointer" cx={size / 2} cy={size / 2} r={circleSize / 2} fill="url(#white-gradient)" />
		<circle
			class="cursor-pointer"
			cx={selectorPosX}
			cy={selectorPosY}
			r={selectorDrag ? selectorDragSize / 2 : selectorSize / 2}
			fill={color}
			stroke="white"
			stroke-width="2"
		/>
	</g>
</svg>