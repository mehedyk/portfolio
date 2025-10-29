import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Briefcase, Award, Code } from 'lucide-react';

const timelineEvents = [
  {
    year: '2024',
    title: 'Senior Software Engineering Student',
    organization: 'University Name',
    description: 'Specializing in cybersecurity and full-stack development. Leading multiple academic projects focused on secure application development.',
    icon: GraduationCap,
    type: 'education',
  },
  {
    year: '2023',
    title: 'Security Research Intern',
    organization: 'Tech Company',
    description: 'Conducted penetration testing on web applications, identified critical vulnerabilities, and implemented security patches.',
    icon: Briefcase,
    type: 'work',
  },
  {
    year: '2023',
    title: 'Hackathon Champion',
    organization: 'National Cybersecurity Challenge',
    description: 'Led team to first place by developing an AI-powered threat detection system in 48 hours.',
    icon: Award,
    type: 'achievement',
  },
  {
    year: '2022',
    title: 'Open Source Contributor',
    organization: 'Various Projects',
    description: 'Started contributing to major open-source security tools and frameworks, improving code quality and adding features.',
    icon: Code,
    type: 'achievement',
  },
  {
    year: '2021',
    title: 'Started Software Engineering',
    organization: 'University Name',
    description: 'Began the journey into software engineering with a focus on building secure and scalable applications.',
    icon: GraduationCap,
    type: 'education',
  },
];

export const Timeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="timeline" className="min-h-screen py-20 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 matrix-bg opacity-5" />
      
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">
            MY JOURNEY
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-muted-foreground font-body">
            The path from curiosity to mastery
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-primary hidden md:block" />

          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-16 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="backdrop-blur-cyber border border-primary/30 rounded-xl p-6 hover:border-glow transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-heading text-primary">
                        {event.year}
                      </span>
                      <Badge className={`${
                        event.type === 'education' ? 'bg-blue-500/20 text-blue-400' :
                        event.type === 'work' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {event.type}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-heading mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-secondary font-ui text-sm mb-3">
                      {event.organization}
                    </p>
                    <p className="text-muted-foreground font-body text-sm">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Icon Circle */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 hidden md:flex">
                  <event.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Spacer for alignment */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-ui ${className}`}>
      {children}
    </span>
  );
}
