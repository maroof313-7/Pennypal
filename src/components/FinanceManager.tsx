// FinanceManager.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import PaymentHistory from './PaymentHistory';
import Community from './Community'; 
import CreditScore from './CreditScore'; 
import PieChart from './PieChart'; 
import './FinanceManager.css'; 

interface Expense {
    amount: number;
    category: string;
}

interface PaymentHistoryItem {
    amount: number;
    date: string;
}

const FinanceManager: React.FC = () => {
    const [income, setIncome] = useState<number>(() => {
        const savedIncome = localStorage.getItem('income');
        return savedIncome ? Number(savedIncome) : 0;
    });
    const [goal, setGoal] = useState<number>(() => {
        const savedGoal = localStorage.getItem('goal');
        return savedGoal ? Number(savedGoal) : 0;
    });
    const [expenses, setExpenses] = useState<Expense[]>(() => {
        const savedExpenses = localStorage.getItem('expenses');
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });
    const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>(() => {
        const savedHistory = localStorage.getItem('paymentHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });
    const [user, setUser] = useState<string | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser;
    });
    const [paymentStatus, setPaymentStatus] = useState<string>('');
    const [creditScore, setCreditScore] = useState<number>(700); 
    const [reportVisible, setReportVisible] = useState<boolean>(false);
    const [report, setReport] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('income', income.toString());
    }, [income]);

    useEffect(() => {
        localStorage.setItem('goal', goal.toString());
    }, [goal]);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    useEffect(() => {
        localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
    }, [paymentHistory]);

    useEffect(() => {
        if (!user) {
            createGuestAccount();
        }
    }, [user]);

    const createGuestAccount = () => {
        const guestName = prompt("Enter guest name:", "Guest");
        if (guestName) {
            setUser(guestName);
            localStorage.setItem('user', guestName);
        }
    };

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncome(Number(e.target.value));
    };

    const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGoal(Number(e.target.value));
    };

    const addExpense = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const amount = Number(e.currentTarget.expense.value);
        const category = e.currentTarget.category.value;
        setExpenses([...expenses, { amount, category }]);
        e.currentTarget.reset(); 
    };

    const editExpense = (index: number) => {
        const newAmount = prompt("Enter new amount:", expenses[index].amount.toString());
        const newCategory = prompt("Enter new category:", expenses[index].category);
        
        if (newAmount && newCategory) {
            const updatedExpenses = [...expenses];
            updatedExpenses[index] = { amount: Number(newAmount), category: newCategory };
            setExpenses(updatedExpenses);
        }
    };

    const deleteExpense = (index: number) => {
        const updatedExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(updatedExpenses);
    };

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remaining = income - totalExpenses;

    const handlePayment = () => {
        if (totalExpenses === 0) {
            setPaymentStatus(`No expenses to pay.`);
            return;
        }

        setPaymentStatus(`Processing payment for expenses of $${totalExpenses}...`);

        setTimeout(() => {
            if (totalExpenses > 0) {
                setPaymentHistory([...paymentHistory, { amount: totalExpenses, date: new Date().toLocaleString() }]); 
                setExpenses([]); 
                setPaymentStatus(`Payment of $${totalExpenses} successful!`);
            } else {
                setPaymentStatus(`Payment failed: No expenses to pay.`);
            }
        }, 2000); 
    };

    const handleDeletePaymentHistory = (index: number) => {
        const updatedPaymentHistory = paymentHistory.filter((_, i) => i !== index);
        setPaymentHistory(updatedPaymentHistory);
    };

    const generateReport = () => {
        const reportContent = expenses.map(exp => `Expense: $${exp.amount} | Category: ${exp.category}`).join('\n');
        const totalReport = `Total Expenses: $${totalExpenses}`;
        setReport(`${reportContent}\n${totalReport}`);
        setReportVisible(true);
    };

    return (
        <Router>
            <div className="outer-container">
                <Sidebar />
                <div className="container">
                    <h1>PennyPal: Your Personal Financial Assistant</h1>
                    <h2>Welcome, {user || "Guest"}</h2>
                    <Routes>
                        <Route path="/" element={
                            <div>
                                <div>
                                    <label>
                                        Income: 
                                        <input type="number" value={income} onChange={handleIncomeChange} />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Savings Goal: 
                                        <input type="number" value={goal} onChange={handleGoalChange} />
                                    </label>
                                </div>
                                <form onSubmit={addExpense}>
                                    <div className="expense-input-container">
                                        <input type="number" name="expense" placeholder="Add Expense" required />
                                        <input type="text" name="category" placeholder="Category" required className="category-input" />
                                    </div>
                                    <button type="submit" className="add-expense-button">Add Expense</button>
                                </form>
                                <div>
                                    <h2>Report</h2>
                                    {remaining >= goal ? (
                                        <p>You're on track! Remaining income: ${remaining}</p>
                                    ) : (
                                        <p>You're short of your goal by ${goal - remaining}</p>
                                    )}
                                    <p>Total Expenses: ${totalExpenses}</p>
                                </div>
                                <div>
                                    <h2>Expenses</h2>
                                    <ul>
                                        {expenses.map((expense, index) => (
                                            <li key={index}>
                                                Expense: ${expense.amount} | Category: {expense.category}
                                                <div className="button-container">
                                                    <button onClick={() => editExpense(index)} className="edit-button">Edit</button>
                                                    <button onClick={() => deleteExpense(index)} className="delete-button">Delete</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h2>Payment</h2>
                                    <button onClick={handlePayment} className="pay-button">Pay Expenses</button>
                                    {paymentStatus && <p>{paymentStatus}</p>}
                                </div>
                                <div>
                                    <h2>Expense Chart</h2>
                                    <PieChart expenses={expenses} />
                                    <button onClick={generateReport} className="generate-report-button">Generate Report</button>
                                    {reportVisible && <pre>{report}</pre>}
                                </div>
                            </div>
                        } />
                        <Route path="/history" element={<PaymentHistory paymentHistory={paymentHistory} onDelete={handleDeletePaymentHistory} />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/credit-score" element={<CreditScore score={creditScore} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default FinanceManager;
