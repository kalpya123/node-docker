const express= require("express");
const mongoose=require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");
const postRouter=require("./routes/post");
const userRouter=require("./routes/user");
const app= express();
const redis = require('redis')
const session = require('express-session')

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
   host:REDIS_URL,
   port:REDIS_PORT

})






const mongoURL=`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
console.log(mongoURL);
const connectWithRetry=()=>{
    mongoose.connect(mongoURL)
    .then(()=> console.log("Succesfully connected to db")).catch((e) => 
    {
        console.log(e)
        setTimeout(connectWithRetry,5000)
    }
    );
}

connectWithRetry();
app.enable("trust proxy");
app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET,
      cookie:{
        secure:false,
        resave: false,
        saveUninitialized: false,
        httpOnly:true,
        maxAge:60000
    }
    
    })
  )
  
app.use(express.json());
app.get("/api/",(req,res)=>{
    res.send("<h2> Hi there hello world  !</h2>");
})
app.use("/api/post",postRouter);
app.use("/api/user",userRouter);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("listing on "+port)
})

//docker build -t node-app-image .
//docker rm node-app -f
//docker run -v  $(pwd):/app:ro  -v /app/node_modules --env PORT=3000  -p 8000:3000  -d  --name node-app  node-app-image
//docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
//volumes:
// mongo-db: