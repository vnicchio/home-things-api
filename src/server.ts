import "dotenv/config";
import app from "./app";

app.listen(process.env.APP_PORT, () => {
	console.log("Server is running on port 3333");
});