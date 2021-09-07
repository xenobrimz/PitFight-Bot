const express = require('express');
const app = express();
port = 8000;

require('./server/config/mongoose.config');

app.use(express.json(), express.urlencoded({extended: true}));

require('./server/routes/monsters.route')(app);
require('./server/routes/dens.route')(app);
require('./server/routes/users.route')(app);
require('./server/routes/names.route')(app);

app.listen(port, ()=>console.log(`we running on port ${port}. Aaaaeeeeyyyy!!!`));

