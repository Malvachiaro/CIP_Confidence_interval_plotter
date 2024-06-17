<script lang="ts">
	import { ValueChecker } from "$lib/common/ValueChecker";

	export let isOk: boolean = true;
	export let value: number;
	export let label = 'Value';

	let error = '';

	function check() {
		if (ValueChecker.checkIsNumber(value) == false) {
		    isOk = false;
		    error = 'This value must be a number';
		    return
		}
		isOk = true;
		error = '';
	}
</script>

<label class="field pvalue" for="prjName">
	<span class="label">{label}</span>
	<input class="fieldvalue" type="number" bind:value on:input={check} />
	<span class="error">{error}</span>
</label>

<style>
    label{
        display: inline-block;
    }
	.label {
        display: block;
		margin: 0.5rem 0;
	}
	.fieldvalue {
        display: inline-block;
		margin: 0;
		width: 7rem;
	}
	.error {
		margin: 0.5rem 0;
		font-size: 0.6rem;
	}
	span {
		display: block;
	}
</style>
