import {Settings} from "../../Database/Model/Settings";

export class SETTINGS {

    //region [Region] Constructor
    readonly id: number;
    readonly code: string;

    public constructor(id:number, code:string) {
        this.id = id;
        this.code = code;
    }

    public async value():Promise<Settings | null> {
        return Settings.findByPk(this.id);
    }

    //endregion

    //region [Region] Setup

    public static setupDB() {
        new Settings({ID: this.SETUP.id, code: this.SETUP.code, value: false}).save();
    }

    //endregion

    //region [Region] Values

    public static readonly SETUP = new SETTINGS(1, "setup");

    //endregion
}
