<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { AppActions } from "$lib/cip/actions/Actions";
    import { CipBlock } from "$lib/cip/models/CipBlock";
    export let blockId:number;
    export let blockObject:string


    let display_menu = false


    function toogleDisplayMenu() {
        display_menu = !display_menu
    }


    function hideMenu() {
        display_menu = false
    }



    async function deleteBlock(blockId:number) {
        hideMenu()
        await AppActions.deleteBlock(blockId)
        invalidateAll()
    }

    async function moveBlockUp() {
        hideMenu();
        await AppActions.moveBlockUp(blockId);
        invalidateAll();
    }

    async function moveBlockDown() {
        hideMenu();
        await AppActions.moveBlockDown(blockId);
        invalidateAll();
    }



    function copyTableToCliboard() {
        let block:CipBlock = CipBlock.constructFromObject(blockObject)
        navigator.clipboard.writeText(block.toCSV())
        hideMenu()
    }
    





</script>


<div id="block_menu_popover_wrapper_{blockId}" class="dropdown">
    <button class="dropbtn standard" on:click={()=>toogleDisplayMenu()}>...</button>
    <div role="dialog" id="block_menu_popover_{blockId}"  class="dropdown-content" style="display: {display_menu ? 'block' : 'none'}"  on:mouseleave={()=>hideMenu()}>
        <a href="data/block?blockId={blockId}">Edit</a>

        <button class="moveUp" type="submit" on:click={moveBlockUp}>Move up</button>
        <button class="moveDown" type="submit" on:click={moveBlockDown}>Move down</button>

        <hr/>
        <button type="button" on:click={()=>copyTableToCliboard()}>Copy table to clipboard</button>
        <a href="./data/block/import?blockId={blockId}">Import data</a>
        <hr/>
            <button type="button" on:click={()=>deleteBlock(blockId)}>Delete</button>
    </div>
</div>




<style>
    .dropdown {
        position: relative;
        display: inline-block;
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
        min-width: 7rem;
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

    button{
        cursor: pointer;
    }
</style>
