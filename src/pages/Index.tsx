
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { MessageSquare, Apple, ActivitySquare, Camera, Target, HeartPulse } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay for a smoother entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const features = [
    { 
      title: 'AI Nutrition Assistant',
      description: 'Chat with our AI for personalized nutrition advice',
      icon: MessageSquare,
      color: 'from-emerald-100 to-emerald-200',
      path: '/chat-assistant',
      delay: 100
    },
    { 
      title: 'Food Comparison',
      description: 'Compare the nutritional value of different foods',
      icon: Apple,
      color: 'from-amber-100 to-amber-200',
      path: '/food-compare',
      delay: 200
    },
    { 
      title: 'BMI Calculator',
      description: 'Calculate your BMI and get personalized advice',
      icon: HeartPulse,
      color: 'from-rose-100 to-rose-200',
      path: '/bmi-calculator',
      delay: 300
    },
    { 
      title: 'Meal Recognition',
      description: 'Upload a photo of your meal for nutritional analysis',
      icon: Camera,
      color: 'from-blue-100 to-blue-200',
      path: '/meal-recognition',
      delay: 400
    },
    { 
      title: 'Wellness Journey',
      description: 'Set goals and get a personalized wellness plan',
      icon: Target,
      color: 'from-purple-100 to-purple-200',
      path: '/wellness-journey',
      delay: 500
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-wellness-softBeige to-wellness-softGreen/30">
      <Header />
      
      <main className="pt-24 pb-16 px-4 sm:px-6">
        {/* Hero Section */}
        <section className={`max-w-5xl mx-auto text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-6">
            <img 
              src="/lovable-uploads/0f3b37c0-5eca-43f3-9f19-60f760335d8d.png" 
              alt="Wellness Tracker Logo" 
              className="h-28 w-auto mx-auto animate-scale-in-out"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium text-wellness-darkGreen mb-4">
            Your AI-Powered<br />Wellness Companion
          </h1>
          <p className="text-xl text-wellness-charcoal max-w-2xl mx-auto mb-12">
            Track your nutrition, monitor your health, and achieve your wellness goals with our smart, AI-powered tools.
          </p>
          
          {/* Feature Circle Navigation */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <button
                  onClick={() => navigate(feature.path)}
                  className="circle-feature h-28 w-28 sm:h-32 sm:w-32 flex-col text-center p-2"
                >
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-2`}>
                    <feature.icon className="h-6 w-6 text-wellness-darkGreen" />
                  </div>
                  <span className="text-sm font-medium text-wellness-darkGreen">
                    {feature.title}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </section>
        
        {/* Key Benefits Section */}
        <section className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-medium text-wellness-darkGreen text-center mb-12">Why Choose Wellness Tracker?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Personalized Insights',
                description: 'Get tailored nutrition advice and health recommendations based on your unique needs and goals.',
                icon: <ActivitySquare className="h-8 w-8 text-wellness-darkGreen" />,
                delay: 200
              },
              {
                title: 'AI-Powered Analysis',
                description: 'Our advanced AI analyzes your data to provide accurate nutritional information and actionable advice.',
                icon: <HeartPulse className="h-8 w-8 text-wellness-darkGreen" />,
                delay: 300
              },
              {
                title: 'Holistic Approach',
                description: 'We look at the whole picture of your health, not just calories or weight, to support your complete wellness journey.',
                icon: <Target className="h-8 w-8 text-wellness-darkGreen" />,
                delay: 400
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-wellness-softGreen/30 shadow-sm opacity-0 animate-fade-in"
                style={{ animationDelay: `${benefit.delay}ms` }}
              >
                <div className="h-14 w-14 rounded-full bg-wellness-softGreen/50 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-medium text-wellness-darkGreen mb-2">{benefit.title}</h3>
                <p className="text-wellness-charcoal">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="max-w-3xl mx-auto mt-20 text-center opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-2xl p-8 border border-wellness-softGreen/30 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-medium text-wellness-darkGreen mb-4">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-wellness-charcoal mb-6">
              Explore our AI-powered tools and take the first step towards a healthier, happier you.
            </p>
            <button
              onClick={() => navigate('/wellness-journey')}
              className="btn-primary rounded-lg px-8 py-4 text-lg"
            >
              Create Your Wellness Plan
            </button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white bg-opacity-60 backdrop-blur-sm border-t border-wellness-softGreen/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <img 
            src="/lovable-uploads/0f3b37c0-5eca-43f3-9f19-60f760335d8d.png" 
            alt="Wellness Tracker Logo" 
            className="h-10 w-auto mx-auto mb-4"
          />
          <p className="text-wellness-charcoal text-sm">
            © {new Date().getFullYear()} Wellness Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
