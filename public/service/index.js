const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = {};

app.use(express.json());

var apiRouter = express.Router();
app.use('/api', apiRouter);

//Add the Express middleware to serve static files from the the public directory.
app.use(express.static('public'));

//CreateAuth a new user
apiRouter.post('/auth', async (req, res) => {
    const user = users[req.body.username];
    if(user){
        res.status(409).send({error: 'User already exists'});
    } else {
        const user = {username: req.body.username, password: req.body.password, token: uuid.v4()};
        users[user.username] = user;
        console.log(users);
        res.send({token: user.token})
    }
});

//GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.username];
    if(user && user.password === req.body.password){
        user.token = uuid.v4();
        res.send({token: user.token});
    } else {
        res.status(401).send({error: 'Invalid username or password'});
    }
});

//DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
        delete users.token;
    }
    res.status(204).send();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});