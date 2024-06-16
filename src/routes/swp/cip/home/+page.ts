import { RuntimeVariablesFunctions } from "$lib/cip/functions/lowLevel/RunningVariables";
import type { PageLoad } from "./$types";




export const load: PageLoad = async () => {

    let f = await import ('$lib/cip/functions/AppFunctions')

    let info:any = await f.AppFunctions.getRunningProjectInfo();
    let filepath = await RuntimeVariablesFunctions.getVariable('projectFilepath');

    if(info!=null){
        return {
            project_info: {
                name: info.name,
                description: info.description,
                filepath: filepath
            }
        }
    }else{
        return {
            project_info: null
        }
    }

};
