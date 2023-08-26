import { Pool } from "pg";

export class CommentRepository {
  constructor(private pool: Pool) {}

  async createComment(content: string, user_id: number, post_id: number) {
    await this.pool.query("SELECT create_comment($1, $2, $3)", [
      content,
      user_id,
      post_id,
    ]);
  }

  async getComments(postId: number) {
    const result = await this.pool.query("SELECT * FROM get_comments($1)", [
      postId,
    ]);
    return result.rows;
  }

  async getTopUsersWithLatestComment() {
    const result = await this.pool.query(
      "SELECT * FROM get_top_users_with_latest_comment()"
    );
    return result.rows;
  }
}
