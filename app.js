require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5200;

const cors = require("cors");
app.use(cors());

app.use(express.json());

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
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });

    try {
      await dbConnection.execute("select 1");
      console.log("database connection established");
    } catch (error) {
      console.log("database connection failed");
      console.log(error.message);
    }
  } catch (error) {
    console.log("server failed to start");
    console.log(error.message);
    process.exit(1);
  }
}

start();
