import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();

const userRoutes = Router();

userRoutes.get("/user", async (request, response) => {
	const users = await prisma.user.findMany();

	response.status(200).send(users);
});

userRoutes.post("/user", async (request, response) => {
	const {name, email, password} = request.body;
	const user = await prisma.user.create({
		data: {
			name,
			email,
			password
		}
	});
	return response.status(201).send(user);
});

export default userRoutes;