/**
 * Upper case as it works like an ENUM, but I wanted the Java enum constructor / function avaliability so yay I guess? (Don't yay if you don't use arch based distro please)
 */
import {Permission} from "../../Database/Model/Permission";

export class PERMISSION {
    public code:string;

    public constructor(code:string) {
        this.code = code;
    }

    public async db():Promise<Permission|null> {
        return Permission.findByCode(this.code)
    }

    public toString():string {
        return this.code;
    }

    public static readonly RELOAD = new PERMISSION("reload");
    public static readonly REINIT = new PERMISSION("reinit");
    public static readonly ADDARG = new PERMISSION("addarg");
    public static readonly NOTIFY = new PERMISSION("notify");
    public static readonly ADDWHATSNEWREGEX = new PERMISSION("addwhatsnewregex");
}
