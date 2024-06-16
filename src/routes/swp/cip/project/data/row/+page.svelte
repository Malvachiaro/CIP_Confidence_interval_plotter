<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { AppActions } from '$lib/cip/actions/Actions';
	import NameField from '$lib/cip/components/fields/NameField.svelte';
	import PValueField from '$lib/cip/components/fields/PValueField.svelte';
	import MandatoryValueField from '$lib/cip/components/fields/MandatoryValueField.svelte';
	import WeightField from '$lib/cip/components/fields/WeightField.svelte';
	import SampleSizesFieldset from '$lib/cip/components/fields/SampleSizesFieldset.svelte';

	export let data: PageData;

	let name_isOk: boolean = true;
	let pValue_isOk: boolean = true;
	let effectSize_isOk: boolean = true;
	let lowerLimit_isOk: boolean = true;
	let upperLimit_isOk: boolean = true;
	let weight_isOk: boolean = true;
	let sampleSize_isOk: boolean = true;

	let isOk: boolean = false;
	$: {
		isOk =
			name_isOk &&
			pValue_isOk &&
			effectSize_isOk &&
			lowerLimit_isOk &&
			upperLimit_isOk &&
			weight_isOk &&
			sampleSize_isOk;
	}

	let name: string = data.row.name;
	let isOverall: boolean = data.row.isOverall;
	let effectSize: number = data.row.effectSize;
	let lowerLimit: number = data.row.lowerLimit;
	let upperLimit: number = data.row.upperLimit;
	let weight: number = data.row.weight;
	let variance: number | null = data.row.variance;
	let standardError: number | null = data.row.standardError;
	let pValue: number | null = data.row.pValue;
	let totalSS: number | null = data.row.totalSS;
	let sampleSizeGroup1: number | null = data.row.sampleSizeGroup1;
	let sampleSizeGroup2: number | null = data.row.sampleSizeGroup2;
	let notAssignedSS: number | null = data.row.notAssignedSS;
	let ncf1: number | null = data.row.ncf1;
	let ncf2: number | null = data.row.ncf2;
	let ncf3: number | null = data.row.ncf3;
	let ncf4: number | null = data.row.ncf4;
	let ncf5: number | null = data.row.ncf5;
	let scf1: string | null = data.row.scf1;
	let scf2: string | null = data.row.scf2;
	let scf3: string | null = data.row.scf3;
	let scf4: string | null = data.row.scf4;
	let scf5: string | null = data.row.scf5;

	async function deleteRow() {
		await AppActions.deleteRow(Number(data.row.id));
		goto('../data');
	}

	async function update() {
		await AppActions.updateRow(
			Number(data.row.id),
			name,
			isOverall,
			effectSize,
			lowerLimit,
			upperLimit,
			weight,
			variance,
			standardError,
			pValue,
			totalSS,
			sampleSizeGroup1,
			sampleSizeGroup2,
			notAssignedSS,
			ncf1,
			ncf2,
			ncf3,
			ncf4,
			ncf5,
			scf1,
			scf2,
			scf3,
			scf4,
			scf5
		);
		goto('../data');
	}
</script>

<div id="page_row_edit">
	<h1>Edit the study</h1>

	<p>
		On this page, you can edit various details related to this study. Follow the
		instructions in each section to ensure all necessary information is correctly entered.
	</p>

	<p>
		The first section allows you to set the project name and specify whether it is an overall
		project. Simply fill in the name and check the box if applicable.
	</p>

	<NameField bind:value={name} bind:isOk={name_isOk} />
	<br />

	<label>Is an overall? <input type="checkbox" name="isOverall" bind:checked={isOverall} /></label>
	<br /><br />

	<p>
		In the "Effect Size" section, you can input the lower limit, effect size, and upper limit
		values. These fields are essential for defining the scope of your study. Remember that the effect size must be between the lower limit and the upper limit.
	</p>

	<fieldset>
		<h3>Effect size</h3>
		<MandatoryValueField
			label={data.fieldsSettings.lowerLimit.label}
			bind:isOk={lowerLimit_isOk}
			bind:value={lowerLimit}
		/>
		|---
		<MandatoryValueField
			label={data.fieldsSettings.effectSize.label}
			bind:isOk={effectSize_isOk}
			bind:value={effectSize}
		/>
		---|
		<MandatoryValueField
			label={data.fieldsSettings.upperLimit.label}
			bind:isOk={upperLimit_isOk}
			bind:value={upperLimit}
		/>
	</fieldset>



	<fieldset>
		<h3>Variables</h3>
		<p>
			The "Variables" section includes fields for weight, variance, standard error, and p-value. Enter
			the appropriate values to ensure accurate calculations and representations in your forest plot. Only the 'weight' field is mandatory.
		</p>
		<WeightField
			label={data.fieldsSettings.weight.label}
			bind:isOk={weight_isOk}
			bind:value={weight}
		/>

		<label>
			{data.fieldsSettings.variance.label}
			<input type="number" name="variance" autocomplete="off" bind:value={variance} />
		</label>
		<label>
			{data.fieldsSettings.standardError.label}
			<input type="number" name="standardError" autocomplete="off" bind:value={standardError} />
		</label>
		<PValueField
			label={data.fieldsSettings.pValue.label}
			bind:isOk={pValue_isOk}
			bind:value={pValue}
		/>
	</fieldset>



	<fieldset>
		<SampleSizesFieldset
			totalSSlabel={data.fieldsSettings.totalSS.label}
			g1SSlabel={data.fieldsSettings.sampleSizeGroup1.label}
			g2SSlabel={data.fieldsSettings.sampleSizeGroup2.label}
			naSSlabel={data.fieldsSettings.notAssignedSS.label}
			bind:totalSS
			bind:g1SS={sampleSizeGroup1}
			bind:g2SS={sampleSizeGroup2}
			bind:naSS={notAssignedSS}
			bind:isOk={sampleSize_isOk}
		/>
	</fieldset>



	<fieldset>
		<h3>Numerical custom fields</h3>
		<p>
			The "Numerical Custom Fields" section allows you to add any additional numerical data relevant
			to your study. Each custom field can be filled with specific values to enhance the dataset.
		</p>
		<label>
			{data.fieldsSettings.ncf1.label}
			<input type="number" name="ncf1" autocomplete="off" bind:value={ncf1} />
		</label>
		<label>
			{data.fieldsSettings.ncf2.label}
			<input type="number" name="ncf2" autocomplete="off" bind:value={ncf2} />
		</label>
		<label>
			{data.fieldsSettings.ncf3.label}
			<input type="number" name="ncf3" autocomplete="off" bind:value={ncf3} />
		</label>
		<label>
			{data.fieldsSettings.ncf4.label}
			<input type="number" name="ncf4" autocomplete="off" bind:value={ncf4} />
		</label>
		<label>
			{data.fieldsSettings.ncf5.label}
			<input type="number" name="ncf5" autocomplete="off" bind:value={ncf5} />
		</label>
	</fieldset>



	<fieldset>
		<h3>Text custom fields</h3>
		<p>
			Similarly, the "Text Custom Fields" section is designed for any textual data that you might need
			to add. Enter the relevant information into each custom field as required.
		</p>
		<label>
			{data.fieldsSettings.scf1.label}
			<input type="text" name="scf1" autocomplete="off" bind:value={scf1} />
		</label>
		<label>
			{data.fieldsSettings.scf2.label}
			<input type="text" name="scf2" autocomplete="off" bind:value={scf2} />
		</label>
		<label>
			{data.fieldsSettings.scf3.label}
			<input type="text" name="scf3" autocomplete="off" bind:value={scf3} />
		</label>
		<label>
			{data.fieldsSettings.scf4.label}
			<input type="text" name="scf4" autocomplete="off" bind:value={scf4} />
		</label>
		<label>
			{data.fieldsSettings.scf5.label}
			<input type="text" name="scf5" autocomplete="off" bind:value={scf5} />
		</label>
	</fieldset>

	<br />
	<p>
		Once you have entered all the required information, you can use the buttons below to either
		update the project or cancel the changes. Additionally, you have the option to delete the
		project if it is no longer needed.
	</p>

	<div class="commands">
		<button disabled={!isOk} class="standard" type="button" on:click={update}>Update</button>
		<button class="standard" type="button" on:click={() => goto('../data')}>Cancel</button>
	</div>
	<div class="deleteAction">
		<button class="standard" type="button" on:click={deleteRow}>Delete</button>
		<span> this data?</span>
	</div>
</div>

<style>
</style>
