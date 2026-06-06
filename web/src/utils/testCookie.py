import requests
import random

session = requests.Session()

username = f"stud_{random.randint(1000, 9999)}"
email = f"{username}@univ.edu"
password = "Password123!"

payload = {
    "username": username,
    "email": email,
    "password": password,
    "full_name": "Test Cookie Student",
    "department": "18475823",
    "current_level": 1
}

print("Registering...")
reg_res = session.post("https://ahmedamara.pythonanywhere.com/api/register/", json=payload)
print("Register Status:", reg_res.status_code)

print("\nFetching /me/...")
me_res = session.get("https://ahmedamara.pythonanywhere.com/api/me/")
print("Me Request Headers:", me_res.request.headers)
print("Me Status:", me_res.status_code)
print("Me Response:", me_res.json())
