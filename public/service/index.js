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

//Generate 10 random quotes
apiRouter.get('/quote', async (_req, res) => {
    console.log("Getting quotes");
    getJSONQuotes().then((quotes) => {
        res.send(quotes);
    })
    .catch((error) => {
        console.log(error);
        res.status(503).send({error: 'Failed to generate quote'});
    });
});
async function getJSONQuotes() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = 
    `
    Pick 10 random relevant movies, tv shows, and video games. Generate a quote from each of them. The title should be included.
    Also include any related keywords associated with the quote (such as who said it). Finally, give a brief one-sentence context behind the quote.
    It should be formatted as such in JSON:
    {
        "Quotes": [
            {
                "Title": "TITLEHERE",
                "Keywords": ["WORD1","WORD2",...]",
                "Quote": "QUOTEHERE",
                "Context": "CONTEXTHERE"
            },
            ...
        ]
    }
    `;
    model.generationConfig.temperature = 2.0;
    const result = await model.generateContent(prompt);
    let JSONtext = result.response.text();
    JSONtext = JSONtext.replaceAll("`", "");
    JSONtext = JSONtext.replace("json", "");
    console.log(JSONtext);
    console.log("Succeeded!");
    return JSONtext;
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});