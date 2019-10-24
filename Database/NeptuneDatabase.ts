import {Sequelize} from "sequelize-typescript";
import {SETTINGS} from "../Framework/Enum/SETTINGS";

export class NeptuneDatabase {
    private readonly database:Sequelize;

    public constructor(authUrl: string) {
        this.database = new Sequelize(authUrl,
            {
                logging:false,
                models: [__dirname + "/Model"]
            });
    }

    get db():Sequelize {
        return this.database;
    }

    public start():void {
        this.database.sync({
            force: true
        });
        this.database.authenticate()
            .then(() => { console.log(`Database has been initialized.`); })
            .catch(err => { console.log(`Unable to connect to the database: ${err}`); });
        this.isSetup().then(res => {
            if (!res) {
                SETTINGS.setupDB();

            }
        });
    }

    public async isSetup():Promise<boolean> {
        return (await SETTINGS.SETUP.value()) != null;
    }
}
