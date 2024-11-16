const express = require('express');
const uuid = require('uuid');
const app = express();
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = {};
let stored_challenge = {};

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
        console.log("Deleting token for user: ", user.username);
        delete user.token;
    }
    res.status(204).send();
});

//Get the challenge
apiRouter.get('/challenge', async (_req, res) => {
    console.log(stored_challenge);
    res.send(stored_challenge);
});

//Update the challenge
apiRouter.put('/challenge', async (req, res) => {
    stored_challenge.time = req.body.time;
    stored_challenge.challenge = req.body.challenge;
    console.log(stored_challenge);
    res.status(204).send();
});

//Generate a quote
apiRouter.get('/quote', async (_req, res) => {
    getJSONQuote().then((quote) => {
        res.send(quote);
    })
    .catch((error) => {
        console.log(error);
    });
});
async function getJSONQuote() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = 
    `
    Generate a quote from a random movie / tv show in pop fiction. The title should be included.
    Also include any related keywords associated with the quote (such as who said it). Finally, give a brief one-sentence context behind the quote.
    It should be formatted as such in JSON:
    {
        "Title": "TITLEHERE",
        "Keywords": ["WORD1","WORD2",...]",
        "Quote": "QUOTEHERE",
        "Context": "CONTEXTHERE"
    }
    `;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});