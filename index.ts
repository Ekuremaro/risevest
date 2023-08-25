// import * as http from "http";
// import App from "./app";
// import { APILogger } from "./logger/api.logger";

// const port = process.env.PORT || 3070;

// App.set("port", port);
// const server = http.createServer(App);
// server.listen(port);

// const logger = new APILogger();

// server.on("listening", function(): void {
//     const addr = server.address();
//     const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
//     logger.info(`Listening on ${bind}`, null);
//  });

// module.exports = App;

import express from "express";
import { Request, Response } from "express";
import { Pool } from "pg";

// Set up the Express app
const app = express();
app.use(express.json());

// Set up the PostgreSQL database connection
const pool = new Pool({
	host: "localhost",
	port: 5432,
	user: "maroekure",
	//password: "your-password",
	database: "maroekure",
});

// Define the /users endpoint for creating and retrieving users
app.route("/users")
	.get(async (req: Request, res: Response) => {
		// Retrieve all users from the database
		const result = await pool.query("SELECT * FROM Users");
		res.json(result.rows);
	})
	.post(async (req: Request, res: Response) => {
		// Create a new user in the database
		const { name, email } = req.body;
		await pool.query("INSERT INTO Users (name, email) VALUES ($1, $2)", [
			name,
			email,
		]);
		res.status(201).send("User created");
	});

// Define the /users/:id/posts endpoint for creating a post for a user and retrieving all posts of a user
app.route("/users/:id/posts")
	.get(async (req: Request, res: Response) => {
		// Retrieve all posts of a user from the database
		const userId = req.params.id;
		const result = await pool.query(
			"SELECT * FROM Posts WHERE userId = $1",
			[userId]
		);
		res.json(result.rows);
	})
	.post(async (req: Request, res: Response) => {
		// Create a new post for a user in the database
		const userId = req.params.id;
		const { title, content } = req.body;
		await pool.query(
			"INSERT INTO Posts (title, content, userId) VALUES ($1, $2, $3)",
			[title, content, userId]
		);
		res.status(201).send("Post created");
	});

// Define the /posts/:postId/comments endpoint for adding a comment to a post
app.route("/posts/:postId/comments").post(
	async (req: Request, res: Response) => {
		// Add a comment to a post in the database
		const postId = req.params.postId;
		const { content } = req.body;
		await pool.query(
			"INSERT INTO Comments (content, postId) VALUES ($1, $2)",
			[content, postId]
		);
		res.status(201).send("Comment added");
	}
);

// Define the /performance endpoint for fetching the top 3 users with the most posts and their latest comment
app.get("/performance", async (req: Request, res: Response) => {
	// Fetch the top 3 users with the most posts and their latest comment from the database
	const result = await pool.query(`
        SELECT u.id, u.name, p.title AS latest_post_title, c.content AS latest_comment_content
        FROM Users u
            JOIN (
                SELECT userId, MAX(id) AS latest_post_id
                FROM Posts
                GROUP BY userId
            ) lp ON u.id = lp.userId
            JOIN Posts p ON lp.latest_post_id = p.id
            LEFT JOIN (
                SELECT postId, MAX(id) AS latest_comment_id
                FROM Comments
                GROUP BY postId
            ) lc ON p.id = lc.postId
            LEFT JOIN Comments c ON lc.latest_comment_id = c.id
        ORDER BY (SELECT COUNT(*) FROM Posts WHERE userId = u.id) DESC
        LIMIT 3;
    `);
	res.json(result.rows);
});

// Start the server
app.listen(3000, () => {
	console.log("Server started on port 3000");
});
