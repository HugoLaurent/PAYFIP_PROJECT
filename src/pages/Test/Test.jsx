import React from "react";

export default function Test() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Email:", email);
    console.log("Password:", password);

    fetch("/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mail: email, password: password }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
      </div>
      <button type="submit">Create User</button>
    </form>
  );
}
