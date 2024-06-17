<script lang="ts">
	import { AppActions } from "$lib/cip/actions/Actions";

    	async function saveToDisk() {
            await AppActions.saveProjectToDisk()
        }
        async function saveAsToDisk() {
            await AppActions.saveProjectAsToDisk()
        }



</script>
<div class="save-panel">
	<button type="button" on:click={saveToDisk}>Save</button>
	<button type="button" on:click={saveAsToDisk}>Save As</button>
</div>

