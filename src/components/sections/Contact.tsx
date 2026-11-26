import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Instagram, Facebook, FileDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SiHackerrank, SiCodeforces, SiLeetcode, SiX } from 'react-icons/si';
import { SITE } from '@/config/site';
import { sendContact } from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';

export const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    const ok = await sendContact(formData);
    setSending(false);

    if (ok) {
      toast({ title: t('contact.sent') });
      setFormData({ name: '', email: '', message: '', website: '' });
      return;
    }
    // Never lose a message: if the server is unreachable, fall back to the visitor's mail app.
    toast({ title: t('contact.failed'), variant: 'destructive' });
    const subject = encodeURIComponent(`Portfolio contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="min-h-screen py-12 sm:py-16 lg:py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading mb-3 sm:mb-4 text-glow">
            {t('contact.title')}
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-4 sm:mb-8" />
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-body px-4">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-heading text-primary mb-4 sm:mb-6">
                {t('contact.connect')}
              </h3>
              <p className="text-muted-foreground font-body text-base sm:text-lg mb-6 sm:mb-8">
                {t('contact.description')}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {[
                { icon: Mail, labelKey: 'contact.email', value: SITE.email, href: `mailto:${SITE.email}`, download: false },
                { icon: MapPin, labelKey: 'contact.location', value: SITE.location, href: null, download: false },
                { icon: FileDown, labelKey: 'contact.resume', value: 'Download CV (PDF)', href: SITE.cvUrl, download: true },
              ].map((item, index) => (
                <motion.a
                  key={item.labelKey}
                  href={item.href || undefined}
                  download={item.download ? SITE.cvFileName : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`flex items-center space-x-4 group ${item.href ? 'cursor-pointer' : ''}`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground font-ui">{t(item.labelKey)}</p>
                    <p className="text-sm sm:text-base text-foreground font-body truncate">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6 sm:pt-8">
              <p className="text-xs sm:text-sm text-muted-foreground font-ui mb-3 sm:mb-4">{t('contact.followMe')}</p>
              <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
                {[
                  { icon: Github, url: SITE.social.github, label: 'GitHub' },
                  { icon: Linkedin, url: SITE.social.linkedin, label: 'LinkedIn' },
                  { icon: SiX, url: SITE.social.x, label: 'X (Twitter)' },
                  { icon: SiHackerrank, url: SITE.social.hackerrank, label: 'HackerRank' },
                  { icon: SiCodeforces, url: SITE.social.codeforces, label: 'Codeforces' },
                  { icon: SiLeetcode, url: SITE.social.leetcode, label: 'LeetCode' },
                  { icon: Instagram, url: SITE.social.instagram, label: 'Instagram' },
                  { icon: Facebook, url: SITE.social.facebook, label: 'Facebook' },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
                    title={social.label}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Terminal-style Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full"
          >
            <div className="backdrop-blur-cyber border border-primary/30 rounded-xl p-4 sm:p-6 lg:p-8 hover:border-glow transition-all">
              {/* Terminal Header */}
              <div className="flex items-center space-x-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-primary/20">
                <div className="flex space-x-1.5 sm:space-x-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs sm:text-sm font-ui text-muted-foreground ml-2 sm:ml-4">
                  {t('contact.terminal')}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Honeypot: invisible to people, irresistible to form-filling bots. Must stay empty. */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                  <label>Website <input tabIndex={-1} autoComplete="off" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} /></label>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-ui text-primary mb-1.5 sm:mb-2">
                    <span className="text-secondary">$</span> {t('contact.name')}
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="John Doe"
                    className="bg-background/50 border-primary/30 focus:border-primary text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-ui text-primary mb-1.5 sm:mb-2">
                    <span className="text-secondary">$</span> {t('contact.email')}
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    maxLength={200}
                    autoComplete="email"
                    placeholder="john@example.com"
                    className="bg-background/50 border-primary/30 focus:border-primary text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-ui text-primary mb-1.5 sm:mb-2">
                    <span className="text-secondary">$</span> {t('contact.message')}
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    minLength={10}
                    maxLength={4000}
                    placeholder="Your message here..."
                    rows={5}
                    className="bg-background/50 border-primary/30 focus:border-primary resize-none text-sm sm:text-base"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-glow group"
                  size="lg"
                  disabled={sending}
                >
                  {sending
                    ? <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                    : <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />}
                  {sending ? t('contact.sending') : t('contact.send')}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground font-body mt-4 text-center">
                <span className="text-primary">{'>'}</span> {t('contact.secure')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};