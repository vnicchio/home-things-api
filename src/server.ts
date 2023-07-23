import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (request, response) => {
	response.status(200).send({message: "Hello World"});
});

app.listen(process.env.APP_PORT, () => {
	console.log("Server is running on port 3333");
});