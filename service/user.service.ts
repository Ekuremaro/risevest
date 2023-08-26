import { hashPassword } from "../Utilities/Utilities";
import { UserRepository } from "../repository/user.repository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers() {
    return await this.userRepository.findAll();
  }

  async createUser(username: string, password: string, email: string) {
    const hashPwd: string = await hashPassword(password);
    await this.userRepository.create(username, hashPwd, email);
  }
  async getUser(id: string) {
    return await this.userRepository.findUserById(id);
  }

  async updateUser(
    id: string,
    username: string,
    password: string,
    email: string
  ) {
    await this.userRepository.updateUser(id, username, password, email);
  }
  async deleteUser(id: string) {
    await this.userRepository.deleteUser(id);
  }

  async getUserPosts(id: string) {
    return await this.userRepository.findUserPosts(id);
  }

  async getUserComments(id: string) {
    return await this.userRepository.findUserComments(id);
  }
}
