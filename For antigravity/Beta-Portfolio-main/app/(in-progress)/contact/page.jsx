import { InProgress } from '@/components';
import { profile } from '@/data';
import { Transition } from '@/layout';

/** @type {import('next').Metadata} */
export const metadata = {
  title: `Contact | ${profile.fullName}`,
  description: profile.metaDescription,
};

export default function Contact() {
  return (
    <Transition>
      <InProgress>Contact</InProgress>
    </Transition>
  );
}
