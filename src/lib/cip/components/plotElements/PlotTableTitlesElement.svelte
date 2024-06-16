<script lang="ts">

    export let y_px: number;
    export let x1: number;
    export let bodyWidth_px: number;

    export let column_position_name: number;
    export let column_position_effectSize: number;
    export let column_position_lowerLimit: number;
    export let column_position_upperLimit: number;
    export let column_position_weight: number;
    export let column_position_variance: number;
    export let column_position_standardError: number;
    export let column_position_pValue: number;
    export let column_position_totalSS: number;
    export let column_position_sampleSizeGroup1: number;
    export let column_position_sampleSizeGroup2: number;
    export let column_position_notAssignedSS: number;
    export let column_position_ncf1: number;
    export let column_position_ncf2: number;
    export let column_position_ncf3: number;
    export let column_position_ncf4: number;
    export let column_position_ncf5: number;
    export let column_position_scf1: number;
    export let column_position_scf2: number;
    export let column_position_scf3: number;
    export let column_position_scf4: number;
    export let column_position_scf5: number;
    export let column_position_ci: number;

    export let real_font_size: number;
    export let fieldsSettings: any;
</script>



{#if fieldsSettings.name.used && fieldsSettings.name.visible}
    <text x="{x1 + bodyWidth_px * column_position_name/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.name.label}</text>
{/if}
{#if fieldsSettings.effectSize.used && fieldsSettings.effectSize.visible}
    <text x="{x1 + bodyWidth_px * column_position_effectSize/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.effectSize.label}</text>
{/if}

{#if fieldsSettings.lowerLimit.used && fieldsSettings.lowerLimit.visible}
    <text x="{x1 + bodyWidth_px * column_position_lowerLimit/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.lowerLimit.label}</text>
{/if}

{#if fieldsSettings.upperLimit.used && fieldsSettings.upperLimit.visible}
    <text x="{x1 + bodyWidth_px * column_position_upperLimit/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.upperLimit.label}</text>
{/if}

{#if fieldsSettings.ci.used && fieldsSettings.ci.visible}
    <text x="{x1 + bodyWidth_px * column_position_ci/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.ci.label}</text>
{/if}

{#if fieldsSettings.weight.used && fieldsSettings.weight.visible}
    <text x="{x1 + bodyWidth_px * column_position_weight/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.weight.label}</text>
{/if}

{#if fieldsSettings.variance.used && fieldsSettings.variance.visible}
    <text x="{x1 + bodyWidth_px * column_position_variance/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.variance.label}</text>
{/if}

{#if fieldsSettings.standardError.used && fieldsSettings.standardError.visible}
    <text x="{x1 + bodyWidth_px * column_position_standardError/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.standardError.label}</text>
{/if}

{#if fieldsSettings.pValue.used && fieldsSettings.pValue.visible}
    <text x="{x1 + bodyWidth_px * column_position_pValue/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.pValue.label}</text>
{/if}

{#if fieldsSettings.totalSS.used && fieldsSettings.totalSS.visible}
    <text x="{x1 + bodyWidth_px * column_position_totalSS/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.totalSS.label}</text>
{/if}

{#if fieldsSettings.sampleSizeGroup1.used && fieldsSettings.sampleSizeGroup1.visible}
    <text x="{x1 + bodyWidth_px * column_position_sampleSizeGroup1/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.sampleSizeGroup1.label}</text>
{/if}

{#if fieldsSettings.sampleSizeGroup2.used && fieldsSettings.sampleSizeGroup2.visible}
    <text x="{x1 + bodyWidth_px * column_position_sampleSizeGroup2/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.sampleSizeGroup2.label}</text>
{/if}

{#if fieldsSettings.notAssignedSS.used && fieldsSettings.notAssignedSS.visible}
    <text x="{x1 + bodyWidth_px * column_position_notAssignedSS/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.notAssignedSS.label}</text>
{/if}

{#if fieldsSettings.ncf1.used && fieldsSettings.ncf1.visible}
    <text x="{x1 + bodyWidth_px * column_position_ncf1/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.ncf1.label}</text>
{/if}
{#if fieldsSettings.ncf2.used && fieldsSettings.ncf2.visible}
    <text x="{x1 + bodyWidth_px * column_position_ncf2/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.ncf2.label}</text>
{/if}
{#if fieldsSettings.ncf3.used && fieldsSettings.ncf3.visible}
    <text x="{x1 + bodyWidth_px * column_position_ncf3/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.ncf3.label}</text>
{/if}
{#if fieldsSettings.ncf4.used && fieldsSettings.ncf4.visible}
    <text x="{x1 + bodyWidth_px * column_position_ncf4/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.ncf4.label}</text>
{/if}
{#if fieldsSettings.ncf5.used && fieldsSettings.ncf5.visible}
    <text x="{x1 + bodyWidth_px * column_position_ncf5/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.ncf5.label}</text>
{/if}

{#if fieldsSettings.scf1.used && fieldsSettings.scf1.visible}
    <text x="{x1 + bodyWidth_px * column_position_scf1/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.scf1.label}</text>
{/if}

{#if fieldsSettings.scf2.used && fieldsSettings.scf2.visible}
    <text x="{x1 + bodyWidth_px * column_position_scf2/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.scf2.label}</text>
{/if}

{#if fieldsSettings.scf3.used && fieldsSettings.scf3.visible}
    <text x="{x1 + bodyWidth_px * column_position_scf3/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.scf3.label}</text>
{/if}

{#if fieldsSettings.scf4.used && fieldsSettings.scf4.visible}
    <text x="{x1 + bodyWidth_px * column_position_scf4/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.scf4.label}</text>
{/if}

{#if fieldsSettings.scf5.used && fieldsSettings.scf5.visible}
    <text x="{x1 + bodyWidth_px * column_position_scf5/100}" y="{y_px}" class="bold" font-size={real_font_size}>{fieldsSettings.scf5.label}</text>
{/if}
