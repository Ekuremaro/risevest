import express from "express";
import { UserRepository } from "./repository/user.repository";
import { UserService } from "./service/user.service";
import { UserController } from "./controller/users.controller";
import { Pool } from "pg";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import bodyParser from "body-parser";
import { AuthService } from "./service/auth.service";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "maroekure",
});

const userRepository = new UserRepository(pool);
const userService = new UserService(userRepository);
const authService = new AuthService(userRepository);
const userController = new UserController(userService, authService);

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rise Vest API",
      version: "1.0.0",
      description: "An API For Rise Vest Test",
    },
  },
  apis: ["./routes/*.js"], // files containing annotations as above
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.route("/users").get(userController.getUsers.bind(userController));

app
  .route("/users/register")
  .post(userController.createUser.bind(userController));

app.route("/users/login").post(userController.login.bind(userController));

app
  .route("/users/:id")
  .get(userController.getUser.bind(userController))
  .put(userController.updateUser.bind(userController))
  .delete(userController.deleteUser.bind(userController));

app
  .route("/users/:id/posts")
  .get(userController.getUserPosts.bind(userController));

app
  .route("/users/:id/comments")
  .get(userController.getUserComments.bind(userController));

app.route("/users/:id/posts/:postId/comments");

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
