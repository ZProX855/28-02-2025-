
// This is a mock API service that simulates the integration with Google Gemini API
// In a real application, this would be handled via a secure backend to protect API keys

interface AIResponse {
  text: string;
  loading: boolean;
  error: string | null;
}

// Mock food database
export const foodDatabase = {
  proteins: [
    { name: 'Chicken Breast', calories: 165, protein: 31, fats: 3.6, carbs: 0, fiber: 0 },
    { name: 'Ground Beef (80% lean)', calories: 250, protein: 20, fats: 20, carbs: 0, fiber: 0 },
    { name: 'Tofu', calories: 76, protein: 8, fats: 4.5, carbs: 2, fiber: 0.5 },
    { name: 'Salmon', calories: 206, protein: 22, fats: 13, carbs: 0, fiber: 0 },
    { name: 'Lentils', calories: 116, protein: 9, fats: 0.4, carbs: 20, fiber: 8 },
    { name: 'Eggs', calories: 155, protein: 13, fats: 11, carbs: 1, fiber: 0 },
  ],
  carbs: [
    { name: 'White Rice', calories: 130, protein: 2.7, fats: 0.3, carbs: 28, fiber: 0.4 },
    { name: 'Quinoa', calories: 120, protein: 4.4, fats: 1.9, carbs: 21, fiber: 2.8 },
    { name: 'Oats', calories: 389, protein: 16.9, fats: 6.9, carbs: 66, fiber: 10.6 },
    { name: 'Whole Grain Bread', calories: 69, protein: 3.6, fats: 1, carbs: 12, fiber: 1.9 },
    { name: 'Pasta', calories: 158, protein: 5.8, fats: 0.9, carbs: 31, fiber: 1.8 },
    { name: 'Sweet Potato', calories: 86, protein: 1.6, fats: 0.1, carbs: 20, fiber: 3 },
  ],
  fats: [
    { name: 'Avocado', calories: 160, protein: 2, fats: 15, carbs: 9, fiber: 7 },
    { name: 'Almonds', calories: 579, protein: 21, fats: 50, carbs: 22, fiber: 12.5 },
    { name: 'Cheese (Cheddar)', calories: 402, protein: 25, fats: 33, carbs: 1.3, fiber: 0 },
    { name: 'Butter', calories: 717, protein: 0.9, fats: 81, carbs: 0.1, fiber: 0 },
    { name: 'Olive Oil', calories: 884, protein: 0, fats: 100, carbs: 0, fiber: 0 },
    { name: 'Peanut Butter', calories: 588, protein: 25, fats: 50, carbs: 20, fiber: 6 },
  ],
  fruits: [
    { name: 'Banana', calories: 89, protein: 1.1, fats: 0.3, carbs: 23, fiber: 2.6 },
    { name: 'Apple', calories: 52, protein: 0.3, fats: 0.2, carbs: 14, fiber: 2.4 },
    { name: 'Strawberries', calories: 32, protein: 0.7, fats: 0.3, carbs: 7.7, fiber: 2 },
    { name: 'Mango', calories: 60, protein: 0.8, fats: 0.4, carbs: 15, fiber: 1.6 },
    { name: 'Blueberries', calories: 57, protein: 0.7, fats: 0.3, carbs: 14, fiber: 2.4 },
    { name: 'Orange', calories: 47, protein: 0.9, fats: 0.1, carbs: 12, fiber: 2.4 },
  ],
  vegetables: [
    { name: 'Spinach', calories: 23, protein: 2.9, fats: 0.4, carbs: 3.6, fiber: 2.2 },
    { name: 'Broccoli', calories: 34, protein: 2.8, fats: 0.4, carbs: 7, fiber: 2.6 },
    { name: 'Carrots', calories: 41, protein: 0.9, fats: 0.2, carbs: 10, fiber: 2.8 },
    { name: 'Bell Peppers', calories: 31, protein: 1, fats: 0.3, carbs: 6, fiber: 2.1 },
    { name: 'Kale', calories: 49, protein: 4.3, fats: 0.9, carbs: 8.8, fiber: 3.6 },
    { name: 'Cauliflower', calories: 25, protein: 1.9, fats: 0.3, carbs: 5, fiber: 2 },
  ]
};

// Helper function to get all foods
export const getAllFoods = () => {
  const allCategories = Object.values(foodDatabase);
  return allCategories.flat();
};

// Mock AI Nutrition Assistant responses
export const getChatResponse = async (message: string): Promise<AIResponse> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a contextual response based on the message
      let response = '';
      
      if (message.toLowerCase().includes('calorie') || message.toLowerCase().includes('calories')) {
        response = "🍎 Calories are just one part of nutrition! Focus on nutrient-dense foods rather than just calorie counting.\n\n• Whole foods generally provide more nutrients than processed ones\n• Protein and fiber help you feel full longer\n• Healthy fats are essential for brain health\n\nRecommendation: Track food quality, not just quantity! 🥑";
      } else if (message.toLowerCase().includes('protein')) {
        response = "💪 Protein is essential for muscle repair and growth!\n\n• Aim for 0.8-1g per kg of body weight daily\n• Include variety of sources: animal and plant-based\n• Spread intake throughout the day for optimal absorption\n\nRecommendation: Add a protein source to each meal! 🥚🐟🥜";
      } else if (message.toLowerCase().includes('weight loss') || message.toLowerCase().includes('lose weight')) {
        response = "⚖️ Sustainable weight loss is about lifestyle changes, not quick fixes!\n\n• Create a moderate calorie deficit (300-500 calories/day)\n• Increase protein intake to preserve muscle mass\n• Stay hydrated and get enough sleep\n• Regular physical activity is key\n\nRecommendation: Focus on progress, not perfection! 🌱";
      } else if (message.toLowerCase().includes('carb') || message.toLowerCase().includes('carbs')) {
        response = "🍚 Carbohydrates are your body's primary energy source!\n\n• Choose complex carbs like whole grains, fruits and vegetables\n• Fiber-rich carbs help regulate blood sugar\n• Timing carbs around workouts can improve performance\n\nRecommendation: Don't fear carbs - choose quality sources! 🍠🍎";
      } else {
        response = "🥦 Balanced nutrition is key to overall wellness!\n\n• Eat a rainbow of colorful vegetables and fruits daily\n• Stay hydrated with water as your primary beverage\n• Include a balance of protein, healthy fats, and complex carbs\n• Mindful eating helps prevent overeating\n\nRecommendation: Small, consistent habits lead to big results! 💧🥗";
      }
      
      resolve({
        text: response,
        loading: false,
        error: null
      });
    }, 1000); // Simulate network delay
  });
};

// Mock food comparison function
export const compareFoods = async (food1: string, food2: string, quantity1: number = 100, quantity2: number = 100) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const allFoods = getAllFoods();
      const food1Data = allFoods.find(food => food.name.toLowerCase() === food1.toLowerCase());
      const food2Data = allFoods.find(food => food.name.toLowerCase() === food2.toLowerCase());
      
      if (!food1Data || !food2Data) {
        resolve({
          error: "One or both foods not found in our database",
          data: null
        });
        return;
      }
      
      // Adjust for quantity
      const food1Adjusted = {
        name: food1Data.name,
        calories: (food1Data.calories * quantity1) / 100,
        protein: (food1Data.protein * quantity1) / 100,
        fats: (food1Data.fats * quantity1) / 100,
        carbs: (food1Data.carbs * quantity1) / 100,
        fiber: (food1Data.fiber * quantity1) / 100,
      };
      
      const food2Adjusted = {
        name: food2Data.name,
        calories: (food2Data.calories * quantity2) / 100,
        protein: (food2Data.protein * quantity2) / 100,
        fats: (food2Data.fats * quantity2) / 100,
        carbs: (food2Data.carbs * quantity2) / 100,
        fiber: (food2Data.fiber * quantity2) / 100,
      };
      
      resolve({
        error: null,
        data: {
          food1: food1Adjusted,
          food2: food2Adjusted
        }
      });
    }, 1000); // Simulate network delay
  });
};

// Mock BMI calculator and advice
export const calculateBMI = (height: number, weight: number) => {
  // Height in meters, weight in kg
  const bmi = weight / ((height/100) * (height/100));
  
  let category = '';
  let advice = '';
  
  if (bmi < 18.5) {
    category = 'Underweight';
    advice = "🥗 Focus on nutrient-dense foods to help you gain weight in a healthy way. Include healthy fats like avocados, nuts, and olive oil. Strength training can help build muscle mass. Consider smaller, more frequent meals if you struggle with appetite.";
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal weight';
    advice = "🌟 You're in a healthy weight range! Focus on maintaining balanced nutrition with plenty of whole foods. Regular physical activity will help maintain muscle mass and cardiovascular health. Stay hydrated and prioritize quality sleep.";
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    advice = "🚶 Gradual changes to diet and increasing physical activity can help. Focus on whole foods, adequate protein, and plenty of vegetables. Even small amounts of daily movement can make a difference. Staying hydrated can help manage hunger.";
  } else {
    category = 'Obese';
    advice = "💪 Start with small, sustainable changes rather than drastic diets. Increasing protein and fiber can help manage hunger. Regular movement, even just walking, is beneficial. Consider consulting a healthcare provider for personalized guidance.";
  }
  
  return {
    bmi: bmi.toFixed(1),
    category,
    advice
  };
};

// Mock meal recognition function
export const recognizeMeal = async (imageUrl: string) => {
  // In a real app, this would call the Gemini Vision API with the image
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, return a mock response
      resolve({
        foodIdentified: "Grilled Salmon with Quinoa and Vegetables",
        nutritionInfo: {
          calories: 420,
          protein: 32,
          carbs: 30,
          fats: 15,
          fiber: 6
        },
        recommendations: "🐟 Great choice with the salmon - rich in omega-3 fatty acids!\n\n• The balance of protein, complex carbs, and vegetables makes this a nutritionally complete meal\n• Consider adding a small side of leafy greens for more vitamins\n• This meal supports both muscle maintenance and provides sustained energy\n\nRecommendation: This is an excellent meal choice that supports overall health!"
      });
    }, 1500); // Simulate network delay
  });
};

// Mock wellness journey function
export const getWellnessInsights = async (goals: string[]) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const insights = {
        recommendations: [
          "Start with small, achievable daily habits",
          "Track your progress with measurements beyond the scale",
          "Focus on how foods make you feel, not just calories",
          "Include strength training alongside cardio for better results",
          "Prioritize sleep quality for better recovery and reduced cravings"
        ],
        milestones: [
          "Week 1-2: Notice improved energy levels",
          "Week 3-4: Feel stronger during workouts",
          "Week 6-8: Clothes fit differently",
          "Month 3: Significant habit changes established",
          "Month 6: Major progress toward your goals"
        ]
      };
      
      resolve(insights);
    }, 1000);
  });
};
