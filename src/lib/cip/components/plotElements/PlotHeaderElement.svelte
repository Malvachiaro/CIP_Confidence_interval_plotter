<script lang="ts">
    export let headerHeight_px: number;
    export let title: string;
    export let titlePosition: number;
    export let titleSize: number;
    export let isActive: boolean;
</script>

{#if isActive}
    <!-- <rect height="{headerHeight_px}" width="100%" class="background_area"></rect>
    <text x="5%" y="{headerHeight_px*0.5+headerHeight_px/4}" class="background_area_tooltip" style="font-size: {headerHeight_px/2}px;">HEADER</text> -->
{/if}

<text x="50%" y={headerHeight_px - (titlePosition / 100) * headerHeight_px}  style="font-weight: bold; text-anchor: middle; font-size: {titleSize}px;">{title}</text>

