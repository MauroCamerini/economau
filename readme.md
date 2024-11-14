# Economau
A simple, portable desktop app to track my income and expenses. Built with **Electron**, **React**, and **SQLite**.

## Features
- **Portable:** Runs on any platform thanks to Electron.
- **User-Friendly UI:** Built with React, featuring React Router, Forms, and Bootstrap for a clean, smooth experience.
- **Local Data Storage:** Stores all your data securely in a local SQLite database, so your finances stay with you.
- **Income and Expense Tracking:** Easily input, categorize, and view your financial transactions.

## Installation
1. **Clone the Repository**
```
git clone https://github.com/MauroCamerini/economau.git
cd economau
```
2. **Install Dependencies**
```
npm install
```
3. **Run the App**
```
npm start
```

## Tech Stack
- **Electron:** Cross-platform desktop app framework
- **React:** Front-end framework
    - **React Router**
    - **React Hook Form**
    - **React Bootstrap**
- **Yup: Schema validation**
- **better-sqlite3:** Local storage with SQLite for fast, secure data handling

## Current Project Status
- All dependencies are installed and tested.
- "Front-end" and "back-end" communication is established.
- Database created and filled with some data (check *docs/createdb.sql*)
- The React app is loaded within a Context, which loads data from the database tables and making it accesible for all the components.
- Both SQL queries (in the terminal, using SQLite’s verbose mode) and their JSON responses (in the browser console) are logged.

## Contact
For questions or feedback, reach out at maurocamerini90@gmail.com.