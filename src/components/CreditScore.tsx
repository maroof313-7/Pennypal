// src/components/CreditScore.tsx
import React from 'react';
import './CreditScore.css'; // Ensure this CSS file exists for styling

interface CreditScoreProps {
    score: number; // Define the prop type for score
}

const CreditScore: React.FC<CreditScoreProps> = ({ score }) => {
    return (
        <div className="credit-score-container">
            <h2>Your Credit Score</h2>
            <p>Your current credit score is: <strong>{score}</strong></p>
            <p>This score helps lenders assess your creditworthiness.</p>
            {/* Add more information about credit score if necessary */}
        </div>
    );
};

export default CreditScore;
