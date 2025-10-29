import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO at TechCorp',
    content: 'Kawser\'s expertise in cybersecurity transformed our application security. His thorough penetration testing uncovered critical vulnerabilities and his solutions were both elegant and effective.',
    rating: 5,
    image: null,
  },
  {
    name: 'Michael Chen',
    role: 'Lead Developer at StartupXYZ',
    content: 'Working with Kawser on our full-stack project was incredible. His code quality is exceptional, and he brings a security-first mindset that\'s rare to find in developers.',
    rating: 5,
    image: null,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager at SecureApp',
    content: 'Kawser doesn\'t just write code—he architects solutions. His ability to balance performance, security, and user experience is outstanding. Highly recommended!',
    rating: 5,
    image: null,
  },
  {
    name: 'David Park',
    role: 'Founder at CloudSafe',
    content: 'The DevOps pipeline Kawser set up for us is rock solid. Zero downtime deployments, automated testing, and comprehensive monitoring. Best investment we\'ve made.',
    rating: 5,
    image: null,
  },
  {
    name: 'Lisa Thompson',
    role: 'Security Director at FinanceFlow',
    content: 'Kawser\'s security audit was thorough and professional. He explained complex vulnerabilities in ways our team could understand and implement fixes quickly.',
    rating: 5,
    image: null,
  },
  {
    name: 'Alex Kumar',
    role: 'Engineering Manager at DataStream',
    content: 'Exceptional problem-solving skills and deep technical knowledge. Kawser consistently delivers high-quality work and is a pleasure to collaborate with.',
    rating: 5,
    image: null,
  },
];

export const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="testimonials" className="min-h-screen py-20 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">
            TESTIMONIALS
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            What clients and colleagues say about working with me
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full backdrop-blur-cyber border-primary/30 hover:border-primary transition-all duration-300 hover:border-glow p-6 relative">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-20">
                  <Quote className="w-12 h-12 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground font-body text-sm mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-primary/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                    <span className="text-xl font-heading text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground font-ui">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
