import { createConnection } from "typeorm";
import * as http from 'http';

import App from './app';

createConnection().then(connection =>{

    const server = http.createServer(App);

    server.listen(3000, () =>{
        console.log('Applicação está rodando na porta 300');
    });

}).catch(error =>{
    console.log('typeOrm dont conected: %s', error)
});