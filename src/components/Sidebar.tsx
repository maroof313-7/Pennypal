// Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import your existing CSS styles

const Sidebar: React.FC = () => {
    return (
        <nav className="sidebar">
            <h2>Finance Manager</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/history">Payment History</Link></li>
                <li><Link to="/community">Community</Link></li> {/* Community link */}
                <li><Link to="/credit-score">Credit Score</Link></li> {/* Credit Score link */}
                
            </ul>
        </nav>
    );
};

export default Sidebar;
