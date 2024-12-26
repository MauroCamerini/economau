# Economau
A simple, portable desktop app to track my income and expenses. Built with **Electron**, **React**, and **SQLite**.

## Important!!

  **I'm not working on this repository anymore; it's just here to document the first steps of the app development. The project continues at: [Desktop React SQL Ledger](https://github.com/MauroCamerini/desktop-react-sql-ledger)**

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
- **Webpack**
- **Yup:** Schema validation
- **better-sqlite3:** Local storage with SQLite for fast, secure data handling

## Current Project Status
- Escalable UI with routes and menu gerated from config
- Clean API beetwen main process and render process
- View for inserting transactions in the DB
- View for reading all transactions in the DB

## Contact
For questions or feedback, reach out at maurocamerini90@gmail.com.