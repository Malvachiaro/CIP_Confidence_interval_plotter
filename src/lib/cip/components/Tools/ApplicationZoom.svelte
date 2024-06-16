<script lang="ts">
	import { RuntimeVariablesFunctions } from '$lib/cip/functions/lowLevel/RunningVariables';
	import { onMount } from 'svelte';

	export let fontSize: number;

	async function increaseFont() {
		fontSize = fontSize + 1;
		await RuntimeVariablesFunctions.setVariable('fontSize', '' + fontSize);
	}
	async function decreaseFont() {
		fontSize = fontSize - 1;
		await RuntimeVariablesFunctions.setVariable('fontSize', '' + fontSize);
	}
	async function resetFont() {
		fontSize = 16;
		await RuntimeVariablesFunctions.setVariable('fontSize', '' + fontSize);
	}

	onMount(async () => {
		let tmp = await RuntimeVariablesFunctions.getVariable('fontSize');
		if (tmp === null) {
			fontSize = 16;
			await RuntimeVariablesFunctions.setVariable('fontSize', '16');
		} else {
			fontSize = Number(tmp);
		}
	});
</script>

<div class="zoom_control">
	<button title="Zoom out" class="zoom_button" type="button" on:click={decreaseFont}>-</button>
	<button title="Reset zoom" class="zoom_text_button" type="button" on:click={resetFont}>zoom<br />{fontSize}</button>
	<button title="Zoom in" class="zoom_button" type="button" on:click={increaseFont}>+</button>
</div>

<style>

</style>
