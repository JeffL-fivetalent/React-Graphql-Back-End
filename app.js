const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

// allow cross origin requests (cors)
app.use(cors());

// connect to mongo atlas db
mongoose.connect(process.env.MONGO_URI,  { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to db');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(3001, () => {console.log('now listening on port 3001')});
