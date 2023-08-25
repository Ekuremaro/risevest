import { UserRepository } from "../repository/user.repository";

export class UserService {
	constructor(private userRepository: UserRepository) {}

	async getUsers() {
		return await this.userRepository.findAll();
	}

	async createUser(name: string, email: string) {
		await this.userRepository.create(name, email);
	}
}
