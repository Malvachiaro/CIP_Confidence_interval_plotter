<script lang="ts">
	import type { PageData } from './$types';
	import RowEditPopoupMenu from '$lib/cip/components/Menu/RowEditPopoupMenu.svelte';
	import BlockEditPopoupMenu from '$lib/cip/components/Menu/BlockEditPopoupMenu.svelte';
	import DataTableSortBox from '$lib/cip/components/Tools/DataTableSortBox.svelte';
	import NameField from '$lib/cip/components/fields/NameField.svelte';
	import { AppActions } from '$lib/cip/actions/Actions';
	import { goto, invalidateAll } from '$app/navigation';

	export let data: PageData;

	let newBlockName = '';
	let newBlockNameIsOk = false;
	async function createNewBlock() {
		if (!newBlockNameIsOk) {
			return;
		}
		await AppActions.createNewBlock(newBlockName);
		newBlockName = '';
		invalidateAll();
	}

	async function createNewRow(blockId: number) {
		await AppActions.createNewRow(blockId);
		invalidateAll();
	}

	let hide_explanation = true;
	async function toogle_explanation() {
		hide_explanation = !hide_explanation;
	}
</script>

<div id="page_datapage">
	{#if data.blocks == null}
		<h1>No project</h1>
		<p>Before entering the data, you must create or load a project</p>
		<button class="standard" type="button" on:click={() => goto('/swp/starting')}>Fix it</button>
	{:else}
		<h1>Edit the effect sizes</h1>
		<span class="more_info"
			><button type="button" on:click={toogle_explanation}>more info...</button></span
		>
		<div class="explanation" class:hide={hide_explanation}>
			<p>
				On this page, you can enter data about studies and effect sizes to create the forest plot.
				The fields visible in the tabls have been configured in the "fields" section and can be
				modified at any time to suit your needs.
			</p>

			<p>
				You can organize the data into blocks, which helps in managing and aligning the values in
				the forest plot. If only one block is entered, its name will not be displayed in the plot.
				Each block provides a dedicated button to add studies or effect sizes, making it easy to
				build your dataset comprehensively.
			</p>

			<p>
				To maintain a clear and organized display, you can sort the data using the sorting panel.
				While the automatic sorting feature is available, you also have the flexibility to sort the
				data manually. Manual sorting will override any automatic arrangements, giving you complete
				control over the order of the information. If you add new effect sizes or studies, they will
				NOT be sorted automatically.
			</p>

			<p>
				Additionally, next to each block and each individual study or effect size, there is a button
				that grants access to advanced functions. These features allow you to further customize and
				refine your data input, ensuring that your forest plot is accurate and tailored to your
				specific requirements.
			</p>
		</div>
		<DataTableSortBox
			fieldsSettings={data.fieldsSettings}
			sortBy={data.runtimeVariables.sortBy}
			sortDirection={data.runtimeVariables.sortDirection}
		/>
		<br />
		<div class="block_wrapper">
			{#each data.blocks as block}
				<div class="block">
					<div class="block_header">
						<BlockEditPopoupMenu blockId={block.id} blockObject={block} />
						<h3>{block.name}</h3>
					</div>

					<br />

					<table class="dataset">
						<thead>
							<tr>
								<th></th>
								<th class="column_study_name">
									{data.fieldsSettings.name.label}
								</th>
								<th>Type</th>
								<th>
									{data.fieldsSettings.effectSize.label}
								</th>
								<th>{data.fieldsSettings.lowerLimit.label}</th>
								<th>{data.fieldsSettings.upperLimit.label}</th>
								<th>{data.fieldsSettings.weight.label}</th>
								{#if data.fieldsSettings.variance.used}<th>{data.fieldsSettings.variance.label}</th
									>{/if}
								{#if data.fieldsSettings.standardError.used}<th
										>{data.fieldsSettings.standardError.label}</th
									>{/if}
								{#if data.fieldsSettings.pValue.used}<th>{data.fieldsSettings.pValue.label}</th
									>{/if}
								{#if data.fieldsSettings.totalSS.used}<th>{data.fieldsSettings.totalSS.label}</th
									>{/if}
								{#if data.fieldsSettings.sampleSizeGroup1.used}<th
										>{data.fieldsSettings.sampleSizeGroup1.label}</th
									>{/if}
								{#if data.fieldsSettings.sampleSizeGroup2.used}<th
										>{data.fieldsSettings.sampleSizeGroup2.label}</th
									>{/if}
								{#if data.fieldsSettings.notAssignedSS.used}<th
										>{data.fieldsSettings.notAssignedSS.label}</th
									>{/if}
								{#if data.fieldsSettings.ncf1.used}<th>{data.fieldsSettings.ncf1.label}</th>{/if}
								{#if data.fieldsSettings.ncf2.used}<th>{data.fieldsSettings.ncf2.label}</th>{/if}
								{#if data.fieldsSettings.ncf3.used}<th>{data.fieldsSettings.ncf3.label}</th>{/if}
								{#if data.fieldsSettings.ncf4.used}<th>{data.fieldsSettings.ncf4.label}</th>{/if}
								{#if data.fieldsSettings.ncf5.used}<th>{data.fieldsSettings.ncf5.label}</th>{/if}
								{#if data.fieldsSettings.scf1.used}<th>{data.fieldsSettings.scf1.label}</th>{/if}
								{#if data.fieldsSettings.scf2.used}<th>{data.fieldsSettings.scf2.label}</th>{/if}
								{#if data.fieldsSettings.scf3.used}<th>{data.fieldsSettings.scf3.label}</th>{/if}
								{#if data.fieldsSettings.scf4.used}<th>{data.fieldsSettings.scf4.label}</th>{/if}
								{#if data.fieldsSettings.scf5.used}<th>{data.fieldsSettings.scf5.label}</th>{/if}
							</tr>
						</thead>
						<tbody>
							{#each block.rows as row}
								<tr>
									<td>
										<RowEditPopoupMenu
											rowId={row.id}
											moveToBlock={data.blocks}
											rowBlockId={block.id}
										></RowEditPopoupMenu>
									</td>
									<td><a class="link_to_study" href="data/row?rowId={row.id}">{row.name}</a></td>
									<td
										><div class="overallMarker" title={row.isOverall ? 'Overall' : 'Study/ES'}>
											-{row.isOverall ? '◇' : '■'}-
										</div></td
									>
									<td>{row.effectSize}</td>
									<td>{row.lowerLimit}</td>
									<td>{row.upperLimit}</td>
									<td>{row.weight}</td>
									{#if data.fieldsSettings.variance.used}<td>{row.variance}</td>{/if}
									{#if data.fieldsSettings.standardError.used}<td>{row.standardError}</td>{/if}
									{#if data.fieldsSettings.pValue.used}<td>{row.pValue}</td>{/if}
									{#if data.fieldsSettings.totalSS.used}<td>{row.totalSS}</td>{/if}
									{#if data.fieldsSettings.sampleSizeGroup1.used}<td>{row.sampleSizeGroup1}</td
										>{/if}
									{#if data.fieldsSettings.sampleSizeGroup2.used}<td>{row.sampleSizeGroup2}</td
										>{/if}
									{#if data.fieldsSettings.notAssignedSS.used}<td>{row.notAssignedSS}</td>{/if}
									{#if data.fieldsSettings.ncf1.used}<td>{row.ncf1}</td>{/if}
									{#if data.fieldsSettings.ncf2.used}<td>{row.ncf2}</td>{/if}
									{#if data.fieldsSettings.ncf3.used}<td>{row.ncf3}</td>{/if}
									{#if data.fieldsSettings.ncf4.used}<td>{row.ncf4}</td>{/if}
									{#if data.fieldsSettings.ncf5.used}<td>{row.ncf5}</td>{/if}
									{#if data.fieldsSettings.scf1.used}<td>{row.scf1}</td>{/if}
									{#if data.fieldsSettings.scf2.used}<td>{row.scf2}</td>{/if}
									{#if data.fieldsSettings.scf3.used}<td>{row.scf3}</td>{/if}
									{#if data.fieldsSettings.scf4.used}<td>{row.scf4}</td>{/if}
									{#if data.fieldsSettings.scf5.used}<td>{row.scf5}</td>{/if}
								</tr>
							{/each}
						</tbody>
					</table>

					<button class="standard newstudy" type="button" on:click={() => createNewRow(block.id)}
						>New study</button
					>
				</div>
			{/each}
		</div>

		<h2>Create a new block</h2>
		<NameField bind:value={newBlockName} bind:isOk={newBlockNameIsOk} />
		<button class="standard" type="button" on:click={createNewBlock}>Create</button>
	{/if}
</div>

<style>
	.hide {
		display: none;
	}
	.more_info {
		display: block;
		margin-top: 0;
		margin-bottom: 1em;
	}
	.more_info button {
		display: inline-block;
	}
</style>
