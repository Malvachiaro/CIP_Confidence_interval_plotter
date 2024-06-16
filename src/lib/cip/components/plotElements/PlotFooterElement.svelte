<script lang="ts">
    export let plotHeight_px: number;
    export let footerHeight_px: number;

    export let footerText: string;
    export let footerTextSize: number;
    export let footerTextIsCentered: boolean;
    export let leftMargin_px: number;
    export let isActive: boolean;
</script>

{#if isActive}
    <!-- <rect x=0 y="{plotHeight_px-footerHeight_px}" height="{footerHeight_px}" width="100%" class="background_area"></rect>
    <text x="5%" y="99%" class="background_area_tooltip" style="font-size: {footerHeight_px/2}px;">FOOTER</text> -->
{/if}

<text
    transform="translate(0,{(footerHeight_px * footerTextSize) / 200})"
    x={footerTextIsCentered ? "50%" : leftMargin_px}
    y={plotHeight_px - footerHeight_px / 2}
    class={footerTextIsCentered ? "centered" : ""}
    style="font-size: {footerTextSize}px;">{footerText}</text
>

