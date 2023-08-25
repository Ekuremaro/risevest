import express from "express";
import { UserRepository } from "./repository/user.repository";
import { UserService } from "./service/user.service";
import { UserController } from "./controller/users.controller";
import { Pool } from "pg";

const pool = new Pool({
	host: "localhost",
	port: 5432,
	user: "maroekure",
	//password: 'your-password',
	database: "maroekure",
});

const userRepository = new UserRepository(pool);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const app = express();

app.route("/users")
	.get(userController.getUsers.bind(userController))
	.post(userController.createUser.bind(userController));
