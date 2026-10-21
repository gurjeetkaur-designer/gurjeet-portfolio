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
    'I create festive campaigns, social media creatives, wedding stationery, logos and hand-crafted fashion illustrations — bringing colour, culture and a little sparkle to every brand and celebration I design for.',

  // Profile photo. To add one: put the image in src/assets/ (e.g. profile.webp),
  // then:  import photo from '../assets/profile.webp';  and set  photo: photo
  // While this is null, an elegant "GK" monogram is shown instead.
  photo: null,

  about: {
    heading: 'Design rooted in culture, crafted with care.',
    paragraphs: [
      'I’m a graphic designer who loves turning moments into visuals — from Diwali and Baisakhi campaigns for a fine-jewellery brand to playful bridal-entry boards, wedding contracts and custom monograms for couples.',
      'My work moves between polished brand creatives and warm, hand-drawn illustration. I enjoy working with both English and Devanagari typography, rich festive palettes and thoughtful layouts that feel premium on screen and in print.',
      // Placeholder — replace with your own background, experience and goals.
      '[Add a few lines about your background, years of experience, what inspires you and the kind of projects or roles you’re looking for next.]',
    ],
    interests: ['Festive & cultural design', 'Fashion illustration', 'Typography', 'Wedding stationery'],
  },

  contact: {
    email: '', // e.g. 'hello@example.com'
    phone: '', // optional
    location: '', // e.g. 'Punjab, India'
    // Optional Formspree-style endpoint (https://formspree.io/f/xxxx). When set,
    // the contact form posts here. Otherwise it falls back to opening the
    // visitor's email app (if `email` is set).
    formEndpoint: '',
  },

  // Supported icons: instagram, linkedin, behance, dribbble, github, website
  // e.g. { platform: 'instagram', label: 'Instagram', url: 'https://instagram.com/yourhandle' }
  socials: [],
};
