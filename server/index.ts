import express from "express";
import favicon from "serve-favicon"
import logger from "morgan";

import database from "./database";
import usersRouter from "./routes/api/users";
import injectUser from "./middleware/injectUser";


database();

const app = express();

app.use(logger("dev"));
app.use(injectUser());
app.use(express.json());

app.use(favicon("dist/favicon.ico"));
app.use(express.static("dist"));

app.use("/api/users", usersRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Express app running at http://localhost:" + port);
});
