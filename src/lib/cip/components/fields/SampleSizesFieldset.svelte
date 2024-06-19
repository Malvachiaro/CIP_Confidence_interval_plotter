<script lang="ts">
	import { ValueChecker } from '$lib/common/ValueChecker';
	import SampleSizeField from '$lib/cip/components/fields/SampleSizeField.svelte';

	export let isOk: boolean = true;

	export let totalSSlabel = 'Total sample size';
	export let totalSS: number | null = 0;
	let totalSS_isOk: boolean = true;

	export let g1SSlabel = 'Group 1 sample size';
	export let g1SS: number | null = 0;
	let g1SS_isOk: boolean = true;

	export let g2SSlabel = 'Group 2 sample size';
	export let g2SS: number | null = 0;
	let g2SS_isOk: boolean = true;

	export let naSSlabel = 'Not applicable sample size';
	export let naSS: number | null = 0;
	let naSS_isOk: boolean = true;

	let error = '';

	$: {
		if (!totalSS_isOk || !g1SS_isOk || !g2SS_isOk || !naSS_isOk) {
			isOk = false;
			error = '';
		} else {
			if (
				(ValueChecker.checkIsNumber(totalSS) &&
					ValueChecker.checkIsNumber(g1SS) &&
					ValueChecker.checkIsNumber(g2SS) &&
					ValueChecker.checkIsNumber(naSS)) &&
				totalSS! != (g1SS! + g2SS! + naSS! )
			) {
				isOk = false;
				error = 'Total sample size must be equal to sum of group sample sizes';
			} else {
				isOk = true;
				error = '';
			}
		}
	}
</script>


	<h3>Sample sizes </h3>
	<p>
		In the "Sample Sizes" section, you can input data related to total sample size, group sample
		sizes, and not assigned sample sizes. This helps in categorizing the data for more detailed
		analysis.
	</p>

	<SampleSizeField label={totalSSlabel} bind:isOk={totalSS_isOk} bind:value={totalSS} />
	=
	<SampleSizeField label={g1SSlabel} bind:isOk={g1SS_isOk} bind:value={g1SS} />
	+
	<SampleSizeField label={g2SSlabel} bind:isOk={g2SS_isOk} bind:value={g2SS} />
	+
	<SampleSizeField label={naSSlabel} bind:isOk={naSS_isOk} bind:value={naSS} />
	<div class="error">{error}</div>

<style>

	h3{
		display: block;
	}
</style>
