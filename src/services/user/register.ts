import { UserRepository } from "../../repositories/userRepository";
import bcrypt from "bcryptjs";

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
			throw new Error("User already exists");
		}

		password = await bcrypt.hash(password, 6);

		await this.userRepository.createUser({name, email, password});
	}
}