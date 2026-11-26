import { InProgress } from '@/components';
import { profile } from '@/data';
import { Transition } from '@/layout';

/** @type {import('next').Metadata} */
export const metadata = {
  title: `About | ${profile.fullName}`,
  description: profile.metaDescription,
};

export default function About() {
  return (
    <Transition>
      <InProgress>About</InProgress>
    </Transition>
  );
}
