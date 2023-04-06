let email = document.getElementById("email");
let pass = document.getElementById("pass");
let submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", async function () {
  console.log(email.value, pass.value);

  const res = await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      pass,
    }),
  });
  console.log(await res.json());
});
