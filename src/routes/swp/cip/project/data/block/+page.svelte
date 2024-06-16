<script lang="ts">
	import { goto } from '$app/navigation';
	import { AppActions } from '$lib/cip/actions/Actions';
	import NameField from '$lib/cip/components/fields/NameField.svelte';
    import type { PageData } from './$types';
    export let data: PageData;


    let blockName = data.block.name;
    let blockNameIsOk = false;

    async function update(){
        await AppActions.updateBlockName(data.block.id, blockName)
        goto("../data")
    }

</script>

<h1>Change the block name</h1>

    <NameField bind:value={blockName} bind:isOk={blockNameIsOk} />
    <button disabled={!blockNameIsOk} class="standard" type="button" on:click={update}>Update</button>
    <button class="standard" type="button" on:click={() => goto("../data")}>Cancel</button>

<br/><br/>
