import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { verify } from "jsonwebtoken";

export function userAuthenticated(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError("Token is not provided", 401);
	}

	const [, token] = authHeader.split(" ");

	try {
		const {sub: user_id} = verify(token, process.env.JWT_SECRET || "");

		console.log(token);

		request.user = {
			id: Number(user_id)
		};

		return next();
	} catch {
		throw new AppError("token.invalid", 401);
	}
}