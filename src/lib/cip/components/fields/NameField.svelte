<script lang="ts">
	export let isOk: boolean = true;
	export let value: string;
    export let maxLenght: number = 255
	export let label = 'Name';


	let error = '';



    function checkName() {
        if (value.length == 0) {
            isOk = false;
            error = 'Name is required';
            return
        }
        
        if (value.length > maxLenght) {
            isOk = false;
            error = 'Field lenght must be lower than ' + maxLenght + ' characters';
            return
        }
        
        isOk = true;
        error = '';
    }

</script>

<label class="field pvalue" for="prjName">
	<span class="label">{label}</span>
	<input class="fieldvalue" type="text" bind:value on:input={checkName} />
    <span class="error">{error}</span>
</label>

<style>
    label {
        margin: 0.5rem 0;
    }
    .fieldvalue {
        margin: 0;
    }
    .error {
        margin: 0.5rem 0;
        font-size: 0.6rem;
    }
    span {
        display: block;
    }
</style>
