import { PlotterMatrix } from '$lib/cip/common/PlotterMatrix';
import type { CipProject } from '$lib/cip/models/CipProject';
import type {  PageLoad } from './$types';

//export const prerender = false;

export const load: PageLoad = async () => {
    let f = await import ('$lib/cip/functions/AppFunctions')
    let prj:CipProject | null = await f.AppFunctions.getRunningProject()
    let matrix:PlotterMatrix = new PlotterMatrix(prj)
    
    return {        
        matrix: JSON.parse(JSON.stringify(matrix)),
    };



};
