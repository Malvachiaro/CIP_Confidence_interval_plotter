<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { CipRow } from '$lib/cip/models/CipRow';
	import { AppActions } from '$lib/cip/actions/Actions';
	import { goto } from '$app/navigation';
	import { AppFunctions } from '$lib/cip/functions/AppFunctions';

	export let data: PageData;

	let importedData: any = '';
	let importedData_json: string = '';
	let error: string | null = null;

	function csvToArr<T>(stringVal: string, splitter: string): T[] {
		// Split the input string into lines, then split each line by the splitter
		const [keys, ...rest] = stringVal
			.trim()
			.split('\n')
			.map((item) => item.split(splitter));

		// Map the rest of the lines to objects using the keys
		const formedArr = rest.map((item) => {
			const object: { [key: string]: string | undefined } = {};
			keys.forEach((key, index) => {
				object[key] = item[index];
			});
			return object as T;
		});

		return formedArr;
	}

	async function importRows() {
		try {
			await AppActions.imporRowsFromJson(Number(data.blockId), importedData_json);
			goto('../../data');
		} catch (err) {
			error = err as string;
		}
	}

	onMount(() => {
		const fileInput = document.getElementById('fileInput') as HTMLInputElement;
		fileInput.addEventListener('change', (event: Event) => {
			const target = event.target as HTMLInputElement;
			const file = target.files?.[0];
			let rows: CipRow[] = [];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					const text = e.target?.result as string;
					importedData = csvToArr(text, '\t');
					if (importedData.length <= 0) {
						error = 'The file is empty. Please check your file and try again.';
					} else {
						rows = [];
						try {
							for (let i = 0; i < importedData.length; i++) {
								rows.push(CipRow.constructFromObject(importedData[i]));
							}
							importedData_json = JSON.stringify(rows);
							error = null;
						} catch (err) {
							if (err instanceof Error) {
								error = 'An error occurred:' + err.message;
							} else {
								error = 'An unexpected error occurred.';
							}
						}
					}
				};
				reader.readAsText(file);
			}
		});
	});

	async function download_template() {
		try {
			const response = await fetch('/templates/swp_import_template.csv');
			if (response.ok) {
				let content = await response.text();
				await AppFunctions.downloadAsTextFile(content, "CVS/text", "swp_import_template", "csv");
			} else {
				console.error('Failed to fetch the file:', response.statusText);
			}
		} catch (error) {
			console.error('Error fetching the file:', error);
		}
	}
</script>

<div id="page_import">
	<h1>Import data from a .csv file</h1>
	<h2>Block: {data.blockName}</h2>
	<p>
		It is very simple to import data via file. You just need to prepare a .csv file using a
		spreadsheet program like MS Excel or Google Sheets.
	</p>
	<p>
		Download a ready-to-use template from
		<button type="button" on:click={download_template} class="template_download_button">here</button
		>
		to use with your spreadsheet software. Do not modify the column headers or the data will not be imported.
	</p>
	<p>
		The spreadsheet should automatically recognize all separators and delimiters. If this does not
		happen and when saving it asks you to choose the data separators, set these values:
	</p>
	<ul>
		<li>Row separator: Line-break, or New-line, or "\n"</li>
		<li>Field separator: Tab or "\t"</li>
		<li>String delimiter: None or leave empty</li>
	</ul>
	<p>When the file is ready with the data, upload it from here:</p>
	<input type="file" id="fileInput" accept=".csv" />

	<p>
		Once uploaded, if there are no errors you will find a preview of the import below. Check that it
		is ok.
	</p>

	{#if error}
		<div class="error">{error}</div>
	{:else}
		<div id="import_check" class="import_check">
			{#if importedData}
				<table class="dataset">
					<thead>
						<tr>
							<th>
								{data.fieldsSettings.name.label}
							</th>
							<th>Overall</th>
							<th>
								{data.fieldsSettings.effectSize.label}
							</th>
							<th>{data.fieldsSettings.lowerLimit.label}</th>
							<th>{data.fieldsSettings.upperLimit.label}</th>
							<th>{data.fieldsSettings.weight.label}</th>
							<th>{data.fieldsSettings.variance.label}</th>
							<th>{data.fieldsSettings.standardError.label}</th>
							<th>{data.fieldsSettings.pValue.label}</th>
							<th>{data.fieldsSettings.totalSS.label}</th>
							<th>{data.fieldsSettings.sampleSizeGroup1.label}</th>
							<th>{data.fieldsSettings.sampleSizeGroup2.label}</th>
							<th>{data.fieldsSettings.notAssignedSS.label}</th>
							<th>{data.fieldsSettings.ncf1.label}</th>
							<th>{data.fieldsSettings.ncf2.label}</th>
							<th>{data.fieldsSettings.ncf3.label}</th>
							<th>{data.fieldsSettings.ncf4.label}</th>
							<th>{data.fieldsSettings.ncf5.label}</th>
							<th>{data.fieldsSettings.scf1.label}</th>
							<th>{data.fieldsSettings.scf2.label}</th>
							<th>{data.fieldsSettings.scf3.label}</th>
							<th>{data.fieldsSettings.scf4.label}</th>
							<th>{data.fieldsSettings.scf5.label}</th>
						</tr>
					</thead>
					<tbody>
						{#each importedData as row}
							<tr>
								<td>{row.name}</td>
								<td>{row.isOverall}</td>
								<td>{row.effectSize}</td>
								<td>{row.lowerLimit}</td>
								<td>{row.upperLimit}</td>
								<td>{row.weight}</td>
								<td>{row.variance}</td>
								<td>{row.standardError}</td>
								<td>{row.pValue}</td>
								<td>{row.totalSS}</td>
								<td>{row.sampleSizeGroup1}</td>
								<td>{row.sampleSizeGroup2}</td>
								<td>{row.notAssignedSS}</td>
								<td>{row.ncf1}</td>
								<td>{row.ncf2}</td>
								<td>{row.ncf3}</td>
								<td>{row.ncf4}</td>
								<td>{row.ncf5}</td>
								<td>{row.scf1}</td>
								<td>{row.scf2}</td>
								<td>{row.scf3}</td>
								<td>{row.scf4}</td>
								<td>{row.scf5}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				Waiting for data...
			{/if}
		</div>
	{/if}

	{#if !error && importedData.length > 0}
		<span>If everything is ok, </span>
		<button class="standard" type="button" on:click={importRows}>Import</button>
		<span>the data</span> or you can go back to the <button class="standard" type="button" on:click={()=>goto("../../data")}>previous</button> page
	{/if}
</div>

<style>
</style>
