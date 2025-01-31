<script lang="ts">
	import * as d3 from 'd3';
	import { centerEvent, getTimestampDifference } from '$lib/components/deviceHistories/HistoryUtils';
	import { updated } from '$app/stores';

	const cornerRadius = 20;
	const handleHeight = 6;
	const handlePadding = 16;
	const percentageContainerWidth = 60;
	const percentageContainerHeight = 40;

	export let classString: string = '';
	export let width = 100;
	export let height = 300;
	export let minValue = 0;
	export let maxValue = 1;
	export let onValueChange: (value: number) => void;

	let realWidth = width + percentageContainerWidth * 2;
	$: realWidth = width + percentageContainerWidth * 2;

	// Bindings
	let viewBoxBinding: HTMLElement;
	let percentageVisible = false;

	// The current value of the slider
	export let currentValue: number = 0.5;
	export let color: string = '#f1b74b';

	const clickEvent = (event, d) => {
		updateCurrentValue(event.offsetY);
	};

	const touchEvent = (event, d) => {
		let touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
		updateCurrentValue(touch.pageY);
	};

	const dragStart = (event, d) => {
		percentageVisible = true;
		updateCurrentValue(event.y);
	};

	const valueChanged = (event, d) => {
		percentageVisible = false;
		console.log('valueChanged', currentValue);
		onValueChange(currentValue);
	};

	// Event for changing
	const dragEvent = (event, d) => {
		percentageVisible = true;
		updateCurrentValue(event.y);
	};

	const updateCurrentValue = (localY: number) => {
		let y = localY;
		y = Math.min(Math.max(cornerRadius, y), height - cornerRadius);
		currentValue = handleScaling.invert(y);
	};

	// The D3 Magic
	$: handleScaling = d3.scaleLinear([minValue, maxValue], [height - cornerRadius, cornerRadius]);
	$: upperScaling = d3.scaleLinear([minValue, maxValue], [height - cornerRadius * 2, 0]);
	$: heightScaling = d3.scaleLinear([minValue, maxValue], [cornerRadius * 2, height]);
	// $: d3.select(viewBoxBinding).on('mousedown', clickEvent);
	// $: d3.select(viewBoxBinding).on('touchstart', touchEvent);
	$: d3.select(viewBoxBinding).call(d3.drag().on('drag', dragEvent).on('start', dragStart).on('end', valueChanged));

	const darkenColor = (color: string, lightness: number, saturationFactor: number) => {
		let c = d3.hsl(d3.color(color));
		c.l = lightness
		c.s *= saturationFactor;
		return c.toString();
	};

	let darkerColor = darkenColor(color, 0.3, 0.35);
	$: darkerColor = darkenColor(color, 0.3, 0.35);

</script>

<svg bind:this={viewBoxBinding} width={realWidth} height={height}>
	<g>
		{#if percentageVisible}
			<rect
				x={0}
				y={handleScaling(currentValue) - percentageContainerHeight / 2}
				width={realWidth / 2}
				height={percentageContainerHeight}
				fill="#00000044"
				rx={percentageContainerHeight / 2}
			/>
			<!--			<rect-->
			<!--				x={0}-->
			<!--				y={handleScaling(currentValue) - percentageContainerHeight / 2}-->
			<!--				width={percentageContainerWidth}-->
			<!--				height={percentageContainerHeight}-->
			<!--				fill="#00000044"-->
			<!--				rx={percentageContainerHeight / 2}-->
			<!--			/>-->
			<text
				x={percentageContainerWidth / 2}
				y={handleScaling(currentValue) + 5}
				text-anchor="middle"
				font-size={20}
				fill="white"
			>{(currentValue / maxValue * 100).toFixed(0)}%</text>
			<!--			<text-->
			<!--				x={percentageContainerWidth + width / 2}-->
			<!--				y={currentValue < maxValue / 2 ? 25 : height - percentageContainerHeight}-->
			<!--				text-anchor="middle"-->
			<!--				font-size={20}-->
			<!--				fill="white"-->
			<!--			>{(currentValue / maxValue * 100).toFixed(0)}%</text>-->
		{/if}
		<rect
			class="cursor-pointer"
			x={percentageContainerWidth}
			y="0"
			width={width}
			height={height}
			fill={darkerColor}
			rx={cornerRadius}
		/>
		<rect
			class="cursor-pointer"
			x={percentageContainerWidth}
			y={upperScaling(currentValue)}
			width={width}
			height={heightScaling(currentValue)}
			fill={color}
			rx="20"
		/>
		<rect
			class="cursor-pointer"
			x={handlePadding + percentageContainerWidth}
			y={handleScaling(currentValue) - handleHeight / 2}
			width={width - handlePadding * 2}
			height={6}
			fill="white"
			rx={handleHeight / 2}
		/>
	</g>
</svg>