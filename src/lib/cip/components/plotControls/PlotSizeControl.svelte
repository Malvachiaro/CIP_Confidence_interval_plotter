<script lang="ts">
    export let plotWidth_px: number;
    export let leftAndRightMargins_px: number;
    export let headerHeight_px: number;
    export let footerHeight_px: number;
    export let bodyHeight_px: number;

    export let isActive: boolean;

    let resolutions = [
        { name: "Base", value: 800 },
        { name: "Standard", value: 1024 },
        { name: "High", value: 1440 },
        { name: "Full HD", value: 1920 },
    ];
</script>

<div class="controls_tab" class:isActive>
    <h2>Size</h2>

    <fieldset>
    {#each resolutions as resolution}
        <label>
            <input type="radio" bind:group={plotWidth_px} name="plotWidth_px" value={resolution.value} />
            {resolution.name} ({resolution.value})
        </label>

    {/each}
    </fieldset>

    
    <label>Left and right margins <input type="range" name="leftAndRightMargins_px" bind:value={leftAndRightMargins_px} min="0" max="200" />{leftAndRightMargins_px}px</label>
    
    <label>Header height <input type="range" name="headerHeight_pct" bind:value={headerHeight_px} min="0" max="400" />{headerHeight_px}px</label>
    
    <label>Plot Height <input type="range" name="bodyHeight_px" bind:value={bodyHeight_px} min="200" max="5000" step="10" /> {bodyHeight_px}px</label>
    
    <label>Footer height <input type="range" name="footerHeight_px" bind:value={footerHeight_px} min="0" max="400" />{footerHeight_px}px</label>

</div>

<style>
    .controls_tab {
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
