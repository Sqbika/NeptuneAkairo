import {LoadConfig} from "./Framework/Types/NeptuneClientOptions";
import {NeptuneClient} from "./Framework/NeptuneClient";

const client = new NeptuneClient(LoadConfig("./config.json"));

client.start();

process.on('unhandledRejection', error => {
    console.log(error);
});
