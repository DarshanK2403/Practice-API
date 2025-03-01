require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
});

const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err);
});
db.once('open', () => {
    console.log('Database connection established');
});

const UserRoute = require('./src/routes/UserRoute');
app.use(UserRoute);

const RoleRoute = require('./src/routes/RoleRoute');
app.use(RoleRoute);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});