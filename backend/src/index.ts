import {createConnection} from 'typeorm';
import * as http from 'http';

import app from './app';

createConnection().then(Connection =>{
    const server = http.createServer(app);
    server.listen(3000, ()=>{
        console.log('On port: 3000');
    })
}).catch(error =>{
    console.log('TypeORM dont connected: %s', error );
}
   
);
