import express from 'express'
import { Server as socketsIOServer } from 'socket.io';

const config = {
  port: 3000,
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const io = new socketsIOServer(app.listen(
  config.port,
  () => console.log(`App listening at http://localhost:${config.port}`)
));

// Un middleware para que todas las requests tengan acceso al servidor de web
// sockets
app.use((req,res,next) => {
    req.io = io;
    next();
});

const exampleRouter = express.Router();
exampleRouter.use(express.static(`${__dirname}/public`));
app.use(exampleRouter);
