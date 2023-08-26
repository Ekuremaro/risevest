import { PostService } from "../service/post.service";
import { Request, Response } from "express";

export class PostController {
  constructor(private postService: PostService) {}

  async createPost(req: Request, res: Response) {
    const id = req.params.id;
    const parsedId = parseInt(id, 10);

    const { title, content } = req.body;
    await this.postService.createPost(title, content, parsedId);
    res.status(201).send("Post created");
  }

  async createComment(req: Request, res: Response) {
    const { content } = req.body;
    const postId = parseInt(req.params.postId);
    const userId = parseInt(req.user.id);

    await this.postService.createComment(content, userId, postId);
    res.status(201).send("comment created");
  }

  async getAllComments(req: Request, res: Response) {
    const postId = parseInt(req.params.postId);
    const comments = await this.postService.getAllComments(postId);
    res.json(comments);
  }

  async getTopUsersWithLatestComment(req: Request, res: Response) {
    const userComments = await this.postService.getTopUsersWithLatestComment();
    res.json(userComments);
  }
}
