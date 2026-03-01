import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import './Home.css';

function Home() {
    const { t } = useTranslation();
    return (
        <PageTransition>
            <section className="home">
                <div className="animated-bg">
                    <div className="glow-orb"></div>
                    <div className="grid-overlay"></div>
                    <div className="scanlines"></div>
                </div>
                <div className="home-content">
                    <h1 className="home-title">{t('home.title')}</h1>
                    <p className="home-author">{t('home.author')}</p>
                    <p className="home-subtitle">{t('home.subtitle')}</p>
                    <Link to="/about" className="cta-button">{t('home.cta')}</Link>
                </div>
            </section>
        </PageTransition>
    );
}

export default Home;
