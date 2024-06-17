<script lang="ts">
    export let plotWidth_px: number
    export let leftAndRightMargins_px: number

    export let headerHeight_px: number
    export let bodyHeight_px: number


    export let isActive: boolean

</script>


{#if isActive}

<rect x="0" y="{headerHeight_px}" height="{bodyHeight_px}" width="{leftAndRightMargins_px}" class="background_area"></rect>
<rect x="{plotWidth_px-leftAndRightMargins_px}" y="{headerHeight_px}" height="{bodyHeight_px}" width="{leftAndRightMargins_px}" class="background_area"></rect>

{/if}


