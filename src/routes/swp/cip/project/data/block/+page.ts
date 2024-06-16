
import type { PageLoad } from './$types';
import type { CipBlock } from '$lib/cip/models/CipBlock';
import type { CipProject } from '$lib/cip/models/CipProject';
import { CipProjectHandler } from '$lib/cip/functions/lowLevel/ProjectHandler';

export const load = (async ({ url }) => {
	let blockId:number = Number(url.searchParams.get('blockId'));
	let f = await import('$lib/cip/functions/AppFunctions');
	let prj: CipProject | null = await f.AppFunctions.getRunningProject();
	if (prj == null) {
		return {};
	}
	let tmp: CipBlock | null = await CipProjectHandler.getBlock(prj, Number(blockId));
	if (tmp === null) {
		throw Error('No block found');
	} else {
		return {
			block: JSON.parse(JSON.stringify(tmp))
		};
	}
}) satisfies PageLoad;
