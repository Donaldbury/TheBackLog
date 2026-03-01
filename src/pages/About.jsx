import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './About.css';

function About() {
    const { t } = useTranslation();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const ukTime = time.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return (
        <PageTransition>
            <section className="about-bento-container">
                <h1 className="page-heading">{t('about.title')}</h1>

                <div className="bento-grid">
                    {/* Main Bio Card */}
                    <motion.div
                        className="bento-card bento-span-3 bio-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <img src="/assets/profile_picture.jpg" alt="Donald" className="bio-photo" />
                        <div className="bio-text">
                            <h2>Donald Bury</h2>
                            <p className="bio-title">{t('about.intro_title')}</p>
                            <p className="bio-degree">{t('about.intro_degree')}</p>
                        </div>
                    </motion.div>

                    {/* Live Clock Card */}
                    <motion.div
                        className="bento-card clock-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3>UK Time</h3>
                        <div className="live-clock">{ukTime}</div>
                        <p className="clock-location">London, UK</p>
                    </motion.div>

                    {/* Experience Card (Scrollable) */}
                    <motion.div
                        className="bento-card bento-wide bento-tall experience-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3>{t('about.work_experience')}</h3>
                        <div className="experience-list">
                            <div className="exp-item">
                                <h4>{t('about.babcock')}</h4>
                                <p><strong>{t('about.babcock_senior')}</strong> (2024–Present)</p>
                                <p><strong>{t('about.babcock_dev')}</strong> (2022–2024)</p>
                            </div>
                            <div className="exp-item">
                                <h4>{t('about.range')}</h4>
                                <p><strong>{t('about.range_dev')}</strong> (2017–2022)</p>
                                <p><strong>{t('about.range_junior')}</strong> (2016–2017)</p>
                            </div>
                            <div className="exp-item">
                                <h4>{t('about.nhs')}</h4>
                                <p><strong>{t('about.nhs_vol')}</strong> (2016)</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Education Card */}
                    <motion.div
                        className="bento-card bento-wide education-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3>{t('about.education')}</h3>
                        <div className="edu-list">
                            <p>{t('about.plymouth')}</p>
                            <p>{t('about.liskeard_6th')}</p>
                            <p>{t('about.liskeard_sec')}</p>
                        </div>
                    </motion.div>

                    {/* Climbing Card */}
                    <motion.div
                        className="bento-card climbing-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="card-icon">🧗‍♂️</div>
                        <h3>{t('about.climbing')}</h3>
                    </motion.div>

                    {/* Gaming Card */}
                    <motion.div
                        className="bento-card gaming-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="card-icon">🎮</div>
                        <h3>{t('about.gaming')}</h3>
                        <p>{t('about.gaming_desc')}</p>
                    </motion.div>

                    {/* Warhammer Card */}
                    <motion.div
                        className="bento-card bento-wide warhammer-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="card-icon">🎨</div>
                        <div className="warhammer-content">
                            <h3>{t('about.warhammer')}</h3>
                            <p>{t('about.warhammer_desc')}</p>
                        </div>
                    </motion.div>

                    {/* Films & TV Card */}
                    <motion.div
                        className="bento-card bento-wide films-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                    >
                        <div className="card-icon">🎬</div>
                        <div className="warhammer-content">
                            <h3>{t('about.films')}</h3>
                            <p>{t('about.films_desc')}</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PageTransition>
    );
}

export default About;
