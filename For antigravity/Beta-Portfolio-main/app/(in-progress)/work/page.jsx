import { InProgress } from '@/components';
import { profile } from '@/data';
import { Transition } from '@/layout';

/** @type {import('next').Metadata} */
export const metadata = {
  title: `Work | ${profile.fullName}`,
  description: profile.metaDescription,
};

export default function Work() {
  return (
    <Transition>
      <InProgress>Work</InProgress>
    </Transition>
  );
}
