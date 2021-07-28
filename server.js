const express = require('express');
const app = express();
port = 8000;

require('./monsterBackend/server/config/mongoose.config');

app.use(express.json(), express.urlencoded({extended: true}));

require('./monsterBackend/server/routes/monsters.route')(app);

app.listen(port, ()=>console.log(`we running on port ${port}. Aaaaeeeeyyyy!!!`));

