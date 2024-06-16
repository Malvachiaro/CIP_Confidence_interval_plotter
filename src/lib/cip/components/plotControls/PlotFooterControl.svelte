<script lang="ts">
    export let footerHeight_px: number
    export let footerText: string
    export let footerTextSize: number
    export let footerTextIsCentered: boolean
    export let isActive: boolean
</script>

<div class="controls_tab" class:isActive>
    <h2>Footer</h2>

    <label>Text <input type="text" name="footerText" bind:value={footerText} autocomplete="off" /></label>
    
    <label>Footer height <input type="range" name="footerHeight_px" bind:value={footerHeight_px} min="0" max="400" />{footerHeight_px}px</label>
    
    <label>Text size<input type="range" name="footerTextSize" bind:value={footerTextSize} min="0" max="100" />{footerTextSize}</label>
    
    <label><input type="checkbox" name="footerTextIsCentered" bind:checked={footerTextIsCentered}/> Footer text is centered?</label>

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
