<script lang="ts">
	export let field_name: string;
	export let title: string;
	export let isUsed: boolean;
	export let isVisible: boolean;
	export let label: string;
	export let error: string | null = null;
</script>

<tr>
	<td> <input type="checkbox" name="{field_name}_used" bind:checked={isUsed} /></td>
	<td>{title}</td>
	<td><input type="checkbox" name="{field_name}_visible" bind:checked={isVisible} /></td>
	<td><input type="text" name="{field_name}_label" autocomplete="off" bind:value={label} /></td>
	<td
		>{#if error}<span class="invalid">{error}</span>{/if}</td
	>
</tr>

<style>
	td {
		border: 1px solid #dddddd;
	}

	tr td:last-child {
		border: none;
	}

	td {
		padding: 0 10px;
		text-align: center;
	}

	tr td:nth-child(2) {
		text-align: left;
	}

	tr.unused td:nth-child(3) input,
	tr.unused td:nth-child(4) input {
		display: none;
	}
</style>
