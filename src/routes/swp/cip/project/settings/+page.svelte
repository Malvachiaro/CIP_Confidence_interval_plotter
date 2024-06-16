<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { AppActions } from '$lib/cip/actions/Actions';
	import MessageBox from '$lib/cip/components/Tools/MessageBox.svelte';
	import NameField from '$lib/cip/components/fields/NameField.svelte';
	import { MESSAGE_TYPE_VALUES, type MessageType } from '$lib/common/MessageType_TD';
	import type { PageData } from './$types';

	export let data: PageData;

	let name: string = data.projectSettings ? data.projectSettings.name : '';
	let description: string | undefined = data.projectSettings?.description;
	let nullValue: number | undefined = data.projectSettings?.nullValue;

	let isOk: boolean = true;

	let messageType: MessageType = MESSAGE_TYPE_VALUES.success as MessageType;
	let message = '';

	async function update() {
		await AppActions.updateProjectSettings(
			name ? name : '',
			description ? description : '',
			nullValue ? nullValue : 0
		);
		invalidateAll();
		messageType = MESSAGE_TYPE_VALUES.success;
		message = 'Project settings updated';
	}
</script>

<div id="page_projectsettings">
	<h1>Project Settings</h1>

		<p>On this page, you can modify the key values of your project. The following fields are available for editing:</p>
		
		<h2>1. Project Name</h2>
		<p>This field allows you to enter or update the name of your project. The project name should be descriptive and concise, helping you easily identify it among other projects.</p>
		<NameField bind:isOk bind:value={name} />
		<h2>2. Project Description</h2>
		<p>Here, you can provide a detailed description of your project. This section should include relevant information about the project's goals, methodologies, and any other important details that give context to your work.</p>
		<label
		>Description <br /><textarea
			class="project_description"
			name="description"
			autocomplete="off"
			bind:value={description}
		/></label
	>
		<h2>3. Null Value</h2>
		<p>This field is used to specify the null value for the forest plot. The null value is an important parameter in the analysis, representing the baseline or reference point against which the effect sizes are compared.</p>
		<label
		>Null value <input
			class="project_nullValue"
			type="number"
			name="nullValue"
			autocomplete="off"
			bind:value={nullValue}
		/></label
	>

		<p class="final_description">After making the necessary changes to these fields, you can save your updates by clicking the "Save Changes" button. This ensures that all your modifications are stored and applied to the project.</p>


	<button class="standard" type="button" on:click={() => update()}>Update</button>

	<MessageBox {messageType}>{message}</MessageBox>
</div>

<style>
 .final_description {
	 margin-top: 3em;
 }
 h2{
	margin-top: 2em;
 }
</style>
