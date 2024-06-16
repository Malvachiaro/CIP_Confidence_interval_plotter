import { CipRow } from "./CipRow";

export class CipBlock {
    id: number;
    name: string;
    rows: CipRow[] = [];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }


    public static constructFromObject(object: any): CipBlock {
        let ret:CipBlock = new CipBlock(
            object["id"],
            object["name"]
        );
        for(let i = 0; i < object["rows"].length; i++) {
            ret.rows.push(CipRow.constructFromObject(object["rows"][i]));
        }
        return ret
    }

    public toCSV() {
        let separator = "\t";
        let delimiter = ''
        let ret = ""
            +delimiter+"name"
            +delimiter+separator+delimiter+"isOverall"
            +delimiter+separator+delimiter+"effectSize"
            +delimiter+separator+delimiter+"lowerLimit"
            +delimiter+separator+delimiter+"upperLimit"
            +delimiter+separator+delimiter+"weight"
            +delimiter+separator+delimiter+"variance"
            +delimiter+separator+delimiter+"standardError"
            +delimiter+separator+delimiter+"pValue"
            +delimiter+separator+delimiter+"totalSS"
            +delimiter+separator+delimiter+"sampleSizeGroup1"
            +delimiter+separator+delimiter+"sampleSizeGroup2"
            +delimiter+separator+delimiter+"notAssignedSS"
            +delimiter+separator+delimiter+"ncf1"
            +delimiter+separator+delimiter+"ncf2"
            +delimiter+separator+delimiter+"ncf3"
            +delimiter+separator+delimiter+"ncf4"
            +delimiter+separator+delimiter+"ncf5"
            +delimiter+separator+delimiter+"scf1"
            +delimiter+separator+delimiter+"scf2"
            +delimiter+separator+delimiter+"scf3"
            +delimiter+separator+delimiter+"scf4"
            +delimiter+separator+delimiter+"scf5"
            +delimiter+"\n"
        for(let i = 0; i < this.rows.length; i++) {
            ret += this.rows[i].toCSV()+"\n"
        }
        return ret
    }

}
