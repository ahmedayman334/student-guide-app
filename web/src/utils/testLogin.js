async function run() {
  const username = "user_" + Math.floor(Math.random() * 100000);
  const password = "Pass" + Math.floor(Math.random() * 100000) + "!";
  const email = username + "@gmail.com";

  console.log("Registering user:", username, "password:", password);

  try {
    // 1. Register
    const regRes = await fetch("https://ahmedamara.pythonanywhere.com/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        full_name: "Integration Test User",
        department: "18475823",
        current_level: 1
      })
    });
    console.log("Register Status:", regRes.status);
    const regJson = await regRes.json();
    console.log("Register Response:", regJson);

    // 2. Login
    console.log("\nLogging in with the same credentials...");
    const loginRes = await fetch("https://ahmedamara.pythonanywhere.com/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password
      })
    });
    console.log("Login Status:", loginRes.status);
    const loginCookies = loginRes.headers.get("set-cookie");
    console.log("Login Cookies:", loginCookies);
    const loginJson = await loginRes.json();
    console.log("Login Response:", loginJson);

  } catch (err) {
    console.error("Error in test:", err);
  }
}

run();
