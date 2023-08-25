import { APILogger } from "../logger/api.logger";
import { Pool } from "pg";

export class UserRepository {
	private logger: APILogger;
	private userRespository: any;
	constructor(private pool: Pool) {}

	async findAll() {
		const result = await this.pool.query("SELECT * FROM get_all_users()");
		return result.rows;
	}

	async create(name: string, email: string) {
		await this.pool.query(
			"INSERT INTO Users (name, email) VALUES ($1, $2)",
			[name, email]
		);
	}
}
