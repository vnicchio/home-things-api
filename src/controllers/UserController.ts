import { Request, Response } from "express";
import PrismaUserRepository from "../repositories/prisma/prismaUserRepository";
import { UserRegisterService } from "../services/user/register";
import { AppError } from "../utils/AppError";

export class UserController {
	async register(request: Request, response: Response) {
		const {name, email, password} = request.body;
  
		try {
			const userRepository = new PrismaUserRepository();
			const registerUserService = new UserRegisterService(userRepository);
    
			await registerUserService.execute({name, email, password});
		} catch (err) {
			if (err instanceof AppError) {
				return response.status(err.statusCode).send({message: err.message});
			}

			return response.status(500).send({message: "Internal Server Error"});
		}
    
		return response.status(201).send();
	}
}