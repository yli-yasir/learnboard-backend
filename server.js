require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const {handleMongooseError} = require('./middleware/errors')
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(()=>{console.log('connected to mongo!')})
.catch(()=>{console.error('mongo connection error!')});

app.use(cookieParser());
app.use(express.json());

app.use('/posts',require('./routes/posts'));
app.use('/reports',require('./routes/reports'));
app.use('/users',require('./routes/users'));
app.get('/',(req,res)=>res.send('root'));

app.use(handleMongooseError);


app.listen(process.env.PORT,()=> console.log(`listening @ ${process.env.PORT}`));
