<script lang="ts">

    export let y_px: number;
    export let x1_px: number;
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
    export let row: any;
</script>



{#if fieldsSettings.name.used && fieldsSettings.name.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_name/100}" y="{y_px}" font-size={real_font_size}>{row.name}</text>
{/if}
{#if fieldsSettings.effectSize.used && fieldsSettings.effectSize.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_effectSize/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.effectSize}</text>
{/if}

{#if fieldsSettings.lowerLimit.used && fieldsSettings.lowerLimit.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_lowerLimit/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.lowerLimit}</text>
{/if}

{#if fieldsSettings.upperLimit.used && fieldsSettings.upperLimit.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_upperLimit/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.upperLimit}</text>
{/if}

{#if fieldsSettings.ci.used && fieldsSettings.ci.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_ci/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : "[" + row.row.lowerLimit + ", " + row.row.upperLimit + "]"}</text>
{/if}

{#if fieldsSettings.weight.used && fieldsSettings.weight.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_weight/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.weight}</text>
{/if}

{#if fieldsSettings.variance.used && fieldsSettings.variance.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_variance/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.variance}</text>
{/if}

{#if fieldsSettings.standardError.used && fieldsSettings.standardError.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_standardError/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.standardError}</text>
{/if}

{#if fieldsSettings.pValue.used && fieldsSettings.pValue.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_pValue/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.pValue}</text>
{/if}

{#if fieldsSettings.totalSS.used && fieldsSettings.totalSS.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_totalSS/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.totalSS}</text>
{/if}

{#if fieldsSettings.sampleSizeGroup1.used && fieldsSettings.sampleSizeGroup1.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_sampleSizeGroup1/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.sampleSizeGroup1}</text>
{/if}
{#if fieldsSettings.sampleSizeGroup2.used && fieldsSettings.sampleSizeGroup2.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_sampleSizeGroup2/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.sampleSizeGroup2}</text>
{/if}

{#if fieldsSettings.notAssignedSS.used && fieldsSettings.notAssignedSS.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_notAssignedSS/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.notAssignedSS}</text>
{/if}

{#if fieldsSettings.ncf1.used && fieldsSettings.ncf1.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_ncf1/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.ncf1}</text>
{/if}

{#if fieldsSettings.ncf2.used && fieldsSettings.ncf2.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_ncf2/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.ncf2}</text>
{/if}

{#if fieldsSettings.ncf3.used && fieldsSettings.ncf3.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_ncf3/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.ncf3}</text>
{/if}

{#if fieldsSettings.ncf4.used && fieldsSettings.ncf4.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_ncf4/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.ncf4}</text>
{/if}

{#if fieldsSettings.ncf5.used && fieldsSettings.ncf5.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_ncf5/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.ncf5}</text>
{/if}

{#if fieldsSettings.scf1.used && fieldsSettings.scf1.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_scf1/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.scf1}</text>
{/if}

{#if fieldsSettings.scf2.used && fieldsSettings.scf2.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_scf2/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.scf2}</text>
{/if}

{#if fieldsSettings.scf3.used && fieldsSettings.scf3.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_scf3/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.scf3}</text>
{/if}

{#if fieldsSettings.scf4.used && fieldsSettings.scf4.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_scf4/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.scf4}</text>
{/if}

{#if fieldsSettings.scf5.used && fieldsSettings.scf5.visible}
    <text x="{x1_px + bodyWidth_px *  column_position_scf5/100}" y="{y_px}" font-size={real_font_size}>{row.row === null ? "" : row.row.scf5}</text>
{/if}
