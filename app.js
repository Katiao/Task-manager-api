require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware

//since we'll be sending json data from the app, to access data in routes, need middleware
//build into express
//need this to get data in req.body.
app.use(express.json());
//need this middleware to serve static files where app is sitting
//not needed in this project
//app.use(express.static("./public"));

//routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

//connect to DB first before you start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
