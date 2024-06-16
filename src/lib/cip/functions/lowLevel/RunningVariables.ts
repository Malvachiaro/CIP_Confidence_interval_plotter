import { dexie_db_cip } from "$lib/cip/database/Cip_db_dexie";

export class RuntimeVariablesFunctions {

    static async getAllVariables(): Promise<Map<string, string>> {
        let ret = new Map<string, string>();
        let pref = await dexie_db_cip.runtimeVariables.toArray();
        for (let i = 0; i < pref.length; i++) {
            ret.set(pref[i].name, pref[i].value);
        }
        return ret
    }

    static async setVariable(key: string, value: string) {
        let pref = await dexie_db_cip.runtimeVariables.where("name").equals(key).toArray();
        if (pref.length == 0) {
            await dexie_db_cip.runtimeVariables.add({ name: key, value: value });
        } else {
            await dexie_db_cip.runtimeVariables.update(key, { value: value });
        }
    }

    static async getVariable(key: string): Promise<string | null> {
        let pref = await dexie_db_cip.runtimeVariables.get(key);
        if (pref == null) {
            return null
        } else {
            return pref.value
        }
    }
}