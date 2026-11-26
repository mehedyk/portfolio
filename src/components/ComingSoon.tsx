import { Loader2, Hourglass } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Props { message: string }

/** Honest placeholder: no fake content, just a clear "this is on the way". */
export const ComingSoon = ({ message }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      role="status"
      className="mx-auto max-w-xl rounded-xl border border-dashed border-primary/40 bg-card/40 px-6 py-12 text-center backdrop-blur-sm"
    >
      <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-primary/20 motion-safe:animate-ping" aria-hidden="true" />
        <span className="absolute inset-2 rounded-full border border-primary/40" aria-hidden="true" />
        <Loader2 className="absolute h-20 w-20 text-primary/70 motion-safe:animate-spin [animation-duration:3s]" strokeWidth={1} aria-hidden="true" />
        <Hourglass className="h-7 w-7 text-primary" aria-hidden="true" />
      </div>
      <p className="font-heading text-2xl text-glow">
        {t('comingSoon.label')}<span className="text-primary motion-safe:animate-pulse">_</span>
      </p>
      <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{message}</p>
    </div>
  );
};
