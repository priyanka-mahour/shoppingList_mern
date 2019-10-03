const express = require('express');
const mongoose = require('mongoose');

// To deal with file path
const path = require('path'); 

// Bodyparser will allow us to take request and get data from the body
const bodyparse = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyparse.json());

// DB Config 
const db = require('./config/keys').mongoURI;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Connect to Mongo
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected......'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items)

// To connect to heroku
// SErve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    // __dirname: to get into current directory
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Create variable to port you wanna use
// and we may deploy it to heroku fo that so for heroku u wanna set it to  process.env.PORT [PORT  is an envireonmental variable]
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`));