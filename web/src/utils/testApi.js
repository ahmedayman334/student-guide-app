async function run() {
  const username = "stud_" + Math.floor(Math.random() * 10000);
  const email = username + "@univ.edu";
  const password = "Password123!";

  console.log("Registering:", username);

  try {
    const regRes = await fetch("https://ahmedamara.pythonanywhere.com/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        full_name: "Test Flow Student",
        department: "18475823",
        current_level: 1
      })
    });
    console.log("Register Status:", regRes.status);
    const regCookies = regRes.headers.get("set-cookie");
    
    // Extract access_token
    let accessToken = "";
    if (regCookies) {
      const parts = regCookies.split(',');
      for (const part of parts) {
        if (part.includes("access_token=")) {
          accessToken = part.split("access_token=")[1].split(";")[0];
        }
      }
    }
    console.log("Extracted access token:", accessToken.substring(0, 30) + "...");

    // Test with Authorization: JWT <accessToken>
    const meResJWT = await fetch("https://ahmedamara.pythonanywhere.com/api/me/", {
      headers: {
        "Authorization": `JWT ${accessToken}`
      }
    });
    console.log("Me (JWT) Status:", meResJWT.status);
    const meJsonJWT = await meResJWT.json();
    console.log("Me (JWT) Response:", meJsonJWT);

  } catch (err) {
    console.error("Error in flow:", err);
  }
}

run();
