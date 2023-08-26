import { APILogger } from "../logger/api.logger";
import { Pool } from "pg";

export class UserRepository {
  //private logger: APILogger;
  private userRespository: any;
  constructor(private pool: Pool) {}

  async findAll() {
    const result = await this.pool.query("SELECT * FROM get_all_users()");
    return result.rows;
  }

  async create(username: string, password: string, email: string) {
    await this.pool.query(
      "INSERT INTO users (username, password, email, created_on) VALUES ($1, $2, $3, NOW())",
      [username, password, email]
    );
  }

  async findUserById(id: string) {
    const result = await this.pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  }

  async updateUser(
    id: string,
    username: string,
    password: string,
    email: string
  ) {
    await this.pool.query(
      "UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4",
      [username, password, email, id]
    );
  }

  async deleteUser(id: string) {
    await this.pool.query("DELETE FROM users WHERE id = $1", [id]);
  }

  async findUserPosts(id: string) {
    const result = await this.pool.query(
      "SELECT * FROM posts WHERE user_id = $1",
      [id]
    );
    return result.rows;
  }

  async findUserComments(id: string) {
    const result = await this.pool.query(
      "SELECT * FROM comments WHERE user_id = $1",
      [id]
    );
    return result.rows;
  }

  async findUserByUsername(username: string) {
    const result = await this.pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    return result.rows[0];
  }
}
