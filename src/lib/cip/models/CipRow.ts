export class CipRow {
    id: number;
    name = "";
    isOverall = false;
    effectSize: number;
    lowerLimit: number;
    upperLimit: number;
    weight: number;
    variance: number | null = null;;
    standardError: number | null = null;;
    pValue: number | null = null;
    totalSS: number | null = null;;
    sampleSizeGroup1: number | null = null;;
    sampleSizeGroup2: number | null = null;;
    notAssignedSS: number | null = null;;
    ncf1: number | null = null;
    ncf2: number | null = null;
    ncf3: number | null = null;
    ncf4: number | null = null;
    ncf5: number | null = null;
    scf1: string | null = null;
    scf2: string | null = null;
    scf3: string | null = null;
    scf4: string | null = null;
    scf5: string | null = null;

    constructor(
        id: number,
        name: string,
        isOverall: boolean,
        effectSize: number,
        lowerLimit: number,
        upperLimit: number,
        weight: number,
        variance: number | null,
        standardError: number | null,
        pValue: number | null,
        totalSS: number | null,
        sampleSizeGroup1: number | null,
        sampleSizeGroup2: number | null,
        notAssignedSS: number | null,
        ncf1: number | null,
        ncf2: number | null,
        ncf3: number | null,
        ncf4: number | null,
        ncf5: number | null,
        scf1: string | null,
        scf2: string | null,
        scf3: string | null,
        scf4: string | null,
        scf5: string | null
    ) {
        (this.id = id),
            (this.name = name),
            (this.isOverall = isOverall),
            (this.effectSize = effectSize),
            (this.lowerLimit = lowerLimit),
            (this.upperLimit = upperLimit),
            (this.weight = weight),
            (this.variance = variance),
            (this.standardError = standardError),
            (this.pValue = pValue),
            (this.totalSS = totalSS),
            (this.sampleSizeGroup1 = sampleSizeGroup1),
            (this.sampleSizeGroup2 = sampleSizeGroup2),
            (this.notAssignedSS = notAssignedSS),
            (this.ncf1 = ncf1),
            (this.ncf2 = ncf2),
            (this.ncf3 = ncf3),
            (this.ncf4 = ncf4),
            (this.ncf5 = ncf5),
            (this.scf1 = scf1),
            (this.scf2 = scf2),
            (this.scf3 = scf3),
            (this.scf4 = scf4),
            (this.scf5 = scf5);
    }

    public static constructFromObject(object: any): CipRow {
        if(object==null){
            throw Error("No row found")
        }
        if(object["name"]==null){
            throw Error("No NAME found")
        }
        if(object["effectSize"]==null){
            throw Error("No effectSize found")
        }
        if(object["lowerLimit"]==null){
            throw Error("No Lower Limit found")
        }                
        if(object["upperLimit"]==null){
            throw Error("No Upper Limit found")
        }                
        if(object["weight"]==null){
            throw Error("No Weight found")
        }                
        return new CipRow(
            object["id"]!==null?object["id"]:-1,
            object["name"],
            object["isOverall"]!=null ?  (String(object["isOverall"] as string)).toUpperCase()==="TRUE":false,
            object["effectSize"],
            object["lowerLimit"],
            object["upperLimit"],
            object["weight"],
            object["variance"],
            object["standardError"],
            object["pValue"],
            object["totalSS"],
            object["sampleSizeGroup1"],
            object["sampleSizeGroup2"],
            object["notAssignedSS"],
            object["ncf1"],
            object["ncf2"],
            object["ncf3"],
            object["ncf4"],
            object["ncf5"],
            object["scf1"],
            object["scf2"],
            object["scf3"],
            object["scf4"],
            object["scf5"]
        );
    }

    toCSV() {
        let separator = "\t";
        let delimiter = ''
        return delimiter+this.name
            +delimiter+separator+delimiter+this.isOverall
            +delimiter+separator+delimiter+this.effectSize
            +delimiter+separator+delimiter+this.lowerLimit
            +delimiter+separator+delimiter+this.upperLimit
            +delimiter+separator+delimiter+this.weight
            +delimiter+separator+delimiter+this.variance
            +delimiter+separator+delimiter+this.standardError
            +delimiter+separator+delimiter+this.pValue
            +delimiter+separator+delimiter+this.totalSS
            +delimiter+separator+delimiter+this.sampleSizeGroup1
            +delimiter+separator+delimiter+this.sampleSizeGroup2
            +delimiter+separator+delimiter+this.notAssignedSS
            +delimiter+separator+delimiter+this.ncf1
            +delimiter+separator+delimiter+this.ncf2
            +delimiter+separator+delimiter+this.ncf3
            +delimiter+separator+delimiter+this.ncf4
            +delimiter+separator+delimiter+this.ncf5
            +delimiter+separator+delimiter+this.scf1
            +delimiter+separator+delimiter+this.scf2
            +delimiter+separator+delimiter+this.scf3
            +delimiter+separator+delimiter+this.scf4
            +delimiter+separator+delimiter+this.scf5
            +delimiter
    }
}