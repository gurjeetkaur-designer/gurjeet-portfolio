import { Check, Mail, MapPin, Phone } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import { profile } from '../data/profile.js';
import { skills } from '../data/skills.js';

export default function Contact() {
  const { email, phone, location } = profile.contact;

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
          intro="Have a campaign, a wedding or a brand that needs a designer’s touch? Get in touch and tell me about it."
        />

        <Reveal className="contact__info">
          <div>
            <h3>Work with me</h3>
            <p>
              I’m happy to talk about social media creatives, reels and motion graphics, wedding and event invitations,
              logos and custom illustrations.
            </p>
            <ul className="contact__services">
              {skills.slice(0, 5).map(({ title }) => (
                <li key={title}>
                  <Check size={16} aria-hidden="true" /> {title}
                </li>
              ))}
            </ul>
          </div>

          <div>
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
