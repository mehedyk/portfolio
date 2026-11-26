import { profile } from '@/data';

/** @type {import('next').Metadata} */
export const rootMetadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    template: `%s | ${profile.fullName}`,
    default: profile.metaTitle,
  },
  description: profile.metaDescription,
  generator: profile.fullName,
  applicationName: profile.fullName,
  referrer: 'origin-when-cross-origin',
  keywords: ['Design', 'Development', 'Portfolio'],
  authors: [{ name: profile.fullName, url: profile.siteUrl }],
  creator: profile.fullName,
  publisher: profile.fullName,
  twitter: {
    card: 'summary_large_image',
    title: profile.fullName,
    description: profile.metaDescription,
    creator: profile.socialHandle,
    images: {
      url: `${profile.siteUrl}screenshot.png`,
      alt: 'Portfolio Screenshot',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
