import { PostRepository } from "../repository/post.respository";
import { CommentRepository } from "../repository/comment.repostiory";

export class PostService {
  constructor(
    private postRepository: PostRepository,
    private commentRepository: CommentRepository
  ) {}

  async createPost(title: string, content: string, user_id: number) {
    await this.postRepository.createPost(title, content, user_id);
  }

  async createComment(content: string, user_id: number, post_id: number) {
    await this.commentRepository.createComment(content, user_id, post_id);
  }

  async getAllComments(postId: number) {
    return await this.commentRepository.getComments(postId);
  }
  async getTopUsersWithLatestComment() {
    return await this.commentRepository.getTopUsersWithLatestComment();
  }
}
