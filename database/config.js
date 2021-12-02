const mongoose = require('mongoose');


const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database online');

    } catch (error) {   
        console.log(error);
        throw new Error('An error ocurred while trying to initialize db');
    }
    
}


module.exports = {
    dbConnection
}