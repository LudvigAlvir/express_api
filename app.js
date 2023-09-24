const express = require("express");
const res = require("express/lib/response");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
app.get("/status", (request, response) => {
	const status = {
		status: "RUNNING",
	};
	response.send(status);
});
let users = [
	{
		id: 1,
		name: "John",
		content: "Hello",
	},
	{
		id: 2,
		name: "Peter",
		content: "World",
	},
];
app.get("/", (request, response) => {
	response.send(users);
});
app.post("/", (request, response) => {
	const { name, content } = request.body;
	if (typeof name == "string" && name.length > 0) {
		users.push({
			id: users[users.length - 1].id + 1,
			name: name,
			content: content ? content : "",
		});
		response.send({
			status: "OK",

			message:
				name + " added to the database with ID: " + users[users.length - 1].id,
		});
	} else {
		response.send({
			status: "ERROR",
			message: "Incorrect request body",
		});
	}
});

app.put("/:id", (request, response) => {
	const { id } = request.params;
	const { name, content } = request.body;
	if (name || content) {
		users.forEach((user) => {
			if (user.id == id) {
				if (typeof content == "string" && content.length > 0) {
					user.content = content;
				}
				if (typeof name == "string" && name.length > 0) {
					user.name = name;
				}
			}
		});
		response.send({
			status: "OK",
			message: "User with ID: " + id + " updated",
		});
	} else {
		response.send({
			status: "ERROR",
			message: "Incorrect request body",
		});
	}
});

app.delete("/:id", (request, response) => {
	const { id } = request.params;
	users.forEach((user, index) => {
		if (user.id == id) {
			users.splice(index, 1);
		}
	});
	response.send({
		status: "OK",
		message: "User with ID: " + id + " deleted",
	});
});
