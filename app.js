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
	response.status(200).send(status);
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
	{
		id: 3,
		name: "Ola",
		content: "Example content",
	},
	{
		id: 4,
		name: "Kasia",
		content: "Example content",
	},
];
app.get("/", (request, response) => {
	if (request.query.name) {
		const name = request.query.name;
		const arr = [];
		users.forEach((user) => {
			if (user.name == name) {
				arr.push(user);
			}
		});
		response.status(200).send(arr);
	} else {
		response.status(200).send(users);
	}
});

app.get("/:id", (request, response) => {
	const { id } = request.params;
	let found = false;
	users.forEach((user) => {
		if (user.id == id) {
			response.status(200).send(user);
			found = true;
		}
	});
	if (!found) {
		response.status(400).send({
			status: "ERROR",
			message: "User with ID: " + id + " not found",
		});
	}
});

app.post("/", (request, response) => {
	const { name, content } = request.body;
	if (typeof name == "string" && name.length > 0) {
		users.push({
			id: users[users.length - 1].id + 1,
			name: name,
			content: content ? content : "",
		});
		response.status(201).send({
			status: "OK",

			message:
				name + " added to the database with ID: " + users[users.length - 1].id,
		});
	} else {
		response.status(400).send({
			status: "ERROR",
			message: "Incorrect request body",
		});
	}
});

app.put("/:id", (request, response) => {
	const { id } = request.params;
	const { name, content } = request.body;
	let changed = false;
	if (name || content) {
		users.forEach((user) => {
			if (user.id == id) {
				if (typeof content == "string" && content.length > 0) {
					user.content = content;
				}
				if (typeof name == "string" && name.length > 0) {
					user.name = name;
				}
				changed = true;
				response.status(200).send({
					status: "OK",
					message: "User with ID: " + id + " updated",
				});
			}
		});
		if (!changed) {
			const user = {
				id: id,
				name: "",
				content: "",
			};
			if (typeof content == "string" && content.length > 0) {
				user.content = content;
			}
			if (typeof name == "string" && name.length > 0) {
				user.name = name;
			}
			users.push(user);
			response.status(201).send({
				status: "OK",
				message: "User with ID: " + id + " created",
			});
		}
	} else {
		response.status(400).send({
			status: "ERROR",
			message: "Incorrect request body",
		});
	}
});
app.patch("/:id", (request, response) => {
	const { id } = request.params;
	const { name, content } = request.body;
	let changed = false;
	if (name || content) {
		users.forEach((user) => {
			if (user.id == id) {
				if (typeof content == "string" && content.length > 0) {
					user.content = content;
				}
				if (typeof name == "string" && name.length > 0) {
					user.name = name;
				}
				changed = true;
				response.status(200).send({
					status: "OK",
					message: "User with ID: " + id + " updated",
				});
			}
		});
		if (!changed) {
			response.status(404).send({
				status: "WARNING",
				message: "No user with ID: " + id + " found",
			});
		}
	} else {
		response.status(400).send({
			status: "ERROR",
			message: "Incorrect request body",
		});
	}
});

app.delete("/:id", (request, response) => {
	const { id } = request.params;
	let found = false;
	users.forEach((user, index) => {
		if (user.id == id) {
			found = true;
			users.splice(index, 1);
		}
	});
	if (found) {
		response.status(200).send({
			status: "OK",
			message: "User with ID: " + id + " deleted",
		});
	} else {
		response.status(404).send({
			status: "WARNING",
			message: "No user with ID: " + id + " found",
		});
	}
});
