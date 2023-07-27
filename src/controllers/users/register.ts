import { Request, Response } from "express";
import PrismaUserRepository from "../../repositories/prisma/prismaUserRepository";
import { UserRegisterService } from "../../services/user/register";

export async function register(request: Request, response: Response) {
	const {name, email, password} = request.body;

	try {
		const userRepository = new PrismaUserRepository();
		const registerUserService = new UserRegisterService(userRepository);
  
		await registerUserService.execute({name, email, password});
	} catch (err) {
		return response.status(409).send();
	}
	
	return response.status(201).send();
}