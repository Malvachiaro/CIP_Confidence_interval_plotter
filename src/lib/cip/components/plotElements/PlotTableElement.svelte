<script lang="ts">
	import PlotTableTitlesElement from './PlotTableTitlesElement.svelte';
	import PlotTableStudyElement from './PlotTableStudyElement.svelte';

	export let y_px: number;
	export let x_px: number;
	export let bodyWidth_px: number;
	export let bodyHeight_px: number;

	export let blocks_titles_position: number;
	export let column_position_name: number;
	export let column_position_effectSize: number;
	export let column_position_lowerLimit: number;
	export let column_position_upperLimit: number;
	export let column_position_weight: number;
	export let column_position_variance: number;
	export let column_position_standardError: number;
	export let column_position_pValue: number;
	export let column_position_totalSS: number;
	export let column_position_sampleSizeGroup1: number;
	export let column_position_sampleSizeGroup2: number;
	export let column_position_notAssignedSS: number;
	export let column_position_ncf1: number;
	export let column_position_ncf2: number;
	export let column_position_ncf3: number;
	export let column_position_ncf4: number;
	export let column_position_ncf5: number;
	export let column_position_scf1: number;
	export let column_position_scf2: number;
	export let column_position_scf3: number;
	export let column_position_scf4: number;
	export let column_position_scf5: number;
	export let column_position_ci: number;

	export let real_font_size: number;
	export let fieldsSettings: any;

	export let rows: any[];
</script>

{#each rows as row}
	{#if row.type === 'titles'}
		<PlotTableTitlesElement
			y_px={y_px + (bodyHeight_px * (row.y_pct + row.height_pct - row.height_pct / 2)) / 100}
			x1={x_px}
			{bodyWidth_px}
			{column_position_name}
			{column_position_effectSize}
			{column_position_lowerLimit}
			{column_position_upperLimit}
			{column_position_weight}
			{column_position_variance}
			{column_position_standardError}
			{column_position_pValue}
			{column_position_totalSS}
			{column_position_sampleSizeGroup1}
			{column_position_sampleSizeGroup2}
			{column_position_notAssignedSS}
			{column_position_ncf1}
			{column_position_ncf2}
			{column_position_ncf3}
			{column_position_ncf4}
			{column_position_ncf5}
			{column_position_scf1}
			{column_position_scf2}
			{column_position_scf3}
			{column_position_scf4}
			{column_position_scf5}
			{column_position_ci}
			{fieldsSettings}
			{real_font_size}
		/>
	{:else if row.type === 'block'}
		<text
			x={x_px + (bodyWidth_px * blocks_titles_position) / 100}
			y={y_px + (bodyHeight_px * (row.y_pct + row.height_pct - row.height_pct / 2)) / 100}
			class="bold"
			font-size={real_font_size}
		>
			{row.name}</text
		>
	{:else if row.type === 'study'}
		<PlotTableStudyElement
			y_px={y_px + (bodyHeight_px * (row.y_pct + row.height_pct - row.height_pct / 2)) / 100}
			x1_px={x_px}
			{bodyWidth_px}
			{column_position_name}
			{column_position_effectSize}
			{column_position_lowerLimit}
			{column_position_upperLimit}
			{column_position_weight}
			{column_position_variance}
			{column_position_standardError}
			{column_position_pValue}
			{column_position_totalSS}
			{column_position_sampleSizeGroup1}
			{column_position_sampleSizeGroup2}
			{column_position_notAssignedSS}
			{column_position_ncf1}
			{column_position_ncf2}
			{column_position_ncf3}
			{column_position_ncf4}
			{column_position_ncf5}
			{column_position_scf1}
			{column_position_scf2}
			{column_position_scf3}
			{column_position_scf4}
			{column_position_scf5}
			{column_position_ci}
			{fieldsSettings}
			{real_font_size}
			{row}
		/>
	{/if}
{/each}
