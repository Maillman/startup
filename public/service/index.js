const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
require('dotenv').config();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Store the challenge in memory
let challengeid = 1;
let stored_challenge = {};
let stored_discussion_challenge = {};

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

//Add the Express middleware to serve static files from the the public directory.
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use('/api', apiRouter);


// setAuthCookie in the HTTP response
function setAuthCookie(res, token) {
    res.cookie(authCookieName, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });
}


//CreateAuth a new user
apiRouter.post('/auth', async (req, res) => {
    if(await DB.getUser(req.body.username)) {
        res.status(409).send({error: 'User already exists'});
    } else {
        const user = await DB.createUser(req.body.username, req.body.password);
        console.log(user);

        // Set the cookie
        setAuthCookie(res, user.token);

        res.send({id: user._id})
    }
});

//GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.username);
    if(user && await bcrypt.compare(req.body.password, user.password)){
        setAuthCookie(res, user.token);
        res.send({id: user._id});
    } else {
        res.status(401).send({error: 'Invalid username or password'});
    }
});

//DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).send();
});

//Get all discussions
apiRouter.get('/discussion', async (_req, res) => {
    const discussions = await DB.getDiscussions();
    res.send(discussions);
});

//Get a specific discussion
apiRouter.get('/discussion/:id', async (req, res) => {
    console.log(req.params.id);
    const discussion = await DB.getDiscussion(req.params.id);
    if(discussion) {
        res.send(discussion);
    } else {
        res.status(404).send({error: 'Discussion not found'});
    }
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

//Get the challenge used for discussion
apiRouter.get('/challenge/discussion', async (_req, res) => {
    console.log(stored_discussion_challenge);
    res.send(stored_discussion_challenge);
});

//Update the challenge used for discussion
apiRouter.put('/challenge/discussion', async (req, res) => {
    stored_discussion_challenge.id = challengeid++;
    stored_discussion_challenge.title = req.body.title;
    stored_discussion_challenge.encryptedtext = req.body.encryptedtext;
    stored_discussion_challenge.hints = req.body.hints;
    console.log(stored_discussion_challenge);
    res.send(stored_discussion_challenge);
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



// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    const token = req.cookies[authCookieName];
    console.log(token);
    const user = await DB.getUserByToken(token);
    console.log(user);
    if(user) {
        next();
    } else {
        res.status(401).send({error: 'Invalid token'});
    }
});

//Store a new discussion
secureApiRouter.post('/discussion', async (req, res) => {
    const token = req.cookies[authCookieName];
    const user = await DB.getUserByToken(token);
    const discussion = await DB.createDiscussion(req.body.title, req.body.body, user.username);
    console.log(discussion);
    res.send({id: discussion._id});
});

//Store a reply to a discussion
secureApiRouter.post('/discussion/:id/reply', async (req, res) => {
    const token = req.cookies[authCookieName];
    const user = await DB.getUserByToken(token);
    const discussion = await DB.getDiscussion(req.params.id);
    if(discussion) {
        await DB.addReply(req.params.id, req.body.reply, user.username);
        res.status(204).send();
    } else {
        res.status(404).send({error: 'Discussion not found'});
    }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);