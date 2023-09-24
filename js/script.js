document.querySelector("button").addEventListener("click", async (e) => {
	e.preventDefault();
	const name = document.querySelector("#name").value;
	const content = document.querySelector("#content").value;
	const message = document.querySelector(".message");
	const response = await fetch("http://127.0.0.1:3000/", {
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
