import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { UserRepository } from "../../repositories/userRepository";
import { AppError } from "../../utils/AppError";

interface SessionCreateServiceRequest {
  email: string,
  password: string
}

interface UserReponse {
	id: string,
	email: string,
	name: string
}

export class SessionCreateService{
	constructor (private userRepository: UserRepository){}

	async create({email, password}: SessionCreateServiceRequest) {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new AppError("Email and/or password incorrect", 404);
		}

		const passwordMatched = await compare(password, user.password);

		if (!passwordMatched) {
			throw new AppError("Email and/or password incorrect", 404);
		}

		const token = sign({}, process.env.JWT_SECRET || "" , {
			subject: String(user.id),
			expiresIn: "1d"
		});

		const refreshToken = sign({}, process.env.JWT_SECRET || "" , {
			subject: String(user.id),
			expiresIn: "7d"
		});

		const userFinal: UserReponse = {
			id: user.id,
			name: user.name,
			email: user.email
		};

		return {user: userFinal, token, refreshToken};
	}
}