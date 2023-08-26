import { Pool } from "pg";

export class PostRepository {
  constructor(private pool: Pool) {}

  async createPost(title: string, content: string, user_id: number) {
    await this.pool.query("SELECT create_post($1, $2, $3)", [
      title,
      content,
      user_id,
    ]);
  }
}
