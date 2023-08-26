import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import routes from "./routes";
import { AppError } from "./utils/AppError";

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: "error",
			message: err.message,
		});
	}

	console.error(err);

	return response.status(500).json({
		status: "error",
		message: "Internal server error",
	});

	return next();
});

export default app;