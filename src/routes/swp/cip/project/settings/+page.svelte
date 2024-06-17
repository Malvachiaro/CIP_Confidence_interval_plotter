<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { AppActions } from '$lib/cip/actions/Actions';
	import MessageBox from '$lib/cip/components/Tools/MessageBox.svelte';
	import MandatoryValueField from '$lib/cip/components/fields/MandatoryValueField.svelte';
	import NameField from '$lib/cip/components/fields/NameField.svelte';
	import { MESSAGE_TYPE_VALUES, type MessageType } from '$lib/common/MessageType_TD';
	import type { PageData } from './$types';

	export let data: PageData;

	let name: string = data.projectSettings ? data.projectSettings.name : '';
	let description: string | undefined = data.projectSettings?.description;
	let nullValue: number  = data.projectSettings? data.projectSettings.nullValue : 0;

	let isOkNullValue: boolean = true;
	let isOkName: boolean = true;

	$: isOk = isOkName && isOkNullValue;

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

	<NameField bind:isOk={isOkName} bind:value={name} />
	<br />
	<label>
		Description <br /><textarea
			class="project_description"
			name="description"
			autocomplete="off"
			bind:value={description}
		/>
	</label>
	<br />
	<MandatoryValueField label="Null value" bind:isOk={isOkNullValue} bind:value={nullValue} />

	<br /><br />
	<button disabled={!isOk} class="standard" type="button" on:click={() => update()}>Update</button>

	<MessageBox {messageType}>{message}</MessageBox>
</div>



