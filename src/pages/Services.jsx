import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Services.css';

function Services() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        serviceType: 'website',
        details: ''
    });

    const [submitStatus, setSubmitStatus] = useState('idle');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitStatus('submitting');
        // Here you would normally send the data to a backend or an email service
        console.log('Form submitted:', formData);

        // Simulate network delay
        setTimeout(() => {
            setSubmitStatus('success'); // Set status to success
            // Reset form after a few seconds
            setTimeout(() => {
                setSubmitStatus('idle'); // Reset status
                setFormData({
                    name: '',
                    email: '',
                    serviceType: 'website',
                    details: ''
                });
            }, 5000);
        }, 2000);
    };

    return (
        <PageTransition>
            <section className="services">
                <div className="services-header">
                    <h1>{t('services.title')}</h1>
                    <p>{t('services.subtitle')}</p>
                </div>

                <div className="services-grid">
                    <motion.div
                        className="service-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="service-icon">🌐</div>
                        <h3>{t('services.web_dev')}</h3>
                        <p>{t('services.web_dev_desc')}</p>
                    </motion.div>

                    <motion.div
                        className="service-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="service-icon">💻</div>
                        <h3>{t('services.app_dev')}</h3>
                        <p>{t('services.app_dev_desc')}</p>
                    </motion.div>
                </div>

                <div className="contact-form-container">
                    <h2>{t('services.contact_title')}</h2>
                    {submitStatus === 'success' ? (
                        <div className="success-message">
                            {t('services.form_success')}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">{t('services.form_name')}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">{t('services.form_email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="serviceType">{t('services.form_service')}</label>
                                <select
                                    id="serviceType"
                                    name="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleChange}
                                >
                                    <option value="website">{t('services.form_service_web')}</option>
                                    <option value="application">{t('services.form_service_app')}</option>
                                    <option value="other">{t('services.form_service_other')}</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="details">{t('services.form_details')}</label>
                                <textarea
                                    id="details"
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    rows="5"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-button" disabled={submitStatus === 'submitting'}>
                                {submitStatus === 'submitting' ? '...' : t('services.form_submit')}
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </PageTransition>
    );
}

export default Services;
