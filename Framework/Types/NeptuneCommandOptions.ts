import {PERMISSION} from "../Enum/PERMISSION";
import {CommandOptions} from "discord-akairo";

export type NeptuneCommandOptions = {
    permission?:PERMISSION|PERMISSION[]|string,
    usage?:string,
} & CommandOptions;
