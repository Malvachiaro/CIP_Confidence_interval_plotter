<script lang="ts">
	import type { MessageType } from "$lib/common/MessageType_TD";


	export let messageType: MessageType;
</script>

<div class="message_box {messageType}">
	<slot></slot>
</div>

<style>

</style>
