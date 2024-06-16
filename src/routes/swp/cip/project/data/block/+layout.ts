
import type { LayoutLoad } from './$types';


export const load: LayoutLoad = async ({ url }) => {
	let blockId = url.searchParams.get('blockId');
	return {
		blockId: blockId
	};
};
