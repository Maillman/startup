const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('startup');
const usersCollection = db.collection('users');
const discussionsCollection = db.collection('discussions');


(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
    console.log(`Connected to the database with ${url}`);
})().catch((ex) => {
    console.log(`Failed to connect to the database with ${url}.`, ex);
    process.exit(1);
});

function getUser(username) {
    return usersCollection.findOne({ username });
}

function getUserByToken(token) {
    return usersCollection.findOne({ token });
}

async function createUser(username, password) {
    // Hash the password before we insert it into the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: hashedPassword,
        token: uuid.v4()
    }
    await usersCollection.insertOne(user);

    return user;
}

async function createDiscussion(title, body, author) {
    const discussion = {
        title: title,
        body: body,
        author: author
    }
    await discussionsCollection.insertOne(discussion);

    return discussion;
}

async function getDiscussions() {
    return discussionsCollection.find().toArray();
}

async function getDiscussion(id) {
    return discussionsCollection.findOne({ _id: ObjectId.createFromHexString(id) });
}

async function addReply(id, reply, author) {
    const discussion = await discussionsCollection.findOne({ _id: ObjectId.createFromHexString(id) });
    if (discussion.replies === undefined) {
        discussion.replies = [];
    }
    const store_reply = {
        reply: reply,
        author: author
    }
    discussion.replies.push(store_reply);
    await discussionsCollection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: { replies: discussion.replies } });
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    createDiscussion,
    getDiscussions,
    getDiscussion,
    addReply
}