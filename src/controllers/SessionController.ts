import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import PrismaUserRepository from "../repositories/prisma/prismaUserRepository";
import { SessionCreateService } from "../services/session/create";
import { JsonWebTokenError } from "jsonwebtoken";
import { SessionRefreshService } from "../services/session/refresh";

export class SessionController {
	async create(request: Request, response: Response) {
		const {email, password} = request.body;

		try {
			const userRepository = new PrismaUserRepository();
			const sessionCreateService = new SessionCreateService(userRepository);

			const session = await sessionCreateService.create({email, password});

			return response.status(200).send(session);
		} catch (err) {
			if (err instanceof AppError) {
				return response.status(err.statusCode).send({message: err.message});
			}

			return response.status(500).send({message: "Internal Server Error"});
		}
	}

	async refresh(request: Request, response: Response) {
		const {refresh_token} = request.body;

		try {
			const sessionRefreshService = new SessionRefreshService();

			const {token, refreshToken} = await sessionRefreshService.execute(refresh_token);

			return response.status(200).send({token, refreshToken});
		} catch (err) {
			if (err instanceof AppError) {
				return response.status(err.statusCode).send({message: err.message});
			} else if (err instanceof JsonWebTokenError) {
				return response.status(401).send({message: "Invalid token"});
			}

			console.log(err);

			return response.status(500).send({message: "Internal Server Error"});
		}
	}
}