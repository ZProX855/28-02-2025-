
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  path,
  delay = 0 
}) => {
  return (
    <Link 
      to={path}
      className="feature-card p-6 flex flex-col items-center text-center h-full opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-16 w-16 rounded-full bg-wellness-softGreen flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-wellness-darkGreen" />
      </div>
      <h3 className="text-xl font-medium text-wellness-darkGreen mb-2">{title}</h3>
      <p className="text-wellness-charcoal text-sm">{description}</p>
    </Link>
  );
};

export default FeatureCard;
