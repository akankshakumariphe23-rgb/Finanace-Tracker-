# FinSight  
A personal finance tracker web application built using the MERN stack (MongoDB, Express, React, Node.js) that helps users manage income, expenses, and budgets through a clean interface and insightful visualizations.

## Features  
- **User Authentication**: Secure login and signup using JWT tokens and hashed passwords with BcryptJS.  
- **Dashboard Overview**: Summarized view of total income, expenses, budget, and key visual insights such as income vs. expenses and top 5 spending categories.  
- **Income & Expense Management**: Add, delete, sort, and filter transactions by category, date, and amount.  
- **Visual Analytics**: Interactive pie charts and monthly trend graphs for both income and expenses using Recharts.  
- **Budget Tracking**: Set time-based budgets and receive alerts for overspending, underspending, or staying within limits.

## Usage  

### Sign Up / Log In  
- Create an account or log in with existing credentials.  
- Authentication protects all user-specific pages using JWT tokens.

### Dashboard  
- View a high-level summary of total budget, income, and spending.  
- Visualize income vs. expenses and top expense categories.

### Income / Expense Pages  
- Add transactions with details such as category, date, description, and amount.  
- Sort and filter income and expenses by category, date, or amount.  
- View category-wise pie charts and monthly trends using Recharts.

### Budget Page  
- Define a budget for a selected period.  
- Get real-time feedback on whether you're within budget, overspending, or underspending.

### Logout  
- Securely log out and end your session.

## Technologies Used  

- **MongoDB & Mongoose** – Database and schema modeling.  
- **Express.js & Node.js** – Server-side framework and routing.  
- **React.js & Tailwind CSS** – Modern, responsive frontend.  
- **JWT & BcryptJS** – Secure authentication and password hashing.  
- **Recharts** – Data visualization through charts and graphs.

## Acknowledgments  
Built to simplify personal finance management and inspired by the need for visual, user-friendly money tracking. Special thanks to open-source tools like Recharts, Bcryptjs, and the MERN stack ecosystem.

