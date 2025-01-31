<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getModeUserPrefers, modeCurrent } from '@skeletonlabs/skeleton';

	export let classes: string = '';
	export let date = new Date(Date.now());

	const dispatch = createEventDispatcher<{ dateUpdate:{ newDate: Date } }>();

	let currentMode = getModeUserPrefers();
	modeCurrent.subscribe((value) => {
		currentMode = value;
	});

	let year = "";
	let month = "";
	let day = "";

	let hours = "";
	let minutes = "";
	let seconds = "";

	$: year = year.replace(/[^0-9]/g, '')
	$: month = month.replace(/[^0-9]/g, '')
	$: day = day.replace(/[^0-9]/g, '')

	$: hours = hours.replace(/[^0-9]/g, '')
	$: minutes = minutes.replace(/[^0-9]/g, '')
	$: seconds = seconds.replace(/[^0-9]/g, '')

	// Date updated from inside
	const updateDate = () => {
		console.log("UPDATE DATE");
		console.log(year, month, day, hours, minutes, seconds);

		if (year.length < 4) {
			return;
		}

		if (month.length < 2) {
			return;
		}

		if (day.length < 2) {
			return;
		}

		if (hours.length < 2) {
			return;
		}

		if (minutes.length < 2) {
			return;
		}

		if (seconds.length < 2) {
			return;
		}

		date = new Date(
			parseInt(year),
			parseInt(month) - 1,
			parseInt(day),
			parseInt(hours),
			parseInt(minutes),
			parseInt(seconds)
		);
		dispatch('dateUpdate', { newDate: date })

		// Focus the next input
		const inputs = document.querySelectorAll('input');
		const currentInput = document.activeElement;
		const currentIndex = Array.from(inputs).indexOf(currentInput);
		if (currentIndex < inputs.length - 1) {
			inputs[currentIndex + 1].focus();
		} else {
			inputs[currentIndex].blur();
		}
	}

	// Date updated from outside
	$: date && dateChanged();
	const dateChanged = () => {
		year = date.getFullYear().toString();
		month = (date.getMonth() + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 });
		day = date.getDate().toLocaleString(undefined, { minimumIntegerDigits: 2 });
		hours = date.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 });
		minutes = date.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 });
		seconds = date.getSeconds().toLocaleString(undefined, { minimumIntegerDigits: 2 });
	}

	$: if (year.length > 4) {
		year = year.slice(0, 4);
	}

	$: if (month.length > 2) {
		month = month.slice(0, 2);
	}

	$: if (day.length > 2) {
		day = day.slice(0, 2);
	}

	$: if (hours.length > 2) {
		hours = hours.slice(0, 2);
	}

	$: if (parseInt(hours) > 23) {
		hours = "23";
	}

	$: if (minutes.length > 2) {
		minutes = minutes.slice(0, 2);
	}

	$: if (parseInt(minutes) > 59) {
		minutes = "59";
	}

	$: if (seconds.length > 2) {
		seconds = seconds.slice(0, 2);
	}

	$: if (parseInt(seconds) > 59) {
		seconds = "59";
	}

	const highlightOnClick = (event) => {
		event.target.select();
	}

	const handleEnter = (event) => {
		if (event.key === "Enter") {
			// Focus the next input
			const inputs = document.querySelectorAll('input');
			const currentInput = document.activeElement;
			if (!currentInput || !(currentInput instanceof HTMLInputElement)) {
				return;
			}
			const currentIndex = Array.from(inputs).indexOf(currentInput);
			if (currentIndex < inputs.length - 1) {
				inputs[currentIndex + 1].focus();
			} else {
				inputs[currentIndex].blur();
			}
		}
	}

</script>

<style>
	input {
		min-width: 0;
		border: none;
		flex-grow: 1;
		width: auto;
		flex-basis: 0;
		text-align: center;
		padding-left: 0;
		padding-right: 0;
	}

	input:focus {
		outline: none;
		/*border: none;*/
		box-shadow: none;
	}

	.container-light {
		background: #f1f1f1;
	}

	.container-dark {
		background: #272b38;
        /*border: 1px solid #d1d1d1;*/
	}

	.input-light {
		background: #d1d1d1;
	}

    .input-dark {
        background: #272b38;
    }

    .date-separator {
        padding-bottom: 7px;
    }

	.time-separator {
		padding-bottom: 6px;
	}
</style>

<div class="flex flex-col w-32 md:w-40 px-2 rounded-xl {classes}" class:container-light={currentMode} class:container-dark={!currentMode}>
	<div class="flex flex-row w-full items-end">
		<input
			class="rounded-tl-3xl"
			bind:value={day}
			on:input={updateDate}
			on:focusin={highlightOnClick}
			on:focusout={() => {
				if (day.length === 1) {
					day = "0" + day;
				}
				if (day.length === 0) {
					day = "01";
				}
				updateDate();
			}}
			on:keyup={handleEnter}
			class:input-light={currentMode}
			class:input-dark={!currentMode}
		>
		<div class="date-separator">.</div>
		<input
			bind:value={month}
			on:input={updateDate}
			on:focusin={highlightOnClick}
			on:focusout={() => {
				if (month.length === 1) {
					month = "0" + month;
				}
				if (month.length === 0) {
					month = "01";
				}
				updateDate();
			}}
			on:keyup={handleEnter}
			class:input-light={currentMode}
			class:input-dark={!currentMode}
		>
		<div class="date-separator">.</div>
		<input
			class="rounded-tr-3xl"
			bind:value={year}
			on:input={updateDate}
			on:focusin={highlightOnClick}
			on:focusout={() => {
				if (year.length < 4) {
					year = "2024";
				}
				updateDate();
			}}
			on:keyup={handleEnter}
			class:input-light={currentMode}
			class:input-dark={!currentMode}
			style="flex-grow: 1.5"
		>
	</div>
	<div
		class="flex flex-row w-full items-end text-2xl"
		style="border-top: 1px solid #737373;"
	>
		<input
			class="rounded-bl-3xl text-2xl py-1"
			bind:value={hours}
			on:input={updateDate}
			on:focusin={highlightOnClick}
			on:focusout={() => {
				if (hours.length === 1) {
					hours = "0" + hours;
				}
				if (hours.length === 0) {
					hours = "00";
				}
				updateDate();
			}}
			on:keyup={handleEnter}
			class:input-light={currentMode}
			class:input-dark={!currentMode}
		>
		<div class="time-separator">:</div>
		<input
			class="rounded-br-3xl text-2xl py-1"
			bind:value={minutes}
			on:input={updateDate}
			on:focusin={highlightOnClick}
			on:focusout={() => {
				if (minutes.length === 1) {
					minutes = "0" + minutes;
				}
				if (minutes.length === 0) {
					minutes = "00";
				}
				updateDate();
			}}
			on:keyup={handleEnter}
			class:input-light={currentMode}
			class:input-dark={!currentMode}
		>
<!--		<div class="time-separator">:</div>-->
<!--		<input-->
<!--			class="rounded-br-3xl"-->
<!--			bind:value={seconds}-->
<!--			on:input={updateDate}-->
<!--			on:focusin={highlightOnClick}-->
<!--			class:input-light={currentMode}-->
<!--			class:input-dark={!currentMode}-->
<!--		>-->
	</div>
</div>