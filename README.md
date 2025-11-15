pfm-project/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── keys.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── expenseController.js
│   │   │   ├── incomeController.js
│   │   │   ├── budgetController.js
│   │   │   └── categoryController.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Expense.js
│   │   │   ├── Income.js
│   │   │   ├── Budget.js
│   │   │   └── Category.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── expenseRoutes.js
│   │   │   ├── incomeRoutes.js
│   │   │   ├── budgetRoutes.js
│   │   │   └── categoryRoutes.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── utils/
│   │   │   └── jwt.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Sidebar.js
│   │   │   └── ExpenseCard.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Expenses.js
│   │   │   ├── Income.js
│   │   │   ├── Budgets.js
│   │   │   └── Categories.js
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── GlobalStateContext.js
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── expenseService.js
│   │   │   └── authService.js
│   │   │
│   │   ├── App.js
│   │

