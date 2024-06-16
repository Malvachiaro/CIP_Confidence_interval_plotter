export class FieldSettings {
    id: String;
    description: string;
    label: string;
    used: boolean;
    visible: boolean;

    constructor(id: string, description:string, label: string, used: boolean, visible: boolean) {
        this.id = id;
        this.description = description;
        this.label = label;
        this.used = used;
        this.visible = visible;
    }

    public static constructFromObject(object: any): FieldSettings{
        return new FieldSettings(object.id, object.description, object.label, object.used, object.visible);
    }


}

export class FieldsSettings {

    name: FieldSettings = new FieldSettings("name", "Study (or ES, or Row)", "Study", true, true);
    effectSize: FieldSettings = new FieldSettings("effectSize", "Effect size", "ES", true, true);
    lowerLimit: FieldSettings = new FieldSettings("lowerLimit", "Lower limit", "LL", true, false);
    upperLimit: FieldSettings = new FieldSettings("upperLimit", "Upper limit", "UL", true, false);
    ci: FieldSettings = new FieldSettings("ci", "Confidence Interval (synthetic form)","CI", true, true);
    weight: FieldSettings = new FieldSettings("weight", "Weight", "W", true, true);
    variance: FieldSettings = new FieldSettings("variance", "Variance", "V", true, false);
    standardError: FieldSettings = new FieldSettings("standardError", "Standard Error",  "SE", true, false);
    pValue: FieldSettings = new FieldSettings("pValue", "p Value", "p", true, true);
    totalSS: FieldSettings = new FieldSettings("totalSS", "Total sample size", "Total SS", true, true);
    sampleSizeGroup1: FieldSettings = new FieldSettings("sampleSizeGroup1", "Group 1 sample size", "G1 SS", true, false);
    sampleSizeGroup2: FieldSettings = new FieldSettings("sampleSizeGroup2", "Group 2 sample size", "G2 SS", true, false);
    notAssignedSS: FieldSettings = new FieldSettings("notAssignedSS", "Not assigned sample size", "NA SS", true, false);
    ncf1: FieldSettings = new FieldSettings("ncf1", "Numerical custom field #1", "NCF1", false, true);
    ncf2: FieldSettings = new FieldSettings("ncf2", "Numerical custom field #2", "NCF2", false, true);
    ncf3: FieldSettings = new FieldSettings("ncf3", "Numerical custom field #3", "NCF3", false, true);
    ncf4: FieldSettings = new FieldSettings("ncf4", "Numerical custom field #4", "NCF4", false, true);
    ncf5: FieldSettings = new FieldSettings("ncf5", "Numerical custom field #5", "NCF5", false, true);
    scf1: FieldSettings = new FieldSettings("scf1", "Text custom field #1", "SCF1", false, true);
    scf2: FieldSettings = new FieldSettings("scf2", "Text custom field #2", "SCF2", false, true);
    scf3: FieldSettings = new FieldSettings("scf3", "Text custom field #3", "SCF3", false, true);
    scf4: FieldSettings = new FieldSettings("scf4", "Text custom field #4", "SCF4", false, true);
    scf5: FieldSettings = new FieldSettings("scf5", "Text custom field #5", "SCF5", false, true);

    getAllSettings(): FieldSettings[] {
        return [
            this.name, this.effectSize, this.lowerLimit, this.upperLimit, this.ci, this.weight, this.variance, this.standardError,
            this.pValue, this.totalSS, this.sampleSizeGroup1, this.sampleSizeGroup2, this.notAssignedSS,
            this.ncf1, this.ncf2, this.ncf3, this.ncf4, this.ncf5, this.scf1, this.scf2, this.scf3, this.scf4, this.scf5
        ]
    }



    public static constructFromObject(object: any): FieldsSettings {
        let ret:FieldsSettings = new FieldsSettings()
        ret.name = FieldSettings.constructFromObject(object.name)
        ret.effectSize = FieldSettings.constructFromObject(object.effectSize)
        ret.lowerLimit = FieldSettings.constructFromObject(object.lowerLimit)
        ret.upperLimit = FieldSettings.constructFromObject(object.upperLimit)
        ret.ci = FieldSettings.constructFromObject(object.ci)
        ret.weight = FieldSettings.constructFromObject(object.weight)
        ret.variance = FieldSettings.constructFromObject(object.variance)
        ret.standardError = FieldSettings.constructFromObject(object.standardError)
        ret.pValue = FieldSettings.constructFromObject(object.pValue)
        ret.totalSS = FieldSettings.constructFromObject(object.totalSS)
        ret.sampleSizeGroup1 = FieldSettings.constructFromObject(object.sampleSizeGroup1)
        ret.sampleSizeGroup2 = FieldSettings.constructFromObject(object.sampleSizeGroup2)
        ret.notAssignedSS = FieldSettings.constructFromObject(object.notAssignedSS)
        ret.ncf1 = FieldSettings.constructFromObject(object.ncf1)
        ret.ncf2 = FieldSettings.constructFromObject(object.ncf2)
        ret.ncf3 = FieldSettings.constructFromObject(object.ncf3)
        ret.ncf4 = FieldSettings.constructFromObject(object.ncf4)
        ret.ncf5 = FieldSettings.constructFromObject(object.ncf5)
        ret.scf1 = FieldSettings.constructFromObject(object.scf1)
        ret.scf2 = FieldSettings.constructFromObject(object.scf2)
        ret.scf3 = FieldSettings.constructFromObject(object.scf3)
        ret.scf4 = FieldSettings.constructFromObject(object.scf4)
        ret.scf5 = FieldSettings.constructFromObject(object.scf5)

        return ret
    }
}