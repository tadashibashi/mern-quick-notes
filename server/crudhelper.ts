import dotenv from "dotenv";
import database from "./database";

dotenv.config();
database();

// Require Mongoose models here
import User from "./models/User";
// import Item from "./models/Item";

// Local vars to hold retrieved documents
// let user, item;
// let users, items;
