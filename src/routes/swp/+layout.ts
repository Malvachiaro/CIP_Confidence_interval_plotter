import { RuntimeVariablesFunctions } from '$lib/cip/functions/lowLevel/RunningVariables';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({params }) => {
    let tmp = await RuntimeVariablesFunctions.getVariable("theme")
    let f = await import ('$lib/cip/functions/AppFunctions')

    if(tmp == null){
        tmp = "nightsky"
        await RuntimeVariablesFunctions.setVariable("theme", tmp)
    }
    return {
        app_info:  await f.AppFunctions.getAppVersion(),
        theme: tmp
    };
    
};