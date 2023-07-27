import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../userRepository";
import { prisma } from "../../lib/prisma";

export default class PrismaUserRepository implements UserRepository {

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		return user;
	}

	async createUser({ name, email, password }: Prisma.UserCreateInput): Promise<User> {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password
			}
		});

		return user;
	}

}