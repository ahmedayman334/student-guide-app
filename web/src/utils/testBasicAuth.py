import requests
import random

username = f"stud_{random.randint(1000, 9999)}"
email = f"{username}@univ.edu"
password = "Password123!"

payload = {
    "username": username,
    "email": email,
    "password": password,
    "full_name": "Test Basic Auth Student",
    "department": "18475823",
    "current_level": 1
}

print("Registering student:", username)
reg_res = requests.post("https://ahmedamara.pythonanywhere.com/api/register/", json=payload)
print("Register Status:", reg_res.status_code)
print("Register Body:", reg_res.json())

# Now let's try Basic Auth with username and password
print("\nFetching /me/ using Basic Auth with username...")
me_res_user = requests.get("https://ahmedamara.pythonanywhere.com/api/me/", auth=(username, password))
print("Status:", me_res_user.status_code)
try:
    print("Response:", me_res_user.json())
except:
    print("Response Text:", me_res_user.text)

# Let's try Basic Auth with email and password
print("\nFetching /me/ using Basic Auth with email...")
me_res_email = requests.get("https://ahmedamara.pythonanywhere.com/api/me/", auth=(email, password))
print("Status:", me_res_email.status_code)
try:
    print("Response:", me_res_email.json())
except:
    print("Response Text:", me_res_email.text)
