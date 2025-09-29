import React, { useState } from 'react';
import { COLORS } from './constants';
import AccentButton from './AccentButton';

interface ContactFormSectionProps {}

const ContactFormSection: React.FC<ContactFormSectionProps> = () => {
  const [formData, setFormData] = useState({ name: '', email: '', car: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const captchaValue = '7A2B';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captchaValue) {
      alert('Please enter the correct Captcha code.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Thank you! Your inquiry has been sent.');
      setFormData({ name: '', email: '', car: '', message: '' });
      setCaptchaInput('');
      setIsSubmitting(false);
    }, 1500);
  };

  const openWhatsApp = () => {
    const message = `Hello WEC Africa, I am interested in exporting my car. My name is ${formData.name}.`;
    window.open(`https://wa.me/27712345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="contact-form" className="py-24 md:py-32" style={{ backgroundColor: COLORS.dark }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-center mb-16" style={{ color: COLORS.light }}>
          Ready to Export?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch p-8 md:p-12 rounded-3xl shadow-2xl" style={{ backgroundColor: 'white' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-3xl font-bold" style={{ color: COLORS.dark }}>Get A Quote</h3>
            {(['name', 'email', 'car'] as Array<keyof typeof formData>).map(field => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1) + (field === 'car' ? ' Model (e.g., BMW X5 2022)' : '')}
                required
                className="w-full p-3 rounded-xl border-2 focus:border-red-600 focus:ring-0"
                style={{ borderColor: COLORS.light, color: COLORS.dark }}
              />
            ))}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message / Specific Requirements..."
              rows={4}
              className="w-full p-3 rounded-xl border-2 focus:border-red-600 focus:ring-0"
              style={{ borderColor: COLORS.light, color: COLORS.dark }}
            ></textarea>
            <div className="flex space-x-4 items-center">
              <div 
                className="px-4 py-2 font-mono text-xl tracking-widest rounded-lg select-none" 
                style={{ backgroundColor: COLORS.light, color: COLORS.dark }}
              >
                {captchaValue}
              </div>
              <input
                type="text"
                value={captchaInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCaptchaInput(e.target.value)}
                placeholder="Enter Code"
                maxLength={4}
                required
                className="flex-grow p-3 rounded-xl border-2 focus:border-red-600 focus:ring-0"
                style={{ borderColor: COLORS.light, color: COLORS.dark }}
              />
            </div>
            <AccentButton type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
            </AccentButton>
          </form>
          <div className="flex flex-col space-y-6">
            <img 
              src="https://placehold.co/800x600/2a3443/e6e6e6?text=Ready+to+Ship+Vehicle" 
              alt="Car next to Contact Form" 
              className="w-full h-auto object-cover rounded-3xl shadow-xl flex-grow"
            />
            <AccentButton onClick={openWhatsApp} className="w-full flex items-center justify-center space-x-2"
              style={{ backgroundColor: '#25D366' }}
            >
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.52 3.42 1.51 4.86l-1.57 5.75 5.86-1.53c1.37.75 2.91 1.14 4.11 1.14h.01c5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm0 18.06c-1.35 0-2.73-.39-3.96-1.14l-.28-.15-2.92.76.77-2.83-.18-.29c-.64-1.03-.98-2.2-.98-3.41 0-4.52 3.69-8.21 8.21-8.21 4.52 0 8.21 3.69 8.21 8.21s-3.69 8.21-8.21 8.21zm4.84-6.85l-.26-.14c-.81-.4-1.19-.6-1.63-.83-.16-.08-.3-.15-.43-.2-.3-.11-.63-.2-.93-.2s-.88.11-1.34.56c-.53.51-.81.67-1.11.96-.34.34-.69.34-1.3.16-.94-.28-2.09-.84-3.05-1.92-.78-.85-1.32-1.93-1.68-2.98-.18-.54-.05-.84.09-.96s.33-.29.49-.44c.16-.16.34-.37.5-.54.16-.18.23-.33.34-.51.11-.18.17-.38.23-.52.06-.15.03-.28-.01-.39s-.35-.27-.7-.67c-.32-.38-.69-.9-.94-1.18-.21-.24-.46-.46-.66-.69s-.42-.37-.73-.37c-.31 0-.67.09-1.02.43-.37.37-.8.95-.8 1.83 0 .76.28 1.48.56 2.05.37.75.76 1.41 1.25 1.95 1.09 1.19 2.37 2.08 3.77 2.68 1.25.53 2.52.82 3.7.82.95 0 1.63-.26 2.21-.49.77-.32 1.54-.93 2.08-1.57.19-.24.34-.51.46-.8.12-.29.18-.59.18-.89 0-.4-.14-.7-.28-.84z"/></svg>
              <span>WhatsApp Us Now</span>
            </AccentButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
