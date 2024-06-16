<script lang="ts">
    export let fontFamily: string
    export let fontSize: number

    export let isActive: boolean
</script>

<div class="controls_tab" class:isActive>
    <h2>Font</h2>
    <label>Font style
        <select class="standard" name="fontFamily" bind:value={fontFamily} >
            <option value="'Courier New', monospace">'Courier New', monospace</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="inherit">Default theme</option>
        </select>
    </label>
    <label>Font size<input type="range" name="fontSize" bind:value={fontSize} min="8" max="20" step="0.5"/>{fontSize}</label>

</div>

<style>
    .controls_tab{
        display: none;
    }
    .isActive {
        display: block;
    }
    label{
        display: block;
        margin: 0.5rem 0;
    }
</style>


