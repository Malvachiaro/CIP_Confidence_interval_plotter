<script lang="ts">
    import { SortTD, type SortTD_DirectionType } from "$lib/common/SortDT";
    import { CipTD, type CipFieldNameType } from "$lib/cip/types/CipTD";
	import { AppFunctions } from "$lib/cip/functions/AppFunctions";
	import { invalidateAll } from "$app/navigation";

    export let fieldsSettings: any;
    export let sortBy: CipFieldNameType;
    export let sortDirection: SortTD_DirectionType;


    async function sortRows(): Promise<void> {
        await AppFunctions.sortRows(sortBy, sortDirection);
        invalidateAll()
    }   
</script>

<div class="sort_es_box">
        <span style="font-size: 1rem;">Sort by</span>
        <select class="standard" name="sortBy" bind:value={sortBy}>
            {#each CipTD.FIELDS_NAMES_LIST_WITHOUT_CI as field}
                {#if fieldsSettings[field] != null && fieldsSettings[field].used}
                    <option value="{field}">{fieldsSettings[field].label}</option>
                {/if}
            {/each}
        </select>
        <select class="standard" name="sortDirection" bind:value={sortDirection}>
            <option value={SortTD.SORT_DIRECTIONS.ASCENDING}>{SortTD.SORT_DIRECTIONS.ASCENDING}</option>
            <option value={SortTD.SORT_DIRECTIONS.DESCENDING}>{SortTD.SORT_DIRECTIONS.DESCENDING}</option>
        </select>
        <button class="standard" type="button" on:click={sortRows}>Sort</button>
</div>

<style>


</style>
