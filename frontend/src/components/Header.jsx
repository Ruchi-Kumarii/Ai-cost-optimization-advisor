import React from 'react';
import './Header.css';

function Header({ scrollToFooter }) {
    return (
        <div className="header-container">
            <nav className="nav-links">
                <a
                    href="https://github.com/your-username/your-repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-button"
                    style={{ textDecoration: 'none' }}  // <- inline style
                >
                    Documentation
                </a>

                <button className="nav-button" onClick={scrollToFooter}>
                    About Us
                </button>
                <button className="nav-button" onClick={scrollToFooter}>
                    Help
                </button>
            </nav>
        </div>
    );
}

export default Header;
