import { profile } from '../data/profile.js';

// Shows the profile photo when one is configured, otherwise a monogram.
export default function ProfileImage({ className = '' }) {
  if (profile.photo) {
    return (
      <img
        className={`profile-image ${className}`}
        src={profile.photo}
        alt={`Portrait of ${profile.name}`}
        width="320"
        height="320"
      />
    );
  }
  return (
    <div className={`profile-image profile-image--monogram ${className}`} role="img" aria-label={`${profile.name} monogram`}>
      <span>{profile.initials}</span>
    </div>
  );
}
