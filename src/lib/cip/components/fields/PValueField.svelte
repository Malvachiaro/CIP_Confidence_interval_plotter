<script lang="ts">
	export let isOk: boolean = true;
	export let value: number | null;
	export let label = 'p';

	let error = '';

	function check() {
		// if (value == null) {
		//     isOk = false;
		//     error = 'p Value is required';
		//     return
		// }
		// try{
		//     Number(value)
		// }catch(e){
		//     isOk = false;
		//     error = 'p value must be a number';
		//     return
		// }
		if (value != null) {
			if (Number(value) < 0 || Number(value) > 1) {
				isOk = false;
				error = 'p value must be between 0 and 1';
				return;
			}
		}

		isOk = true;
		error = '';
	}
</script>

<label class="field pvalue" for="prjName">
	<span class="label">{label}</span>
	<input class="fieldvalue" type="number" min="0" max="1" step="0.001" bind:value on:input={check} />
	<span class="error">{error}</span>
</label>

<style>
    label{
        display: inline-block;
    }
	.label {
        display: inline-block;
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
