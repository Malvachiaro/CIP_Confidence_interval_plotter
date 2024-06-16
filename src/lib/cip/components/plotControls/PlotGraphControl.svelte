<script lang="ts">
	import { CipGrid } from '$lib/cip/models/CipGrid';
	import type { SquareProportionMethod } from '$lib/cip/models/CipPlotSettings';

	export let graphPosition: number;
	export let graphSize: number;
	export let graphEsSquareSize: number;
	export let graphEsProportionMethod: SquareProportionMethod;
	export let graphOverallsLines: boolean;

	export let graphShowGrid: boolean;
	export let graphShowGridLines: boolean;
	export let graphGridTicksMaxAmount: number;
	export let graphGridTicks: string;
	export let graphGridScale: string;

	export let nullValue: number;

	export let isActive: boolean;

	export let minValue:number
	export let maxValue:number

	async function autoGridTicks(graphGridTicksMaxAmount: number) {
		graphGridTicks = CipGrid.getGridlineTicks(
			minValue,
			maxValue,
			graphGridTicksMaxAmount,
			nullValue
		).join(',');
	}

	let autoTicksTabVisible = false;
	async function changeAutoGridTicksVisible(visible: boolean) {
		autoTicksTabVisible = visible;
	}
</script>

<div class="controls_tab" class:isActive>
	<h2>Graph</h2>
	<label
		>Plot position<input
			type="range"
			name="graphPosition"
			bind:value={graphPosition}
			min="0"
			max="100"
		/>{graphPosition}</label
	>
	<label
		>Plot size<input
			type="range"
			name="graphSize"
			bind:value={graphSize}
			min="20"
			max="100"
		/>{graphSize}</label
	>
	<label
		>Effect-size square size<input
			type="range"
			name="graphEsSquareSize"
			bind:value={graphEsSquareSize}
			min="8"
			max="50"
			step="0.5"
		/>{graphEsSquareSize}</label
	>
	<!-- <label>Effect-size square size Booster<input form="{formId}" type="range" name="graphEsSquareSizeBooster" bind:value={graphEsSquareSizeBooster} min="0" max="50" step="0.5"/>{graphEsSquareSizeBooster}%</label><br/> -->
	<label
		>Square proportion method
		<select class="standard" name="graphEsProportionMethod" bind:value={graphEsProportionMethod}>
			<option value="Square area">Square area</option>
			<option value="Square side">Square side</option>
		</select>
	</label>
	<label
		> <input
			type="checkbox"
			name="graphOverallsLines"
			bind:checked={graphOverallsLines}
		/> Overalls vertical lines</label
	>

	<label
		>Scale
		<select class="standard" name="graphGridScale" bind:value={graphGridScale}>
			<option value="Linear">Linear</option>
			{#if Number(minValue) > 0}
				<option value="Logarithmic">Logarithmic</option>
			{/if}
		</select>
	</label>
	<label
		><input type="checkbox" name="graphShowGrid" bind:checked={graphShowGrid} /> Show grid </label
	>
	<label
		><input
			type="checkbox"
			name="graphShowGridLines"
			bind:checked={graphShowGridLines}
		/> Show grid lines </label
	>

	<label>
		Ticks <input type="text" name="graphGridTicks" bind:value={graphGridTicks} autocomplete="off" />
		<button class="autoTicksButton" on:click={() => changeAutoGridTicksVisible(true)}
			>Auto generate</button
		>
	</label>
	<fieldset style={autoTicksTabVisible ? 'display:block' : 'display:none'}>
		<h4>Generate the ticks automatically</h4>
		<label style="display: inline-block;"
			>Ticks max amount <input
				type="number"
				name="graphGridTicksMaxAmount"
				bind:value={graphGridTicksMaxAmount}
				autocomplete="off"
			/></label
		>

		<button
			style="display: inline-block;"
			type="button"
			class="standard"
			on:click={() => autoGridTicks(graphGridTicksMaxAmount)}>Generate</button
		>
	</fieldset>
</div>

<style>
	.controls_tab {
		display: none;
	}
	.isActive {
		display: block;
	}
	.autoTicksButton {
		display: inline;
		background: none;
		color: inherit;
		cursor: pointer;
		font-size: inherit;
		outline: none;
		border: none;
		text-decoration: underline;
	}
	label {
		display: block;
		margin: 0.5rem 0;
	}
</style>
