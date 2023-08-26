import { UserService } from "../service/user.service";
import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  async getUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    res.json(users);
  }

  async createUser(req: Request, res: Response) {
    const { username, password, email } = req.body;
    await this.authService.register(username, password, email);
    res.status(201).send("User created");
  }
  async getUser(req: Request, res: Response) {
    const user = await this.userService.getUser(req.params.id);
    res.json(user);
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const token = await this.authService.login(username, password);
      res.json({ token });
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser(req: Request, res: Response) {
    const { username, password, email } = req.body;
    await this.userService.updateUser(req.params.id, username, password, email);
    res.send("User updated");
  }

  async deleteUser(req: Request, res: Response) {
    await this.userService.deleteUser(req.params.id);
    res.send("User deleted");
  }

  async getUserPosts(req: Request, res: Response) {
    const posts = await this.userService.getUserPosts(req.params.id);
    res.json(posts);
  }

  async getUserComments(req: Request, res: Response) {
    const comments = await this.userService.getUserComments(req.params.id);
    res.json(comments);
  }
}
