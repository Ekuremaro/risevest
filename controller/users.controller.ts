import { UserService } from "../service/user.service";
import { Request, Response } from "express";

export class UserController {
	constructor(private userService: UserService) {}

	async getUsers(req: Request, res: Response) {
		const users = await this.userService.getUsers();
		res.json(users);
	}

	async createUser(req: Request, res: Response) {
		const { name, email } = req.body;
		await this.userService.createUser(name, email);
		res.status(201).send("User created");
	}
}
