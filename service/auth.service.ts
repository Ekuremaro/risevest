import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRepository } from "../repository/user.repository";

const SECRET_KEY = "YmFzZTY0IGVuY29kZWQgc3RyaW5n";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async validateToken(token: string) {
    return new Promise((resolve, reject) => {
      console.log("validating token");
      jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) reject(err);
        console.log(err);
        resolve(user);
        console.log(user);
      });
    });
  }

  async register(username: string, password: string, email: string) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await this.userRepository.create(username, hashedPassword, email);
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findUserByUsername(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY);
    return token;
  }
}
