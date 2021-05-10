const http = require('http')
const express = require('express')
const socket = require('socket.io')
const ejs = require('ejs')

const app = express()
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(express.static('views'))

const server = http.createServer(app)
const io = socket(server)

const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.render('index'))

io.on('connection', client => {

    client.broadcast.emit('user_join')

    client.on('send_message', data => {

        client.broadcast.emit('new_message', data)
    })
})

server.listen(port, () => console.log(`Listening on ${port}`))