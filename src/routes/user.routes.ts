import { Router } from "express";
import { prisma } from "../lib/prisma";
import { UserController } from "../controllers/UserController";
import { userAuthenticated } from "../middlewares/userAuthenticated";

const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/", userAuthenticated, async (request, response) => {
	const users = await prisma.user.findMany();

	return response.status(200).send(users);
});

userRoutes.post("/", userController.register);

export default userRoutes;