import { Center } from '@/components';
import { profile } from '@/data';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'Not found',
  description: profile.metaDescription,
};

export default function NotFound() {
  return (
    <Center as='main' className='min-h-screen bg-foreground text-background'>
      <h1 className='text-[clamp(4rem,12vw,12rem)]'>404</h1>
    </Center>
  );
}
