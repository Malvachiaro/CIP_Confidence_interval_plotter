<script lang="ts">
	import { AppActions } from "$lib/cip/actions/Actions";
    import { createEventDispatcher } from 'svelte'


    export let isActive: boolean


	async function generatePlot(){
        await AppActions.plotAutofitBootstrap()
        dispatch('plotReload','rigenerate')
    }

    async function autoAdjust(){
        await AppActions.plotAutofit()
        dispatch('plotReload','autoAdjust')
    }


    const dispatch = createEventDispatcher()

</script>

<div class="controls_tab" class:isActive>
    <h2>Auto-adjust</h2>
    <p>Adjust the table and the chart. Margins and titles will not be modified.</p>
    <button class="standard" type="button" on:click={autoAdjust}>Auto-adjust</button>
    <br/>
    <p>Automatically adjust the plot. Be aware that the graphic layout will be overwritten</p>
    <button class="standard" type="button" on:click={generatePlot}>Regenerate</button>
</div>

<style>
    .controls_tab{
        display: none;
    }
    .isActive {
        display: block;
    }

</style>
