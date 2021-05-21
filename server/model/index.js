require('dotenv').config()
const mongoose = require('mongoose');
try {
    (async ()=>{
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        
    })();
}catch(err){
    console.log(err);
}


module.exports = mongoose;

//mongodb+srv://admin:admin@cluster0.khqok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority