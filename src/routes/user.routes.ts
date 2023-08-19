import { Router } from "express";
import { prisma } from "../lib/prisma";
import { register } from "../controllers/users/register";

const userRoutes = Router();

userRoutes.get("/", async (request, response) => {
	const users = await prisma.user.findMany();

	response.status(200).send(users);
});

userRoutes.post("/", register);

export default userRoutes;