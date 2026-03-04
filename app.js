const express = require("express");
const app = express();
const port = 5200;

const cors = require("cors");
app.use(cors());

app.use(express.json());
require("dotenv").config();
// db connection
const dbConnection = require("./Db/DbConfig");

// routes
const userRoutes = require("./Routes/UserRoute");

const questionsRoutes = require("./Routes/QuestionRoute");
const AuthMiddleware = require("./Middleware/AuthMiddleware");

// use routes
app.use("/api/users", userRoutes);

app.use("/api/questions", AuthMiddleware, questionsRoutes);
async function start() {
  try {
    await dbConnection.execute("select 1");
    app.listen(port, () => {
      console.log("database connection established");
      console.log(`listening on ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

start();
