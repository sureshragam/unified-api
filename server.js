require("dotenv").config();

const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const DBConection = process.env.DB_CONNECTION_URL.replace(
	"<db_password>",
	process.env.DB_PASSWORD
)
	.replace("<db_username>", process.env.DB_USER)
	.replace("<db_name>", process.env.DB_NAME);
// Connect to database

let server; // Declare server globally to be able to close it when shutting down the server

const initializeDBandStartServer = async () => {
	try {
		await mongoose.connect(DBConection);

		console.log("Database connected successfully!!");

		const app = require("./app");

		app.get("/health", (req, res) => {
			// Health check endpoint to verify if the server is running or not
			res.status(200).json({ status: "UP" });
		});

		server = app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT || 3000}`);
		});

		// Graceful Shutdown - Disconnect from DB when stopping the server
		process.on("SIGINT", async () => {
			console.log("🛑 Shutting down server...");
			await mongoose.disconnect();
			console.log("🛑 MongoDB connection closed due to app termination.");
			server.close(() => {
				console.log("💡 Server shut down.");
				process.exit(0);
			});
		});
	} catch (err) {
		console.error("Database connection failed:", err);
		process.exit(1); // Exit process if DB connection fails
	}
};

initializeDBandStartServer();
