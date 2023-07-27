import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { register } from "./register";

const userRoutes = Router();

userRoutes.get("/user", async (request, response) => {
	const users = await prisma.user.findMany();

	response.status(200).send(users);
});

userRoutes.post("/user", register);

export default userRoutes;