
import type { CipBlock } from "$lib/cip/models/CipBlock";
import type { CipProject } from "$lib/cip/models/CipProject";
import type { PageLoad } from "../$types";

export const load: PageLoad = async ({ url }) => {

    let blockId:number = Number(url.searchParams.get('blockId'));

    let f = await import ('$lib/cip/functions/AppFunctions')
    let prj:CipProject | null = await f.AppFunctions.getRunningProject()
    if(prj == null){
        return {
        }
    }
    
    let tmp:CipBlock | null = await f.AppFunctions.getBlock(blockId);
    if(tmp===null){
        throw Error("No block found")
    } else{
        return {
            blockName: tmp.name,
            blockCSV: tmp.toCSV(),
            fieldsSettings: JSON.parse(JSON.stringify(prj.fieldsSettings)),
        };
    }


};