import express from "express";
import db from "./utils/dataBase.js";
import initModelTask from "./models/taskCRUD/initModelTask.js";
import cors from "cors";
import categoriesRoutes from "./components/categoriesRoutes/categories.routes.js";
import tasksRoutes from "./components/tasksRoutes/tasks.routes.js";
import usersRoutes from "./components/usersRoutes/users.routes.js";

initModelTask();

const PORT = process.env.PORT ?? 8000;
const app = express()

app.use(express.json(), cors(), categoriesRoutes, tasksRoutes, usersRoutes);

db.authenticate()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error(err));

db.sync()
    .then(() => console.log("Synchronized Database"))
    .catch((err) => console.error(err));

app.get("/", (req, res) => res.send("OK"));

app.listen(PORT, () =>
    console.log(`Server active and listening to port ${PORT}`)
);
