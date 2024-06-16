import type { CipProject } from '$lib/cip/models/CipProject';
import type { PageLoad } from './$types';



export const load: PageLoad = async () => {

    let f = await import ('$lib/cip/functions/AppFunctions')

    let prj:CipProject | null = await f.AppFunctions.getRunningProject()

    if(prj == null){
        return {
            projectSettings: null
        }
    }else{
        return {
            projectSettings: {
                name: prj.name,
                description: prj.description,
                nullValue: prj.projectSettings.nullValue
            },
        };
    }
}