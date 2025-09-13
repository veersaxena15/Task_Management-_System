# Task Management System

## 📌 Project Overview

The **Task Management System** is a full-stack web application developed during my training to manage tasks efficiently.
It provides features such as user authentication, task creation, updating, deletion, categorization, and deadline tracking.

This project was built using:

* **Backend:** Python (Django)
* **Frontend:** HTML, CSS, JavaScript

---

## 🛑 Problem Statements

1. Difficulty in tracking multiple tasks effectively.
2. Lack of a secure system for user-specific task management.
3. Limited ability to organize tasks by categories and deadlines.
4. Need for a responsive interface for a better user experience.

---

## ✅ Solutions Implemented

* Developed a structured platform to **add, update, delete, and manage tasks**.
* Integrated **secure authentication (login & logout)** to maintain user privacy.
* Enabled **task categorization and due date tracking** for better organization.
* Designed an **interactive and responsive frontend** for smooth usability.

---

## 🚀 Features

* User Registration & Login
* Add, Edit, and Delete Tasks
* Mark tasks as completed
* Categorize tasks with labels
* Set deadlines and track due dates
* Responsive and user-friendly interface

---

## 🛠️ Tech Stack

* **Python (Django)** – Backend framework
* **SQLite** – Database
* **HTML, CSS, JavaScript** – Frontend technologies

---

## 📂 Project Structure (simplified)

```
task_manager/
│── manage.py
│── requirements.txt
│── db.sqlite3
│
├── task_app/        # Main app for tasks
│   ├── migrations/
│   ├── templates/
│   ├── static/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
│
├── task_manager/    # Project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
```

---

## 📖 How to Run the Project

1. **Clone the repository**

   ```bash
   git clone https://github.com/veesaxena15/Task_Management_System.git
   cd Task_Management_System
   ```

2. **Create and activate virtual environment**

   ```bash
   python -m venv env
   source env/bin/activate   # On Linux/Mac
   env\Scripts\activate      # On Windows
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**

   ```bash
   python manage.py migrate
   ```

5. **Start the server**

   ```bash
   python manage.py runserver
   ```

6. Open the app in your browser:

   ```
   http://127.0.0.1:8000/
   ```

---

## 👥 Team Members

* **Veer Saxena**
* **Unnati Srivastava**
* **Vandana Mishra**
* **Ujjyant Bajpai**

---
