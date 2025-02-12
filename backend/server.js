const express=require('express');
const connectDB=require('./config/db'); //Database
const path = require('path');

//init app
const app=express();
app.use(express.json());//parsing

//allow requests from any origin
var cors = require('cors');
app.use(cors());

//configure and connect database
connectDB();

//connect all routes
app.use('/',require('./routes'));


// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('../client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}


//listen
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));