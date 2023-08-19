import { UserRepository } from "../../repositories/userRepository";
import bcrypt from "bcryptjs";
import { AppError } from "../../utils/AppError";

interface UserRegisterServiceRequest {
  name: string,
  password: string,
  email: string
}

export class UserRegisterService {
	constructor(private userRepository: UserRepository){}
  
	async execute({name, password, email}: UserRegisterServiceRequest) {
		const userAlreadyExists = await this.userRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new AppError("User already exists", 409);
		}

		password = await bcrypt.hash(password, 6);

		await this.userRepository.createUser({name, email, password});
	}
}