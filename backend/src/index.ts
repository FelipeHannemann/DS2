import {createConnection} from 'typeorm';
import * as http from 'http';
import * as socketIO from 'socket.io';

import app from './app';

createConnection().then(Connection =>{
    const server = http.createServer(app.express);
    const io = socketIO(server);

    app.startRouters(io);
    
    server.listen(3000, ()=>{
        console.log('On port: 3000');
    })
}).catch(error =>{
    console.log('TypeORM dont connected: %s', error );
}
   
);
