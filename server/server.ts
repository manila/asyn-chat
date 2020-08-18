import path from "path";
import express from "express";

const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.listen(PORT, () => {
	console.log("running on port: " + PORT);
});
