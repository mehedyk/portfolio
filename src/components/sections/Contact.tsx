import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SiHackerrank, SiCodeforces, SiLeetcode } from 'react-icons/si';

export const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent!',
      description: 'Thanks for reaching out. I\'ll get back to you soon!',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="min-h-screen py-20 relative" ref={ref}>
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">
            GET IN TOUCH
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-muted-foreground font-body">
            Let's build something amazing together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-heading text-primary mb-6">
                Let's Connect
              </h3>
              <p className="text-muted-foreground font-body text-lg mb-8">
                Have a project in mind? Need a security audit? Or just want to chat about tech? 
                I'm always open to discussing new opportunities and collaborations.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'kawser2305341202@diu.edu.bd' },
                { icon: Phone, label: 'Phone', value: 'Just Use any other media for now' },
                { icon: MapPin, label: 'Location', value: 'Dhaka, Bangladesh' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-ui">{item.label}</p>
                    <p className="text-foreground font-body">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <p className="text-sm text-muted-foreground font-ui mb-4">Follow me on</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Github, url: 'https://github.com/mehedyk', label: 'GitHub' },
                  { icon: Linkedin, url: 'https://www.linkedin.com/in/mehedyk/', label: 'LinkedIn' },
                  { icon: Twitter, url: 'https://x.com/MahdiKawser', label: 'Twitter/X' },
                  { icon: SiHackerrank, url: 'https://www.hackerrank.com/profile/mehedyk', label: 'HackerRank' },
                  { icon: SiCodeforces, url: 'https://codeforces.com/profile/mehedyk', label: 'Codeforces' },
                  { icon: SiLeetcode, url: 'https://leetcode.com/u/mehedyk/', label: 'LeetCode' },
                  { icon: Instagram, url: 'https://www.instagram.com/mahdi_kawser/', label: 'Instagram' },
                  { icon: Facebook, url: 'https://www.facebook.com/mahdi.kawser', label: 'Facebook' },
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
                    className="w-12 h-12 rounded-lg border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5 text-primary" />
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
          >
            <div className="backdrop-blur-cyber border border-primary/30 rounded-xl p-8 hover:border-glow transition-all">
              {/* Terminal Header */}
              <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-primary/20">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm font-ui text-muted-foreground ml-4">
                  ~/contact-terminal
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-ui text-primary mb-2">
                    <span className="text-secondary">$</span> name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="John Doe"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-ui text-primary mb-2">
                    <span className="text-secondary">$</span> email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="john@example.com"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-ui text-primary mb-2">
                    <span className="text-secondary">$</span> message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Your message here..."
                    rows={6}
                    className="bg-background/50 border-primary/30 focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-glow group"
                  size="lg"
                >
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>

              <p className="text-xs text-muted-foreground font-body mt-4 text-center">
                <span className="text-primary">{'>'}</span> Message will be sent securely_
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
