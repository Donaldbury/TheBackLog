import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';
import './NavBar.css';

function NavBar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    // Update document direction when language changes (for RTL support like Persian)
    useEffect(() => {
        document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">{t('home.title')}</Link>
            </div>
            <div className="nav-right">
                <ul className="nav-links">
                    <li><Link to="/">{t('nav.home')}</Link></li>
                    <li><Link to="/about">{t('nav.about')}</Link></li>
                    <li><Link to="/services">{t('nav.services')}</Link></li>
                    <li><Link to="/blog">{t('nav.blog')}</Link></li>
                </ul>
                <select
                    className="language-switcher theme-toggle"
                    value={i18n.language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    aria-label="Language"
                >
                    <option value="en">EN</option>
                    <option value="fa">FA</option>
                    <option value="fr">FR</option>
                    <option value="nl">NL</option>
                    <option value="de">DE</option>
                </select>
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
