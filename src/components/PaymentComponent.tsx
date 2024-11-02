// PaymentComponent.tsx
import React, { useState } from 'react';
import axios from 'axios';

const PaymentComponent: React.FC = () => {
    const [paymentStatus, setPaymentStatus] = useState('');

    const handlePayment = async () => {
        const apiKey = process.env.REACT_APP_CROSSMINT_API_KEY; // Securely access the API key

        const paymentData = {
            amount: 1000, // Example amount in cents
            currency: 'usd',
            // Add other required parameters based on Crossmint API documentation
        };

        try {
            const response = await axios.post('https://api.crossmint.com/v1/payments', paymentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            });

            if (response.status === 200) {
                setPaymentStatus(`Payment successful! Transaction ID: ${response.data.transactionId}`);
                // Handle successful payment
            } else {
                setPaymentStatus('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setPaymentStatus('Payment failed. Please try again.');
        }
    };

    return (
        <div>
            <button onClick={handlePayment}>Pay Now</button>
            {paymentStatus && <p>{paymentStatus}</p>}
        </div>
    );
};

export default PaymentComponent;
