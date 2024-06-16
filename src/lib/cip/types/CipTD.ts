
export type CipFieldNameType  = 
    "name" |
    "isOverall" |
    "effectSize" | 
    "lowerLimit" |
    "upperLimit" |
    "ci" |
    "weight" |
    "variance" |
    "standardError" |
    "pValue" |
    "totalSS" |
    "sampleSizeGroup1" |
    "sampleSizeGroup2" |
    "notAssignedSS" |
    "ncf1" |
    "ncf2" |
    "ncf3" |
    "ncf4" |
    "ncf5" |
    "scf1" |
    "scf2" |
    "scf3" |
    "scf4" |
    "scf5" ;



export class CipTD {
    static FIELDS_NAMES = {
        name: "name",
        isOverall: "isOverall",
        effectSize: "effectSize",
        lowerLimit: "lowerLimit",
        upperLimit: "upperLimit",
        ci: "ci",
        weight: "weight",
        variance: "variance",
        standardError: "standardError",
        pValue: "pValue",
        totalSS: "totalSS",
        sampleSizeGroup1: "sampleSizeGroup1",
        sampleSizeGroup2: "sampleSizeGroup2",
        notAssignedSS: "notAssignedSS",
        ncf1: "ncf1",
        ncf2: "ncf2",
        ncf3: "ncf3",
        ncf4: "ncf4",
        ncf5: "ncf5",
        scf1: "scf1",
        scf2: "scf2",
        scf3: "scf3",
        scf4: "scf4",
        scf5: "scf5",
    }

    static MANDATORY_FIELDS_NAMES_LIST: CipFieldNameType[] = [
        "name",
        "isOverall",
        "effectSize",
        "lowerLimit",
        "upperLimit",
        "weight",
    ]
    static CALCULATED_FIELDS_NAMES_LIST: CipFieldNameType[] = [
        "ci",
    ]
    static OPTIONAL_FIELDS_NAMES_LIST: CipFieldNameType[] = [
        "variance",
        "standardError",
        "pValue",
        "totalSS",
        "sampleSizeGroup1",
        "sampleSizeGroup2",
        "notAssignedSS",
    ]

    static CUSTOM_FIELDS_NAMES_LIST: CipFieldNameType[] = [
        "ncf1",
        "ncf2",
        "ncf3",
        "ncf4",
        "ncf5",
        "scf1",
        "scf2",
        "scf3",
        "scf4",
        "scf5",
    ]

    static FIELDS_NAMES_LIST: CipFieldNameType[] = CipTD.MANDATORY_FIELDS_NAMES_LIST.concat(CipTD.CALCULATED_FIELDS_NAMES_LIST).concat(CipTD.OPTIONAL_FIELDS_NAMES_LIST).concat(CipTD.CUSTOM_FIELDS_NAMES_LIST)

    static FIELDS_NAMES_LIST_WITHOUT_CI: CipFieldNameType[] = CipTD.MANDATORY_FIELDS_NAMES_LIST.concat(CipTD.OPTIONAL_FIELDS_NAMES_LIST).concat(CipTD.CUSTOM_FIELDS_NAMES_LIST)

    static FIELD_NAMES_LIST_FOR_FIELD_SETTINGS: CipFieldNameType[] = CipTD.FIELDS_NAMES_LIST.filter(item => item !== CipTD.FIELDS_NAMES.isOverall)
}
