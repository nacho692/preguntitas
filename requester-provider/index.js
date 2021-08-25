import express from 'express'
import { Server as socketIOServer } from 'socket.io';

const config = {
  port: 3000,
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const io = new socketIOServer(app.listen(
  config.port,
  () => console.log(`App listening at http://localhost:${config.port}`)
));

io.on("connect", socket => {
  socket.emit('bienvenido', 'holis desde el servidor')
  socket.on('message', data => {
    console.log(data)
  })
})

app.use(express.static(`${__dirname}/public`));

app.post('/number-request', (req, res) => {
  io.emit('number-requested')
  res.status(204).send()
})

app.post('/number-provision', (req, res) => {
  const { number } = req.body
  if (!number) {
    return res.status(422).send()
  }
  io.emit('number-provided', number)
  res.status(204).send()
})
