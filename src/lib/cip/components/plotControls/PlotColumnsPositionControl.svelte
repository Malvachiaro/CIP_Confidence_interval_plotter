<script lang="ts">
    export let blocks_titles_position: Number

    export let column_position_name: Number
    export let column_position_effectSize: Number
    export let column_position_lowerLimit: Number
    export let column_position_upperLimit: Number
    export let column_position_weight: Number
    export let column_position_variance: Number
    export let column_position_standardError: Number
    export let column_position_pValue: Number
    export let column_position_totalSS: Number
    export let column_position_sampleSizeGroup1: Number
    export let column_position_sampleSizeGroup2: Number
    export let column_position_notAssignedSS: Number
    export let column_position_ncf1: Number
    export let column_position_ncf2: Number
    export let column_position_ncf3: Number
    export let column_position_ncf4: Number
    export let column_position_ncf5: Number
    export let column_position_scf1: Number
    export let column_position_scf2: Number
    export let column_position_scf3: Number
    export let column_position_scf4: Number
    export let column_position_scf5: Number
    export let column_position_ci: Number

    export let fieldsSettings: any

    export let isActive: boolean
</script>

<div class="controls_tab" class:isActive>
    <h2>Columns</h2>

    <label>Blocks titles<input type="range" name="blocks_titles_position" bind:value={blocks_titles_position} min="0" max="100"/>{blocks_titles_position}%</label>

    {#if fieldsSettings.name.used && fieldsSettings.name.visible}
        <label>{fieldsSettings.name.label}<input type="range" name="column_position_name" bind:value={column_position_name} min="0" max="100"/>{column_position_name}%</label>
    {/if}
    {#if fieldsSettings.effectSize.used && fieldsSettings.effectSize.visible}
        <label>{fieldsSettings.effectSize.label}<input type="range" name="column_position_effectSize" bind:value={column_position_effectSize} min="0" max="100"/>{column_position_effectSize}%</label>
    {/if}

    {#if fieldsSettings.lowerLimit.used && fieldsSettings.lowerLimit.visible}
        <label>{fieldsSettings.lowerLimit.label}<input type="range" name="column_position_lowerLimit" bind:value={column_position_lowerLimit} min="0" max="100"/>{column_position_lowerLimit}%</label>
    {/if}

    {#if fieldsSettings.upperLimit.used && fieldsSettings.upperLimit.visible}
        <label>{fieldsSettings.upperLimit.label}<input type="range" name="column_position_upperLimit" bind:value={column_position_upperLimit} min="0" max="100"/>{column_position_upperLimit}%</label>
    {/if}
    {#if fieldsSettings.ci.used && fieldsSettings.ci.visible}
        <label>{fieldsSettings.ci.label}<input type="range" name="column_position_ci" bind:value={column_position_ci} min="0" max="100"/>{column_position_ci}%</label>
    {/if}

    {#if fieldsSettings.weight.used && fieldsSettings.weight.visible}
        <label>{fieldsSettings.weight.label}<input type="range" name="column_position_weight" bind:value={column_position_weight} min="0" max="100"/>{column_position_weight}%</label>
    {/if}

    {#if fieldsSettings.variance.used && fieldsSettings.variance.visible}
        <label>{fieldsSettings.variance.label}<input type="range" name="column_position_variance" bind:value={column_position_variance} min="0" max="100"/>{column_position_variance}%</label>
    {/if}
    {#if fieldsSettings.standardError.used && fieldsSettings.standardError.visible}
    <label>{fieldsSettings.standardError.label}<input type="range" name="column_position_standardError" bind:value={column_position_standardError} min="0" max="100"/>{column_position_standardError}%</label>
    {/if}
    
    {#if fieldsSettings.pValue.used && fieldsSettings.pValue.visible}
        <label>{fieldsSettings.pValue.label}<input type="range" name="column_position_pValue" bind:value={column_position_pValue} min="0" max="100"/>{column_position_pValue}%</label>
    {/if}
    
    {#if fieldsSettings.totalSS.used && fieldsSettings.totalSS.visible}
        <label>{fieldsSettings.totalSS.label}<input type="range" name="column_position_totalSS" bind:value={column_position_totalSS} min="0" max="100"/>{column_position_totalSS}%</label>
    {/if}
    
    {#if fieldsSettings.sampleSizeGroup1.used && fieldsSettings.sampleSizeGroup1.visible}
        <label>{fieldsSettings.sampleSizeGroup1.label}<input type="range" name="column_position_sampleSizeGroup1" bind:value={column_position_sampleSizeGroup1} min="0" max="100"/>{column_position_sampleSizeGroup1}%</label>
    {/if}
    
    {#if fieldsSettings.sampleSizeGroup2.used && fieldsSettings.sampleSizeGroup2.visible}
        <label>{fieldsSettings.sampleSizeGroup2.label}<input type="range" name="column_position_sampleSizeGroup2" bind:value={column_position_sampleSizeGroup2} min="0" max="100"/>{column_position_sampleSizeGroup2}%</label>
    {/if}
    
    {#if fieldsSettings.notAssignedSS.used && fieldsSettings.notAssignedSS.visible}
        <label>{fieldsSettings.notAssignedSS.label}<input type="range" name="column_position_notAssignedSS" bind:value={column_position_notAssignedSS} min="0" max="100"/>{column_position_notAssignedSS}%</label>
    {/if}
    
    {#if fieldsSettings.ncf1.used && fieldsSettings.ncf1.visible}
        <label>{fieldsSettings.ncf1.label}<input type="range" name="column_position_ncf1" bind:value={column_position_ncf1} min="0" max="100"/>{column_position_ncf1}%</label>
    {/if}
    {#if fieldsSettings.ncf2.used && fieldsSettings.ncf2.visible}
        <label>{fieldsSettings.ncf2.label}<input type="range" name="column_position_ncf2" bind:value={column_position_ncf2} min="0" max="100"/>{column_position_ncf2}%</label>
    {/if}
    
    {#if fieldsSettings.ncf3.used && fieldsSettings.ncf3.visible}
        <label>{fieldsSettings.ncf3.label}<input type="range" name="column_position_ncf3" bind:value={column_position_ncf3} min="0" max="100"/>{column_position_ncf3}%</label>
    {/if}
    
    {#if fieldsSettings.ncf4.used && fieldsSettings.ncf4.visible}
        <label>{fieldsSettings.ncf4.label}<input type="range" name="column_position_ncf4" bind:value={column_position_ncf4} min="0" max="100"/>{column_position_ncf4}%</label>
    {/if}
    
    {#if fieldsSettings.ncf5.used && fieldsSettings.ncf5.visible}
        <label>{fieldsSettings.ncf5.label}<input type="range" name="column_position_ncf5" bind:value={column_position_ncf5} min="0" max="100"/>{column_position_ncf5}%</label>
    {/if}
    
    {#if fieldsSettings.scf1.used && fieldsSettings.scf1.visible}
        <label>{fieldsSettings.scf1.label}<input type="range" name="column_position_scf1" bind:value={column_position_scf1} min="0" max="100"/>{column_position_scf1}%</label>
    {/if}
    
    {#if fieldsSettings.scf2.used && fieldsSettings.scf2.visible}
        <label>{fieldsSettings.scf2.label}<input type="range" name="column_position_scf2" bind:value={column_position_scf2} min="0" max="100"/>{column_position_scf2}%</label>
    {/if}
    
    {#if fieldsSettings.scf3.used && fieldsSettings.scf3.visible}
        <label>{fieldsSettings.scf3.label}<input type="range" name="column_position_scf3" bind:value={column_position_scf3} min="0" max="100"/>{column_position_scf3}%</label>
    {/if}
    
    {#if fieldsSettings.scf4.used && fieldsSettings.scf4.visible}
        <label>{fieldsSettings.scf4.label}<input type="range" name="column_position_scf4" bind:value={column_position_scf4} min="0" max="100"/>{column_position_scf4}%</label>
    {/if}
    
    {#if fieldsSettings.scf5.used && fieldsSettings.scf5.visible}
        <label>{fieldsSettings.scf5.label}<input type="range" name="column_position_scf5" bind:value={column_position_scf5} min="0" max="100"/>{column_position_scf5}%</label>
    {/if}


    
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
