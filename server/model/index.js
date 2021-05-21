const mongoose = require('mongoose');
try {
    (async ()=>{
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.khqok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        
    })();
}catch(err){
    console.log(err);
}


module.exports = mongoose;

//mongodb+srv://admin:admin@cluster0.khqok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority