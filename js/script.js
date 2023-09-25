document.querySelector("#get").addEventListener("click", async (e) => {
	e.preventDefault();
	const message = document.querySelector(".message");
	const response = await fetch("https://crud-examples.onrender.com/");
	const data = await response.json();

	message.innerText = "";
	data.forEach((item) => {
		message.innerText +=
			"id: " +
			item.id +
			"\n" +
			" name: " +
			item.name +
			"\n" +
			" content: " +
			item.content +
			"\n\n";
	});
	console.log(data);
});

document.querySelector("#post").addEventListener("click", async (e) => {
	e.preventDefault();
	const name = document.querySelector("#name").value;
	const content = document.querySelector("#content").value;
	const message = document.querySelector(".message");
	const response = await fetch("https://crud-examples.onrender.com/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},

		body: JSON.stringify({
			name: name,
			content: content,
		}),
	});
	const data = await response.json();
	message.innerText = "Status:" + data.status + " " + data.message;
	console.log(data);
});

document.querySelector("#put").addEventListener("click", async (e) => {
	e.preventDefault();
	const name = document.querySelector("#name").value;
	const content = document.querySelector("#content").value;
	const id = document.querySelector("#id").value;
	const message = document.querySelector(".message");
	const response = await fetch("https://crud-examples.onrender.com/" + id, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},

		body: JSON.stringify({
			name: name,
			content: content,
		}),
	});
	const data = await response.json();
	message.innerText = "Status:" + data.status + " " + data.message;
	console.log(data);
});

document.querySelector("#delete").addEventListener("click", async (e) => {
	e.preventDefault();
	const id = document.querySelector("#id").value;
	const message = document.querySelector(".message");
	const response = await fetch("https://crud-examples.onrender.com/" + id, {
		method: "DELETE",
	});
	const data = await response.json();
	message.innerText = "Status:" + data.status + " " + data.message;
	console.log(data);
});
