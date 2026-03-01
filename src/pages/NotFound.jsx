import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Compass } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import './NotFound.css';

function NotFound() {
    const { t } = useTranslation();

    return (
        <PageTransition>
            <div className="not-found-container">
                <div className="not-found-content">
                    <div className="not-found-icon">
                        <Compass size={80} strokeWidth={1.5} />
                    </div>
                    <h1>404</h1>
                    <h2>{t('notfound.title')}</h2>
                    <p>{t('notfound.message')}</p>
                    <div className="climbing-joke">
                        <p><em>{t('notfound.joke')}</em></p>
                    </div>
                    <Link to="/" className="home-button">
                        <Home size={20} />
                        {t('notfound.back_home')}
                    </Link>
                </div>
            </div>
        </PageTransition>
    );
}

export default NotFound;
