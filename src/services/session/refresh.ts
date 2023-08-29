import { verify, sign } from "jsonwebtoken";
import { AppError } from "../../utils/AppError";

export class SessionRefreshService{
  
	async execute(refresh_token: string) {
		if (!refresh_token) {
			throw new AppError("Refresh token in not provided", 401);
		}

		const {sub} = verify(refresh_token, process.env.JWT_SECRET || "");

		const token = sign({}, process.env.JWT_SECRET || "", {
			subject: String(sub),
			expiresIn: "1d"
		});

		const refreshToken = sign({}, process.env.JWT_SECRET || "", {
			subject: String(sub),
			expiresIn: "7d"
		});

		return {token, refreshToken};
	}
}