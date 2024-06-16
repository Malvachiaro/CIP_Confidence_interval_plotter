<script lang="ts">
    import type { CipBlock } from "$lib/cip/models/CipBlock";
	import { AppActions } from "$lib/cip/actions/Actions";
	import { invalidateAll } from "$app/navigation";
    export let rowId: number;
    export let moveToBlock: CipBlock[];
    export let rowBlockId: number;

    let display_menu = false;

    function toogleDisplayMenu() {
        display_menu = !display_menu;
    }

    function hideMenu() {
        display_menu = false;
    }

    async function deleteRow() {
        hideMenu();
        await AppActions.deleteRow(rowId);
        invalidateAll();
    }


    async function moveRowToBlock(destinationBlockId: number) {
        hideMenu();
        await AppActions.moveRowToBlock(rowBlockId, rowId, destinationBlockId);
        invalidateAll();
    }

    async function moveRowUp() {
        hideMenu();
        await AppActions.moveRowUp(rowBlockId, rowId);
        invalidateAll();
    }

    async function moveRowDown() {
        hideMenu();
        await AppActions.moveRowDown(rowBlockId, rowId);
        invalidateAll();
    }


</script>

<div id="row_menu_popover_wrapper_{rowId}" class="dropdown">
    <button class="dropbtn standard" on:click={() => toogleDisplayMenu()}>...</button>
    <div role="dialog" id="row_menu_popover_{rowId}" class="dropdown-content" style="display: {display_menu ? 'block' : 'none'}" on:mouseleave={() => hideMenu()}>
        <a href="data/row?rowId={rowId}">Open</a>

        <button class="moveUp"  type="button" on:click={moveRowUp}>Move up</button>
        <button class="moveDown" type="submit" on:click={moveRowDown}>Move down</button>

        <hr />
        {#each moveToBlock as block}
            {#if block.id != rowBlockId}
                <button type="submit" on:click={() => moveRowToBlock(block.id)}>Move to {block.name}</button>
            {/if}
        {/each}
        <hr />
            <button type="button" on:click={() => deleteRow()}>Delete</button>
    </div>
</div>

<style>
    .dropdown {
        position: relative;
        display: block;
    }

    .dropbtn {
        padding: 0 0.5rem 0 0.5rem;
        border: none;
        cursor: pointer;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

        z-index: 10;
    }

    .dropdown-content a,
    .dropdown-content button {
        all: unset;
        display: block;
        padding: 0.5rem 1rem;
        text-align: left;
        margin: 0;

        background-color: #f9f9f9;
        color: black;
        text-decoration: none;
        cursor: pointer;
        white-space: nowrap;
        font-size: inherit;
        border: none;
        box-sizing: border-box;
        width: 100%;
    }



    .dropdown-content a:hover,
    .dropdown-content button:hover {
        background-color: var(--main-color2);
    }
</style>
