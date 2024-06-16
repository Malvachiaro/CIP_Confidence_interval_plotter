<script>
	import { AppActions } from '$lib/cip/actions/Actions';
	import { AppFunctions } from '$lib/cip/functions/AppFunctions';
	import { listen } from '@tauri-apps/api/event';
	import { invoke } from '@tauri-apps/api/tauri';
	import { onMount } from 'svelte';

	async function handleCloseEvent() {
		await AppActions.clearCache();
		invoke('close_app');
	}

	onMount(async () => {
		listen('tauri://close-requested', async (event) => {
			await handleCloseEvent();
		});

		let prj = await AppFunctions.getRunningProject();
		if(prj != null){
			let check = await AppFunctions.checkRunningProjectPermissions();

			if(!check){
				await AppActions.clearCache();
				await AppFunctions.alert(
					'It seems that the application was not closed correctly the last time. I have fixed the anomaly.'
				);
				
				window.location.reload()
			}
		}
	});
</script>

<slot></slot>
