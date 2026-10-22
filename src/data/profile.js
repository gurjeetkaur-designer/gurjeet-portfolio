/**
 * Personal details used across the site.
 * Anything left empty ('' or []) is hidden automatically, so the site never
 * shows invented contact details. Fill these in as information becomes available.
 */
export const profile = {
  name: 'Gurjeet Kaur',
  shortName: 'Gurjeet',
  initials: 'GK',
  role: 'Graphic Designer & Illustrator',

  tagline: 'Designs that celebrate every occasion.',
  intro:
    'I create social media creatives, reels and motion graphics, 2D & 3D wedding invitations, logos and hand-crafted illustrations — bringing colour, culture and a little sparkle to every brand and celebration I design for.',

  // Profile photo. To add one: put the image in src/assets/ (e.g. profile.webp),
  // then:  import photo from '../assets/profile.webp';  and set  photo: photo
  // While this is null, an elegant "GK" monogram is shown instead.
  photo: null,

  about: {
    heading: 'Design rooted in culture, crafted with care.',
    paragraphs: [
      'I’m a graphic designer who loves turning moments into visuals — from Diwali and Baisakhi campaigns for a fine-jewellery brand to playful bridal-entry boards, wedding contracts and custom monograms for couples.',
      'My work moves between polished brand creatives and warm, hand-drawn illustration. I enjoy working with both English and Devanagari typography, rich festive palettes and thoughtful layouts that feel premium on screen and in print.',
      'I spent over three years as a graphic designer at Uimatic in Mohali, creating social media campaigns, reels, motion graphics and invitations for a range of clients. Today I work across Adobe Photoshop, Illustrator and After Effects, and use AI tools to explore ideas faster without losing the handcrafted touch.',
    ],
    interests: ['Festive & cultural design', 'Fashion illustration', 'Typography', 'Wedding stationery'],
  },

  contact: {
    email: 'gurjeetpawar82@gmail.com',
    phone: '+91 79867 12754',
    location: 'Punjab, India',
  },

  // Supported icons: instagram, linkedin, behance, dribbble, github, website
  // e.g. { platform: 'instagram', label: 'Instagram', url: 'https://instagram.com/yourhandle' }
  socials: [],
};
