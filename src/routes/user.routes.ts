import { Router } from "express";
// import { prisma } from "../lib/prisma";
import { UserController } from "../controllers/UserController";
import { userAuthenticated } from "../middlewares/userAuthenticated";

const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/", userAuthenticated, async (request, response) => {
	console.log("TESTE");
	// const users = await prisma.user.findMany();

	return response.status(200).send({message: "Teste"});

	
});

userRoutes.post("/", userController.register);

export default userRoutes;