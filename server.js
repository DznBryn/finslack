const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');

const connect_db = require('./config/db');

const PORT = process.env.PORT || 3001;


connect_db(server);

app.use(express.json({ extended: false }));
app.use(cors());

app.get('/', (req, res) => res.send('Server running'));
app.use('/api/users', require('./routers/api/users'));
app.use('/api/auth', require('./routers/api/auth'));
app.use('/api/channels', require('./routers/api/channels'));

server.listen(PORT, () => console.log(`> Server working on localhost:${PORT}`));


