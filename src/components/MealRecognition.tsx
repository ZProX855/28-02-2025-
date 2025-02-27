
import React, { useState, useRef } from 'react';
import { Upload, Camera, Image, X, CheckCircle } from 'lucide-react';
import { recognizeMeal } from '../services/api';
import { toast } from 'sonner';

interface MealData {
  foodIdentified: string;
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  recommendations: string;
}

const MealRecognition: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<MealData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const file = e.target.files?.[0];
    
    if (file) {
      // Check if the file is an image
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        setIsUploading(false);
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        setIsUploading(false);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setIsUploading(false);
        setResult(null); // Clear previous results
      };
      reader.readAsDataURL(file);
    } else {
      setIsUploading(false);
    }
  };
  
  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast.error('Please upload an image first');
      return;
    }
    
    setIsAnalyzing(true);
    try {
      const mealData = await recognizeMeal(selectedImage);
      setResult(mealData as MealData);
    } catch (error) {
      toast.error('Error analyzing the meal. Please try again.');
      console.error("Meal recognition error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-panel p-6">
        <div className="mb-6">
          <h3 className="text-xl font-medium text-wellness-darkGreen mb-2">AI Meal Recognition</h3>
          <p className="text-wellness-charcoal text-sm">Upload a photo of your meal to get nutritional information and personalized recommendations.</p>
        </div>
        
        {!selectedImage ? (
          <div 
            className="border-2 border-dashed border-wellness-softGreen rounded-xl p-8 text-center bg-white bg-opacity-50 mb-6"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />
            {isUploading ? (
              <div className="flex flex-col items-center justify-center h-40">
                <div className="w-10 h-10 border-4 border-wellness-mediumGreen border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-wellness-darkGreen">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="w-20 h-20 rounded-full bg-wellness-softGreen/50 flex items-center justify-center">
                  <Image className="h-10 w-10 text-wellness-darkGreen" />
                </div>
                <div>
                  <p className="text-wellness-darkGreen font-medium">Drag and drop an image here, or</p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 btn-secondary rounded-lg flex items-center justify-center gap-2 mx-auto"
                  >
                    <Upload className="h-5 w-5" />
                    Upload Image
                  </button>
                </div>
                <p className="text-sm text-wellness-charcoal/70">Supported formats: JPG, PNG, WEBP (Max: 5MB)</p>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6">
            <div className="relative rounded-xl overflow-hidden mb-4">
              <img
                src={selectedImage}
                alt="Selected meal"
                className="w-full h-auto rounded-xl max-h-80 object-cover"
              />
              <button
                onClick={handleReset}
                className="absolute top-2 right-2 bg-wellness-darkGreen text-white p-1 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {!result ? (
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="btn-primary rounded-lg w-full flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing Meal...
                  </>
                ) : (
                  <>
                    <Camera className="h-5 w-5" />
                    Analyze Meal
                  </>
                )}
              </button>
            ) : (
              <div className="animate-fade-in">
                <div className="bg-white bg-opacity-70 rounded-xl p-4 shadow-sm border border-wellness-softGreen/30 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-wellness-darkGreen" />
                    <h4 className="font-medium text-wellness-darkGreen">Identified Meal</h4>
                  </div>
                  <p className="text-wellness-charcoal mb-4">{result.foodIdentified}</p>
                  
                  <h4 className="font-medium text-wellness-darkGreen mb-2">Nutrition Information</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                    <div className="bg-wellness-softGreen/40 p-2 rounded-lg text-center">
                      <div className="text-sm text-wellness-charcoal">Calories</div>
                      <div className="font-medium text-wellness-darkGreen">{result.nutritionInfo.calories}</div>
                    </div>
                    <div className="bg-wellness-softGreen/40 p-2 rounded-lg text-center">
                      <div className="text-sm text-wellness-charcoal">Protein</div>
                      <div className="font-medium text-wellness-darkGreen">{result.nutritionInfo.protein}g</div>
                    </div>
                    <div className="bg-wellness-softGreen/40 p-2 rounded-lg text-center">
                      <div className="text-sm text-wellness-charcoal">Carbs</div>
                      <div className="font-medium text-wellness-darkGreen">{result.nutritionInfo.carbs}g</div>
                    </div>
                    <div className="bg-wellness-softGreen/40 p-2 rounded-lg text-center">
                      <div className="text-sm text-wellness-charcoal">Fats</div>
                      <div className="font-medium text-wellness-darkGreen">{result.nutritionInfo.fats}g</div>
                    </div>
                    <div className="bg-wellness-softGreen/40 p-2 rounded-lg text-center">
                      <div className="text-sm text-wellness-charcoal">Fiber</div>
                      <div className="font-medium text-wellness-darkGreen">{result.nutritionInfo.fiber}g</div>
                    </div>
                  </div>
                  
                  <div className="bg-wellness-softGreen/30 p-3 rounded-lg">
                    <h4 className="font-medium text-wellness-darkGreen mb-1">Recommendations</h4>
                    <p className="text-sm text-wellness-charcoal whitespace-pre-line">{result.recommendations}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2 px-4 bg-wellness-softGreen text-wellness-darkGreen rounded-lg hover:bg-wellness-softGreen/80 transition-colors"
                  >
                    Analyze Another Meal
                  </button>
                  <button
                    onClick={() => {
                      // In a real app, this would save the meal to the user's history
                      toast.success('Meal saved to your history!');
                    }}
                    className="flex-1 py-2 px-4 bg-wellness-darkGreen text-white rounded-lg hover:bg-wellness-darkGreen/90 transition-colors"
                  >
                    Save to History
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealRecognition;
