<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import { AppActions } from '$lib/cip/actions/Actions';
	import NameField from '$lib/cip/components/fields/NameField.svelte';

	let newProjectName = '';
	let newProjectDescription = '';

	let newProjectFormIsOk = false;

	let createFormVisible: boolean = false;

	async function showCreateForm() {
		createFormVisible = true;
	}
	async function hideCreateForm() {
		createFormVisible = false;
	}

	async function create() {
		await AppActions.createNewProject(newProjectName, newProjectDescription);
		goto('./cip/project/fields');
	}

	async function load() {
		await hideCreateForm();
		let ret: boolean = await AppActions.openProjectFromDisk();
		if (ret) {
			goto('./cip/project/fields');
		}
	}
</script>

<div id="starting_page">
	<h1>Let's start</h1>
	<div class="create_or_load">
		<button class="standard" on:click={load}>Load</button>
		or
		<button class="standard" on:click={showCreateForm}>Create</button>
		a project?
	</div>
	<div class:hide={!createFormVisible} class="create_new_project_form">
		<NameField bind:isOk={newProjectFormIsOk} bind:value={newProjectName} />
		<label for="prjDescription"
			><span>Project description</span>
			<textarea id="prjDescription" bind:value={newProjectDescription}></textarea>
		</label>
		<button disabled={!newProjectFormIsOk} class="standard" on:click={create}>Create</button>
	</div>
</div>

<style>
	.hide {
		display: none;
	}
	.create_new_project_form {
		margin-top: 3rem;
	}
	.create_new_project_form span {
		display: block;
		margin-top: 1rem;
	}
</style>
