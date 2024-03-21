const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect(process.env.MONGODB_URI,{
        dbName: process.env.DB_NAME,
        // user: "admin",
        // pass: "admin",
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
    }).then(() => {
  console.log("Connected to database");
}).catch(error=>console.log(error.message));

mongoose.connection.on('connected',()=>{
  console.log('Mongoose connected to db');
})

mongoose.connection.on('error',(err)=>{
  console.log(err.message);
})

mongoose.connection.on('disconnected',()=>{
  console.log('Mongoose connection is disconnected');
})

process.on('SIGINT',async()=>{
  await mongoose.connection.close(()=>{
    console.log('Mongoose default connection is disconnected due to application termination');
    process.exit(0);
  });
})
}