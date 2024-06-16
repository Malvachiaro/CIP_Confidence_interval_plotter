<script lang="ts">
    export let headerHeight_px: number
    export let title: string
    export let titlePosition: number
    export let titleSize: number

    export let isActive: boolean
</script>

<div class="controls_tab" class:isActive>
    <h2>Header</h2>

    <label>Title <input type="text" name="title" bind:value={title} autocomplete="off" /></label>
    
    <label>Header height <input type="range" name="headerHeight_px" bind:value={headerHeight_px} min="0" max="400" />{headerHeight_px}px</label>

    <label>Title size<input type="range" name="titleSize" bind:value={titleSize} min="0" max="100" />{titleSize}</label>
    
    <label>Title vertical position<input type="range" name="titlePosition" bind:value={titlePosition} min="0" max="100" />{titlePosition}</label>

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
