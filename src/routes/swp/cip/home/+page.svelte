<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import { AppActions } from '$lib/cip/actions/Actions';
	import NameField from '$lib/cip/components/fields/NameField.svelte';
	import { AppFunctions } from '$lib/cip/functions/AppFunctions';
	import type { PageData } from './$types';

	export let data: PageData;

	let newProjectName = '';
	let newProjectDescription = '';

	let newProjectFormIsOk = false;

	async function create() {
		await AppActions.createNewProject(newProjectName, newProjectDescription);
		invalidateAll();
	}

	async function open() {
		let ret: boolean = await AppActions.openProjectFromDisk();
		if (ret) {
			goto('./project/fields');
		}
	}

	async function saveAsToDisk() {
		await AppActions.saveProjectAsToDisk();
	}

	async function goToRunningProject() {
		if (data.project_info == null) {
			throw new Error('No project open');
		}
		let chceck: boolean = await AppFunctions.checkFilesystemPermissions(
			data.project_info.filepath!
		);
		if (!chceck) {
			AppFunctions.alert(
				'It seems that the application was not closed correctly the last time. I have fixed the anomaly. Open a saved project or create a new one'
			);
			AppActions.clearCache();
			window.location.reload();
		} else {
			goto('./project/data');
		}
	}
</script>

<div id="page_homepage">
	<h1>Welcome to the SWP Homepage</h1>
	<p>
		On this page, you will need to choose how to proceed with your forest plot project. Super wonder
		plot is designed to help you create comprehensive and visually appealing forest plots. You have
		some options to choose from.
	</p>
	<p>Please select your preferred option to get started!</p>
	<p></p>
	<ol>
		{#if data.project_info != null}
			<li>
				<h2>Use the Currently Open Project</h2>
				<p>
					This option allows you to continue working on the project that you currently have open.
					Please note that this option may not always be available, depending on your current
					session's status.
				</p>
				<p class="alreadyOpen_intro">This project is already open:</p>
				Name:
				<h3 style="margin-top: 0;">{data.project_info.name}</h3>
				Description:
				<div class="description">{data.project_info.description}</div>
				<p>
					If you want, you can go back to this file <button
						class="standard"
						type="button"
						on:click={goToRunningProject}>Go back</button
					>
				</p>
				<p class="saveAs">
					If you need, you can change the filesystem location
					<button class="standard" type="button" on:click={saveAsToDisk}>Save As</button>
				</p>
			</li>
		{/if}

		<li>
			<h2>Load a Project from a previously saved file</h2>
			<p>
				Select this option if you have a project saved on your device that you would like to upload
				and continue working on. Simply locate the saved file on your computer and upload it to
				resume your work.
			</p>
			Load a saved file:<button class="standard" on:click={open}>Load</button>
		</li>

		<li>
			<h2>Create a New Project</h2>
			<p>
				If you prefer to start fresh, you can choose to create a new project. This option will
				provide you with a blank template to begin crafting your new forest plot.
			</p>

			<div class="form-container">
				<NameField bind:isOk={newProjectFormIsOk} bind:value={newProjectName} />
				<label for="prjDescription"
					>Project description
					<textarea id="prjDescription" bind:value={newProjectDescription}></textarea>
				</label>
				<button disabled={!newProjectFormIsOk} class="standard" on:click={create}>Create</button>
			</div>
		</li>
	</ol>
</div>

<style>
	ol {
		counter-reset: item;
	}
	ol > li {
		display: block;
		margin-bottom: 4em;
	}
	ol > li:first-child {
		margin-top: 3em;
	}
	ol > li h2 {
		display: inline-block;
		margin: 0;
		padding-left: 0em;
	}
	ol > li:before {
		content: counter(item) '.';
		counter-increment: item;
		display: inline-block;
		width: 1em;
		margin-left: -1em;
		font-weight: bold;
		font-size: 1.9em;
	}
</style>
