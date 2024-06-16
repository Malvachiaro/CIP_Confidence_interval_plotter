<script lang="ts">
	import type { PageData } from './$types';
	import { FieldsSettings } from '$lib/cip/models/CipFieldsSettings';
	import { AppFunctions } from '$lib/cip/functions/AppFunctions';
	import { MESSAGE_TYPE_VALUES, type MessageType } from '$lib/common/MessageType_TD';
	import MessageBox from '$lib/cip/components/Tools/MessageBox.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let name_label = data.fieldsSettings.name.label;
	let effectSize_label = data.fieldsSettings.effectSize.label;
	let lowerLimit_label = data.fieldsSettings.lowerLimit.label;
	let upperLimit_label = data.fieldsSettings.upperLimit.label;
	let ci_label = data.fieldsSettings.ci.label;
	let weight_label = data.fieldsSettings.weight.label;
	let variance_label = data.fieldsSettings.variance.label;
	let standardError_label = data.fieldsSettings.standardError.label;
	let pValue_label = data.fieldsSettings.pValue.label;
	let totalSS_label = data.fieldsSettings.totalSS.label;
	let sampleSizeGroup1_label = data.fieldsSettings.sampleSizeGroup1.label;
	let sampleSizeGroup2_label = data.fieldsSettings.sampleSizeGroup2.label;
	let notAssignedSS_label = data.fieldsSettings.notAssignedSS.label;
	let variance_used = data.fieldsSettings.variance.used;
	let standardError_used = data.fieldsSettings.standardError.used;
	let pValue_used = data.fieldsSettings.pValue.used;
	let totalSS_used = data.fieldsSettings.totalSS.used;
	let sampleSizeGroup1_used = data.fieldsSettings.sampleSizeGroup1.used;
	let sampleSizeGroup2_used = data.fieldsSettings.sampleSizeGroup2.used;
	let notAssignedSS_used = data.fieldsSettings.notAssignedSS.used;
	let name_visible = data.fieldsSettings.name.visible;
	let effectSize_visible = data.fieldsSettings.effectSize.visible;
	let lowerLimit_visible = data.fieldsSettings.lowerLimit.visible;
	let upperLimit_visible = data.fieldsSettings.upperLimit.visible;
	let ci_visible = data.fieldsSettings.ci.visible;
	let weight_visible = data.fieldsSettings.weight.visible;
	let variance_visible = data.fieldsSettings.variance.visible;
	let standardError_visible = data.fieldsSettings.standardError.visible;
	let pValue_visible = data.fieldsSettings.pValue.visible;
	let totalSS_visible = data.fieldsSettings.totalSS.visible;
	let sampleSizeGroup1_visible = data.fieldsSettings.sampleSizeGroup1.visible;
	let sampleSizeGroup2_visible = data.fieldsSettings.sampleSizeGroup2.visible;
	let notAssignedSS_visible = data.fieldsSettings.notAssignedSS.visible;
	let ncf1_used = data.fieldsSettings.ncf1.used;
	let ncf2_used = data.fieldsSettings.ncf2.used;
	let ncf3_used = data.fieldsSettings.ncf3.used;
	let ncf4_used = data.fieldsSettings.ncf4.used;
	let ncf5_used = data.fieldsSettings.ncf5.used;
	let scf1_used = data.fieldsSettings.scf1.used;
	let scf2_used = data.fieldsSettings.scf2.used;
	let scf3_used = data.fieldsSettings.scf3.used;
	let scf4_used = data.fieldsSettings.scf4.used;
	let scf5_used = data.fieldsSettings.scf5.used;
	let ncf1_label = data.fieldsSettings.ncf1.label;
	let ncf2_label = data.fieldsSettings.ncf2.label;
	let ncf3_label = data.fieldsSettings.ncf3.label;
	let ncf4_label = data.fieldsSettings.ncf4.label;
	let ncf5_label = data.fieldsSettings.ncf5.label;
	let scf1_label = data.fieldsSettings.scf1.label;
	let scf2_label = data.fieldsSettings.scf2.label;
	let scf3_label = data.fieldsSettings.scf3.label;
	let scf4_label = data.fieldsSettings.scf4.label;
	let scf5_label = data.fieldsSettings.scf5.label;
	let ncf1_visible = data.fieldsSettings.ncf1.visible;
	let ncf2_visible = data.fieldsSettings.ncf2.visible;
	let ncf3_visible = data.fieldsSettings.ncf3.visible;
	let ncf4_visible = data.fieldsSettings.ncf4.visible;
	let ncf5_visible = data.fieldsSettings.ncf5.visible;
	let scf1_visible = data.fieldsSettings.scf1.visible;
	let scf2_visible = data.fieldsSettings.scf2.visible;
	let scf3_visible = data.fieldsSettings.scf3.visible;
	let scf4_visible = data.fieldsSettings.scf4.visible;
	let scf5_visible = data.fieldsSettings.scf5.visible;

	async function update() {
		let fields: FieldsSettings = new FieldsSettings();

		fields.name.label = name_label;
		fields.effectSize.label = effectSize_label;
		fields.lowerLimit.label = lowerLimit_label;
		fields.upperLimit.label = upperLimit_label;
		fields.ci.label = ci_label;
		fields.weight.label = weight_label;
		fields.variance.label = variance_label;
		fields.standardError.label = standardError_label;
		fields.pValue.label = pValue_label;
		fields.totalSS.label = totalSS_label;
		fields.sampleSizeGroup1.label = sampleSizeGroup1_label;
		fields.sampleSizeGroup2.label = sampleSizeGroup2_label;
		fields.notAssignedSS.label = notAssignedSS_label;
		fields.ncf1.label = ncf1_label;
		fields.ncf2.label = ncf2_label;
		fields.ncf3.label = ncf3_label;
		fields.ncf4.label = ncf4_label;
		fields.ncf5.label = ncf5_label;
		fields.scf1.label = scf1_label;
		fields.scf2.label = scf2_label;
		fields.scf3.label = scf3_label;
		fields.scf4.label = scf4_label;
		fields.scf5.label = scf5_label;

		fields.name.visible = name_visible;
		fields.effectSize.visible = effectSize_visible;
		fields.lowerLimit.visible = lowerLimit_visible;
		fields.upperLimit.visible = upperLimit_visible;
		fields.ci.visible = ci_visible;
		fields.weight.visible = weight_visible;
		fields.variance.visible = variance_visible;
		fields.standardError.visible = standardError_visible;
		fields.pValue.visible = pValue_visible;
		fields.totalSS.visible = totalSS_visible;
		fields.sampleSizeGroup1.visible = sampleSizeGroup1_visible;
		fields.sampleSizeGroup2.visible = sampleSizeGroup2_visible;
		fields.notAssignedSS.visible = notAssignedSS_visible;

		fields.ncf1.used = ncf1_used;
		fields.ncf2.used = ncf2_used;
		fields.ncf3.used = ncf3_used;
		fields.ncf4.used = ncf4_used;
		fields.ncf5.used = ncf5_used;
		fields.scf1.used = scf1_used;
		fields.scf2.used = scf2_used;
		fields.scf3.used = scf3_used;
		fields.scf4.used = scf4_used;
		fields.scf5.used = scf5_used;

		fields.ncf1.visible = ncf1_visible;
		fields.ncf2.visible = ncf2_visible;
		fields.ncf3.visible = ncf3_visible;
		fields.ncf4.visible = ncf4_visible;
		fields.ncf5.visible = ncf5_visible;
		fields.scf1.visible = scf1_visible;
		fields.scf2.visible = scf2_visible;
		fields.scf3.visible = scf3_visible;
		fields.scf4.visible = scf4_visible;
		fields.scf5.visible = scf5_visible;

		await AppFunctions.updateProjectFieldsSettings(fields);
		messageType = MESSAGE_TYPE_VALUES.success;
		message = 'Fields settings updated';

		goto('./data');
	}

	let messageType: MessageType = MESSAGE_TYPE_VALUES.success as MessageType;
	let message = '';
</script>

<div id="page_fields">
	<h1>Project settings</h1>

	{#if data.fieldsSettings == null}
		<h1>No project</h1>
		<p>Before entering the data, you must create or load a project</p>
		<button class="standard" type="button" on:click={() => goto('/swp/cip/home')}>Fix it</button>
	{:else}
		<p>On this page, you can choose which fields to use and show in the plot.</p>

		<h2>Mandatory fields</h2>
		<p>
			These fields are mandatory. However, you can choose to change the labels with which they are
			displayed and decide whether to display them in the plot.
		</p>
		<table class="fields mandatory_fields">
			<thead>
				<tr>
					<th class="column_for_checkbox column_for_active_field">Used</th>
					<th class="column_for_field_name">Field</th>
					<th class="column_for_checkbox">Visible in the plot</th>
					<th class="column_for_field_label">Field label</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>&#10003;</td>
					<td>Study (or ES, or Row)</td>
					<td><input type="checkbox" name="name_visible" bind:checked={name_visible} /></td>
					<td><input type="text" name="name_label" autocomplete="off" bind:value={name_label} /></td
					>
				</tr>
				<tr>
					<td>&#10003;</td>
					<td>Effect size</td>
					<td
						><input
							type="checkbox"
							name="effectSize_visible"
							bind:checked={effectSize_visible}
						/></td
					>
					<td
						><input
							type="text"
							name="effectSize_label"
							autocomplete="off"
							bind:value={effectSize_label}
						/></td
					>
				</tr>
				<tr>
					<td>&#10003;</td>
					<td>Lower limit</td>
					<td
						><input
							type="checkbox"
							name="lowerLimit_visible"
							bind:checked={lowerLimit_visible}
						/></td
					>
					<td
						><input
							type="text"
							name="lowerLimit_label"
							autocomplete="off"
							bind:value={lowerLimit_label}
						/></td
					>
				</tr>
				<tr>
					<td>&#10003;</td>
					<td>Upper limit</td>
					<td
						><input
							type="checkbox"
							name="upperLimit_visible"
							bind:checked={upperLimit_visible}
						/></td
					>
					<td
						><input
							type="text"
							name="upperLimit_label"
							autocomplete="off"
							bind:value={upperLimit_label}
						/></td
					>
				</tr>
				<tr>
					<td>&#10003;</td>
					<td>Confidence Interval (synthetic form)</td>
					<td><input type="checkbox" name="ci_visible" bind:checked={ci_visible} /></td>
					<td><input type="text" name="ci_label" autocomplete="off" bind:value={ci_label} /></td>
				</tr>
				<tr>
					<td>&#10003;</td>
					<td>Weight</td>
					<td><input type="checkbox" name="weight_visible" bind:checked={weight_visible} /></td>
					<td
						><input
							type="text"
							name="weight_label"
							autocomplete="off"
							bind:value={weight_label}
						/></td
					>
				</tr>
			</tbody>
		</table>

		<h2>Optional fields</h2>
		<p>
			These fields are optional. You can choose to use them or not, show them in the graph, and
			change their labels.
		</p>
		<table class="fields optional_fields">
			<thead>
				<tr>
					<th class="column_for_checkbox column_for_active_field">Used</th>
					<th class="column_for_field_name">Field</th>
					<th class="column_for_checkbox">Visible in the plot</th>
					<th class="column_for_field_label">Field label</th>
				</tr>
			</thead>
			<tbody>
				<tr class={variance_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="variance_used" bind:checked={variance_used} /></td>
					<td>Variance</td>
					<td><input type="checkbox" name="variance_visible" bind:checked={variance_visible} /></td>
					<td
						><input
							type="text"
							name="variance_label"
							autocomplete="off"
							bind:value={variance_label}
						/></td
					>
				</tr>
				<tr class={standardError_used ? 'used' : 'unused'}>
					<td
						><input
							type="checkbox"
							name="standardError_used"
							bind:checked={standardError_used}
						/></td
					>
					<td>Standard Error</td>
					<td
						><input
							type="checkbox"
							name="standardError_visible"
							bind:checked={standardError_visible}
						/></td
					>
					<td
						><input
							type="text"
							name="standardError_label"
							autocomplete="off"
							bind:value={standardError_label}
						/></td
					>
				</tr>
				<tr class={pValue_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="pValue_used" bind:checked={pValue_used} /></td>
					<td>p Value</td>
					<td><input type="checkbox" name="pValue_visible" bind:checked={pValue_visible} /></td>
					<td
						><input
							type="text"
							name="pValue_label"
							autocomplete="off"
							bind:value={pValue_label}
						/></td
					>
				</tr>
				<tr class={totalSS_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="totalSS_used" bind:checked={totalSS_used} /></td>
					<td>Total sample size</td>
					<td><input type="checkbox" name="totalSS_visible" bind:checked={totalSS_visible} /></td>
					<td
						><input
							type="text"
							name="totalSS_label"
							autocomplete="off"
							bind:value={totalSS_label}
						/></td
					>
				</tr>
				<tr class={sampleSizeGroup1_used ? 'used' : 'unused'}>
					<td
						><input
							type="checkbox"
							name="sampleSizeGroup1_used"
							bind:checked={sampleSizeGroup1_used}
						/></td
					>
					<td>Group 1 sample size</td>
					<td
						><input
							type="checkbox"
							name="sampleSizeGroup1_visible"
							bind:checked={sampleSizeGroup1_visible}
						/></td
					>
					<td
						><input
							type="text"
							name="sampleSizeGroup1_label"
							autocomplete="off"
							bind:value={sampleSizeGroup1_label}
						/></td
					>
				</tr>
				<tr class={sampleSizeGroup2_used ? 'used' : 'unused'}>
					<td
						><input
							type="checkbox"
							name="sampleSizeGroup2_used"
							bind:checked={sampleSizeGroup2_used}
						/></td
					>
					<td>Group 2 sample size</td>
					<td
						><input
							type="checkbox"
							name="sampleSizeGroup2_visible"
							bind:checked={sampleSizeGroup2_visible}
						/></td
					>
					<td
						><input
							type="text"
							name="sampleSizeGroup2_label"
							autocomplete="off"
							bind:value={sampleSizeGroup2_label}
						/></td
					>
				</tr>
				<tr class={notAssignedSS_used ? 'used' : 'unused'}>
					<td
						><input
							type="checkbox"
							name="notAssignedSS_used"
							bind:checked={notAssignedSS_used}
						/></td
					>
					<td>Not assigned sample size</td>
					<td
						><input
							type="checkbox"
							name="notAssignedSS_visible"
							bind:checked={notAssignedSS_visible}
						/></td
					>
					<td
						><input
							type="text"
							name="notAssignedSS_label"
							autocomplete="off"
							bind:value={notAssignedSS_label}
						/></td
					>
				</tr>
			</tbody>
		</table>

		<h2>Custom fields</h2>
		<p>
			These fields are customizable and do not have predefined meanings. You can use them as you see
			fit. The first 5 fields can contain only numerical data, while the next 5 fields can contain
			textual data.
		</p>
		<table class="fields custom_fields">
			<thead>
				<tr>
					<th class="column_for_checkbox column_for_active_field">Used</th>
					<th class="column_for_field_name">Field</th>
					<th class="column_for_checkbox">Visible in the plot</th>
					<th class="column_for_field_label">Field label</th>
				</tr>
			</thead>
			<tbody>
				<tr class={ncf1_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="ncf1_used" bind:checked={ncf1_used} /></td>
					<td>Numerical custom field #1</td>
					<td><input type="checkbox" name="ncf1_visible" bind:checked={ncf1_visible} /></td>
					<td><input type="text" name="ncf1_label" autocomplete="off" bind:value={ncf1_label} /></td
					>
				</tr>
				<tr class={ncf2_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="ncf2_used" bind:checked={ncf2_used} /></td>
					<td>Numerical custom field #2</td>
					<td><input type="checkbox" name="ncf2_visible" bind:checked={ncf2_visible} /></td>
					<td><input type="text" name="ncf2_label" autocomplete="off" bind:value={ncf2_label} /></td
					>
				</tr>
				<tr class={ncf3_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="ncf3_used" bind:checked={ncf3_used} /></td>
					<td>Numerical custom field #3</td>
					<td><input type="checkbox" name="ncf3_visible" bind:checked={ncf3_visible} /></td>
					<td><input type="text" name="ncf3_label" autocomplete="off" bind:value={ncf3_label} /></td
					>
				</tr>
				<tr class={ncf4_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="ncf4_used" bind:checked={ncf4_used} /></td>
					<td>Numerical custom field #4</td>
					<td><input type="checkbox" name="ncf4_visible" bind:checked={ncf4_visible} /></td>
					<td><input type="text" name="ncf4_label" autocomplete="off" bind:value={ncf4_label} /></td
					>
				</tr>
				<tr class={ncf5_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="ncf5_used" bind:checked={ncf5_used} /></td>
					<td>Numerical custom field #5</td>
					<td><input type="checkbox" name="ncf5_visible" bind:checked={ncf5_visible} /></td>
					<td><input type="text" name="ncf5_label" autocomplete="off" bind:value={ncf5_label} /></td
					>
				</tr>
				<tr class={scf1_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="scf1_used" bind:checked={scf1_used} /></td>
					<td>Text custom field #1</td>
					<td><input type="checkbox" name="scf1_visible" bind:checked={scf1_visible} /></td>
					<td><input type="text" name="scf1_label" autocomplete="off" bind:value={scf1_label} /></td
					>
				</tr>
				<tr class={scf2_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="scf2_used" bind:checked={scf2_used} /></td>
					<td>Text custom field #2</td>
					<td><input type="checkbox" name="scf2_visible" bind:checked={scf2_visible} /></td>
					<td><input type="text" name="scf2_label" autocomplete="off" bind:value={scf2_label} /></td
					>
				</tr>
				<tr class={scf3_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="scf3_used" bind:checked={scf3_used} /></td>
					<td>Text custom field #3</td>
					<td><input type="checkbox" name="scf3_visible" bind:checked={scf3_visible} /></td>
					<td><input type="text" name="scf3_label" autocomplete="off" bind:value={scf3_label} /></td
					>
				</tr>
				<tr class={scf4_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="scf4_used" bind:checked={scf4_used} /></td>
					<td>Text custom field #4</td>
					<td><input type="checkbox" name="scf4_visible" bind:checked={scf4_visible} /></td>
					<td><input type="text" name="scf4_label" autocomplete="off" bind:value={scf4_label} /></td
					>
				</tr>
				<tr class={scf5_used ? 'used' : 'unused'}>
					<td><input type="checkbox" name="scf5_used" bind:checked={scf5_used} /></td>
					<td>Text custom field #5</td>
					<td><input type="checkbox" name="scf5_visible" bind:checked={scf5_visible} /></td>
					<td><input type="text" name="scf5_label" autocomplete="off" bind:value={scf5_label} /></td
					>
				</tr>
			</tbody>
		</table>
		<button class="standard" type="button" on:click={update}>Update</button>
		<MessageBox {messageType}>{message}</MessageBox>
	{/if}
</div>

<style>
	
</style>
