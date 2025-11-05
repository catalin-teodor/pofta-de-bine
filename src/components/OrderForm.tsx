
import React, { useState, useEffect } from 'react';
import type { Order } from '../types';
import { CheckCircleIcon } from './IconComponents';

const OrderForm: React.FC = () => {
    const initialFormData = {
        fullName: '',
        address: '',
        phone: '',
        days: {
            Luni: false,
            Marți: false,
            Miercuri: false,
            Joi: false,
            Vineri: false,
        },
        captcha: '',
        honeypot: '' // Hidden field for bots
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    const [daysError, setDaysError] = useState('');
    const [captchaNums, setCaptchaNums] = useState({ num1: 0, num2: 0 });

    const weekDays = Object.keys(initialFormData.days);

    const generateCaptcha = () => {
        setCaptchaNums({
            num1: Math.floor(Math.random() * 10) + 1,
            num2: Math.floor(Math.random() * 10) + 1,
        });
    };

    useEffect(() => {
        generateCaptcha();
    }, []);
    
    const validate = () => {
        let isValid = true;
        // Phone validation
        const phoneRegex = /^07[0-9]{8}$/;
        if (!formData.phone) {
            setPhoneError('Numărul de telefon este obligatoriu.');
            isValid = false;
        } else if (!phoneRegex.test(formData.phone)) {
            setPhoneError('Te rugăm să introduci un număr de telefon valid (ex: 07xxxxxxxx).');
            isValid = false;
        } else {
            setPhoneError('');
        }

        // Days selection validation
        const isAnyDaySelected = Object.values(formData.days).some(day => day);
        if (!isAnyDaySelected) {
            setDaysError('Te rugăm să selectezi cel puțin o zi pentru livrare.');
            isValid = false;
        } else {
            setDaysError('');
        }
        
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            days: {
                ...prev.days,
                [name]: checked
            }
        }));
    }

    const saveOrder = (orderData: Omit<Order, 'id' | 'timestamp'>) => {
        try {
            const newOrder: Order = {
                ...orderData,
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
            };
            const existingOrdersRaw = localStorage.getItem('orders');
            const existingOrders: Order[] = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
            existingOrders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(existingOrders));
        } catch (error) {
            console.error("Failed to save order:", error);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.honeypot) {
            console.log("Bot detected!");
            return; 
        }

        if (!validate()) {
            return;
        }

        const captchaSum = captchaNums.num1 + captchaNums.num2;
        if (parseInt(formData.captcha, 10) !== captchaSum) {
            setCaptchaError('Răspuns incorect. Te rugăm să încerci din nou.');
            generateCaptcha();
            setFormData(prev => ({ ...prev, captcha: '' }));
            return;
        }
        
        setCaptchaError('');
        const selectedDays = Object.entries(formData.days)
            .filter(([, isSelected]) => isSelected)
            .map(([day]) => day);

        saveOrder({
            fullName: formData.fullName,
            address: formData.address,
            phone: formData.phone,
            days: selectedDays,
        });
            
        console.log('Order submitted:', { ...formData, days: selectedDays });
        setIsSubmitted(true);
        
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData(initialFormData);
            generateCaptcha();
        }, 5000);
    };

    const isSubmitDisabled = 
        !formData.fullName || 
        !formData.address || 
        !formData.phone || 
        !formData.captcha || 
        !Object.values(formData.days).some(day => day);

    if(isSubmitted) {
        return (
            <section id="order" className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-2xl text-center">
                    <div className="bg-brand-green-light/20 border-2 border-brand-green-light p-8 rounded-lg shadow-lg">
                        <CheckCircleIcon className="h-16 w-16 text-brand-green-dark mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-green-dark mb-2">Mulțumim, {formData.fullName}!</h2>
                        <p className="text-gray-700 text-lg">
                           Comanda ta a fost înregistrată cu succes. Te vom contacta în cel mai scurt timp pentru a confirma detaliile livrării.
                        </p>
                    </div>
                </div>
           </section>
        )
    }

  return (
    <section id="order" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Plasează Comanda</h2>
          <p className="text-gray-600 mt-2">Completează formularul de mai jos pentru a începe livrarea.</p>
        </div>
        <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true" tabIndex={-1} />

                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nume Complet</label>
                    <input type="text" name="fullName" id="fullName" required value={formData.fullName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green-dark focus:border-brand-green-dark"/>
                </div>
                 <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresa de livrare</label>
                    <textarea name="address" id="address" rows={3} required value={formData.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green-dark focus:border-brand-green-dark"></textarea>
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Număr de telefon</label>
                    <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} onBlur={() => validate()} className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-brand-green-dark focus:border-brand-green-dark ${phoneError ? 'border-red-500' : 'border-gray-300'}`}/>
                    {phoneError && <p className="mt-2 text-sm text-red-600">{phoneError}</p>}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Selectează zilele pentru livrare</label>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {weekDays.map(day => (
                             <label key={day} className="flex items-center space-x-2 p-2 rounded-md border border-gray-300 bg-white cursor-pointer hover:bg-brand-green-light/20 transition-colors">
                                <input 
                                    type="checkbox" 
                                    name={day} 
                                    checked={formData.days[day as keyof typeof formData.days]} 
                                    onChange={handleDayChange}
                                    className="h-4 w-4 rounded border-gray-300 text-brand-green-dark focus:ring-brand-green-dark"
                                />
                                <span className="text-gray-700">{day}</span>
                            </label>
                        ))}
                    </div>
                    {daysError && <p className="mt-2 text-sm text-red-600">{daysError}</p>}
                </div>

                <div>
                    <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">Verificare: Cât fac {captchaNums.num1} + {captchaNums.num2}?</label>
                    <input type="number" name="captcha" id="captcha" required value={formData.captcha} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-brand-green-dark focus:border-brand-green-dark ${captchaError ? 'border-red-500' : 'border-gray-300'}`}/>
                    {captchaError && <p className="mt-2 text-sm text-red-600">{captchaError}</p>}
                </div>

                <div>
                    <button 
                        type="submit" 
                        disabled={isSubmitDisabled}
                        className="w-full bg-brand-green-dark text-white py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-dark transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100">
                        Confirmă Comanda
                    </button>
                </div>
            </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
