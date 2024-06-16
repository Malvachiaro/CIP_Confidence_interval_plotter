export class ProjectSettings {
    nullValue = 0;

    public static constructFromObject(object: any): ProjectSettings {
        let ret: ProjectSettings = new ProjectSettings();
        ret.nullValue = object.nullValue;
        return ret;
    }
}
