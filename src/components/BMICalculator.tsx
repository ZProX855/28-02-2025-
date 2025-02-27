
import React, { useState } from 'react';
import { calculateBMI } from '../services/api';
import { HeartPulse, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface BMIResult {
  bmi: string;
  category: string;
  advice: string;
}

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [animateResult, setAnimateResult] = useState(false);

  const handleCalculate = () => {
    if (height === '' || weight === '') {
      toast.error('Please enter both height and weight');
      return;
    }
    
    if (typeof height === 'number' && typeof weight === 'number') {
      if (height <= 0 || weight <= 0) {
        toast.error('Height and weight must be positive values');
        return;
      }
      
      setAnimateResult(false);
      // Small delay for animation effect when recalculating
      setTimeout(() => {
        const bmiResult = calculateBMI(height, weight);
        setResult(bmiResult);
        setAnimateResult(true);
      }, 100);
    }
  };

  const getBMICategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'text-amber-500';
      case 'Normal weight':
        return 'text-green-500';
      case 'Overweight':
        return 'text-amber-600';
      case 'Obese':
        return 'text-red-500';
      default:
        return 'text-wellness-darkGreen';
    }
  };

  const renderBMIScale = () => {
    const categories = [
      { label: 'Underweight', range: '< 18.5', color: 'bg-amber-500' },
      { label: 'Normal', range: '18.5 - 24.9', color: 'bg-green-500' },
      { label: 'Overweight', range: '25 - 29.9', color: 'bg-amber-600' },
      { label: 'Obese', range: '≥ 30', color: 'bg-red-500' },
    ];
    
    return (
      <div className="mt-6 p-4 bg-white bg-opacity-70 rounded-xl border border-wellness-softGreen/30">
        <h3 className="text-wellness-darkGreen font-medium mb-3">BMI Categories</h3>
        <div className="flex h-6 rounded-full overflow-hidden mb-2">
          {categories.map((category, index) => (
            <div key={index} className={`${category.color} flex-1`}></div>
          ))}
        </div>
        <div className="flex justify-between">
          {categories.map((category, index) => (
            <div key={index} className="text-xs text-center px-1">
              <div className={`h-3 w-3 ${category.color} rounded-full mx-auto mb-1`}></div>
              <div>{category.label}</div>
              <div className="font-medium">{category.range}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel p-6">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <label className="block text-wellness-darkGreen font-medium mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Enter height in cm"
            className="input-field w-full"
            min="0"
          />
        </div>
        <div className="flex-1">
          <label className="block text-wellness-darkGreen font-medium mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Enter weight in kg"
            className="input-field w-full"
            min="0"
          />
        </div>
      </div>
      
      <button
        onClick={handleCalculate}
        className="btn-primary rounded-lg w-full mb-6 flex items-center justify-center gap-2"
      >
        <HeartPulse className="h-5 w-5" />
        Calculate BMI
      </button>
      
      {renderBMIScale()}
      
      {result && (
        <div className={`mt-6 overflow-hidden ${animateResult ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="bg-white bg-opacity-80 rounded-xl p-5 shadow-sm border border-wellness-softGreen">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-wellness-darkGreen">{result.bmi}</div>
              <div className={`text-xl font-medium ${getBMICategoryColor(result.category)}`}>
                {result.category}
              </div>
            </div>
            
            <div className="p-4 bg-wellness-softGreen/30 rounded-lg">
              <h4 className="font-medium text-wellness-darkGreen mb-2 flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Personalized Advice
              </h4>
              <p className="text-wellness-charcoal whitespace-pre-line text-sm">{result.advice}</p>
            </div>
            
            <div className="mt-4 text-xs text-wellness-charcoal/70 text-center">
              This is a general guideline. For personalized health advice, please consult a healthcare professional.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
