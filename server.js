require("dotenv").config();
const createApp = require("./app");

const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const DB1_Conection = process.env.DB1_CONNECTION_URL.replace(
	"<db1_password>",
	process.env.DB1_PASSWORD
)
	.replace("<db_username>", process.env.DB_USER)
	.replace("<db1_name>", process.env.DB1_NAME);

const DB2_Conection = process.env.DB2_CONNECTION_URL.replace(
	"<db2_password>",
	process.env.DB2_PASSWORD
)
	.replace("<db_username>", process.env.DB_USER)
	.replace("<db2_name>", process.env.DB2_NAME);

// Connect to database

let server; // Declare server globally to be able to close it when shutting down the server

const initializeDBandStartServer = async () => {
	try {
		// await mongoose.connect(DBConection);

		// console.log("Database connected successfully!!");

		// Connect to first DB

		console.log("DB1 Connection String:", DB1_Conection);
		console.log("DB2 Connection String:", DB2_Conection);

		const db1 = mongoose.createConnection(DB1_Conection);
		console.log("✅ DB1 (Ugaoo) connected!");

		// Connect to second DB
		const db2 = mongoose.createConnection(DB2_Conection);
		console.log("✅ DB2 (Content Management) connected!");

		const app = createApp(db1, db2);

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
			await db1.close();
			await db2.close();
			console.log("🛑 MongoDB connection closed due to app termination.");
			server.close(() => {
				console.log("🛑 Server connection closed");
				process.exit(0);
			});
		});
	} catch (err) {
		console.error("Database connection failed:", err);
		process.exit(1); // Exit process if DB connection fails
	}
};

initializeDBandStartServer();
