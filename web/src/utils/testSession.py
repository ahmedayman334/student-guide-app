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
    "full_name": "Test Python Student",
    "department": "18475823",
    "current_level": 1
}

print("Registering...")
reg_res = session.post("https://ahmedamara.pythonanywhere.com/api/register/", json=payload)
print("Register Status:", reg_res.status_code)
print("Cookies after register:", session.cookies.get_dict())

print("\nFetching /me/...")
me_res = session.get("https://ahmedamara.pythonanywhere.com/api/me/")
print("Me Status:", me_res.status_code)
try:
    print("Me Response:", me_res.json())
except Exception as e:
    print("Me Response Text:", me_res.text)

print("\nFetching /todos/...")
todos_res = session.get("https://ahmedamara.pythonanywhere.com/api/todos/")
print("Todos Status:", todos_res.status_code)
try:
    print("Todos Response:", todos_res.json())
except Exception as e:
    print("Todos Response Text:", todos_res.text)
