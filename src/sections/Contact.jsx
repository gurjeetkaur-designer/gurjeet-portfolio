import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import { profile } from '../data/profile.js';
import { skills } from '../data/skills.js';

const emptyForm = { name: '', email: '', subject: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.subject.trim().length < 3) errors.subject = 'Please add a short subject.';
  if (values.message.trim().length < 10) errors.message = 'Your message should be at least 10 characters.';
  return errors;
}

async function sendMessage(values) {
  const { formEndpoint, email } = profile.contact;

  if (formEndpoint) {
    const res = await fetch(formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error('Something went wrong while sending. Please try again.');
    return 'Thank you! Your message has been sent — I’ll get back to you soon.';
  }

  if (email) {
    const body = `${values.message}\n\n— ${values.name} (${values.email})`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
    return 'Your email app should now open with the message ready to send.';
  }

  throw new Error('The contact form isn’t connected yet. Please reach out through another channel for now.');
}

function Field({ id, label, error, as = 'input', ...props }) {
  const Component = as;
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <Component id={id} name={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error && (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const { email, phone, location } = profile.contact;

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' });
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setStatus({ type: 'loading', message: '' });
    try {
      const message = await sendMessage(values);
      setStatus({ type: 'success', message });
      setValues(emptyForm);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  const details = [
    email && { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    phone && { icon: Phone, label: 'Phone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
    location && { icon: MapPin, label: 'Based in', value: location },
  ].filter(Boolean);

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Let’s create something beautiful"
          intro="Have a campaign, a wedding or a brand that needs a designer’s touch? Send a message and tell me about it."
        />

        <div className="contact__grid">
          <Reveal className="contact__info">
            <h3>Work with me</h3>
            <p>
              I’m happy to talk about festive campaigns, social media design, wedding stationery, logos and custom
              illustrations.
            </p>
            <ul className="contact__services">
              {skills.slice(0, 5).map(({ title }) => (
                <li key={title}>
                  <Check size={16} aria-hidden="true" /> {title}
                </li>
              ))}
            </ul>
            {details.length > 0 && (
              <ul className="contact__details">
                {details.map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    <span className="contact__icon">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span>
                      <small>{label}</small>
                      {href ? <a href={href}>{value}</a> : value}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <SocialLinks />
          </Reveal>

          <Reveal as="form" className="contact__form" delay={0.1} onSubmit={onSubmit} noValidate>
            <div className="contact__row">
              <Field id="name" label="Name" value={values.name} onChange={onChange} error={errors.name} autoComplete="name" required />
              <Field id="email" label="Email" type="email" value={values.email} onChange={onChange} error={errors.email} autoComplete="email" required />
            </div>
            <Field id="subject" label="Subject" value={values.subject} onChange={onChange} error={errors.subject} required />
            <Field id="message" label="Message" as="textarea" rows={5} value={values.message} onChange={onChange} error={errors.message} required />

            <button type="submit" className="btn btn--primary" disabled={status.type === 'loading'}>
              {status.type === 'loading' ? (
                <>
                  <Loader2 size={18} className="spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  Send message <Send size={18} aria-hidden="true" />
                </>
              )}
            </button>

            <div aria-live="polite">
              <AnimatePresence>
                {(status.type === 'success' || status.type === 'error') && (
                  <motion.p
                    key={status.message}
                    className={`form-status form-status--${status.type}`}
                    role={status.type === 'error' ? 'alert' : 'status'}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {status.type === 'success' ? <CheckCircle2 size={18} aria-hidden="true" /> : <AlertCircle size={18} aria-hidden="true" />}
                    {status.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
