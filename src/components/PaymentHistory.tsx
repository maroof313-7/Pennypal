import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PaymentHistoryItem {
    amount: number;
    date: string;
}

interface PaymentHistoryProps {
    paymentHistory: PaymentHistoryItem[];
    onDelete: (index: number) => void; // Add onDelete prop
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ paymentHistory, onDelete }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleBack = () => {
        navigate('/'); // Navigate back to the main page
    };

    return (
        <div>
            <h2>Payment History</h2>
            <ul>
                {paymentHistory.length > 0 ? (
                    paymentHistory.map((item, index) => (
                        <li key={index}>
                            Paid <strong>${item.amount}</strong> on <strong>{new Date(item.date).toLocaleString()}</strong>
                            <button onClick={() => onDelete(index)}>Delete</button> {/* Add delete button */}
                        </li>
                    ))
                ) : (
                    <li>No payment history available.</li>
                )}
            </ul>
            <button onClick={handleBack} className="back-button">Back to Finance Manager</button>
        </div>
    );
};

export default PaymentHistory;
