import { Dribbble, Github, Globe, Instagram, Linkedin, Mail, PenTool } from 'lucide-react';
import { profile } from '../data/profile.js';

const icons = {
  instagram: Instagram,
  linkedin: Linkedin,
  behance: PenTool,
  dribbble: Dribbble,
  github: Github,
  website: Globe,
};

// Renders nothing when no socials or email have been configured.
export default function SocialLinks({ includeEmail = false, className = '' }) {
  const { socials, contact } = profile;
  const showEmail = includeEmail && contact.email;
  if (socials.length === 0 && !showEmail) return null;

  return (
    <ul className={`social-links ${className}`}>
      {socials.map(({ platform, label, url }) => {
        const Icon = icons[platform] ?? Globe;
        return (
          <li key={url}>
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon size={18} aria-hidden="true" />
            </a>
          </li>
        );
      })}
      {showEmail && (
        <li>
          <a href={`mailto:${contact.email}`} aria-label={`Email ${profile.name}`}>
            <Mail size={18} aria-hidden="true" />
          </a>
        </li>
      )}
    </ul>
  );
}
