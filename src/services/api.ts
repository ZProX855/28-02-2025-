
// API service with Gemini 2.0 Flash integration

// Use this API key for the Gemini AI model
const GEMINI_API_KEY = "AIzaSyC3Er0jxIvcQCjPzGpp9xYH-Lc-8TuqqJc";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";

// Mock food database (USDA-based data)
export const foodDatabase = {
  proteins: [
    { name: 'Chicken Breast', calories: 165, protein: 31, fats: 3.6, carbs: 0, fiber: 0 },
    { name: 'Ground Beef (80% lean)', calories: 250, protein: 20, fats: 20, carbs: 0, fiber: 0 },
    { name: 'Tofu', calories: 76, protein: 8, fats: 4.5, carbs: 2, fiber: 0.5 },
    { name: 'Salmon', calories: 206, protein: 22, fats: 13, carbs: 0, fiber: 0 },
    { name: 'Lentils', calories: 116, protein: 9, fats: 0.4, carbs: 20, fiber: 8 },
    { name: 'Eggs', calories: 155, protein: 13, fats: 11, carbs: 1, fiber: 0 },
    { name: 'Tuna', calories: 130, protein: 29, fats: 1, carbs: 0, fiber: 0 },
    { name: 'Greek Yogurt', calories: 100, protein: 10, fats: 5, carbs: 3.6, fiber: 0 },
    { name: 'Cottage Cheese', calories: 98, protein: 11, fats: 4.3, carbs: 3.1, fiber: 0 },
    { name: 'Turkey Breast', calories: 135, protein: 30, fats: 1, carbs: 0, fiber: 0 },
  ],
  carbs: [
    { name: 'White Rice', calories: 130, protein: 2.7, fats: 0.3, carbs: 28, fiber: 0.4 },
    { name: 'Quinoa', calories: 120, protein: 4.4, fats: 1.9, carbs: 21, fiber: 2.8 },
    { name: 'Oats', calories: 389, protein: 16.9, fats: 6.9, carbs: 66, fiber: 10.6 },
    { name: 'Whole Grain Bread', calories: 69, protein: 3.6, fats: 1, carbs: 12, fiber: 1.9 },
    { name: 'Pasta', calories: 158, protein: 5.8, fats: 0.9, carbs: 31, fiber: 1.8 },
    { name: 'Sweet Potato', calories: 86, protein: 1.6, fats: 0.1, carbs: 20, fiber: 3 },
    { name: 'Potato', calories: 77, protein: 2, fats: 0.1, carbs: 17, fiber: 2.2 },
    { name: 'Brown Rice', calories: 112, protein: 2.6, fats: 0.9, carbs: 23.5, fiber: 1.8 },
    { name: 'Corn', calories: 96, protein: 3.4, fats: 1.5, carbs: 21, fiber: 2.4 },
    { name: 'Barley', calories: 123, protein: 2.3, fats: 0.8, carbs: 28.2, fiber: 3.8 },
  ],
  fats: [
    { name: 'Avocado', calories: 160, protein: 2, fats: 15, carbs: 9, fiber: 7 },
    { name: 'Almonds', calories: 579, protein: 21, fats: 50, carbs: 22, fiber: 12.5 },
    { name: 'Cheese (Cheddar)', calories: 402, protein: 25, fats: 33, carbs: 1.3, fiber: 0 },
    { name: 'Butter', calories: 717, protein: 0.9, fats: 81, carbs: 0.1, fiber: 0 },
    { name: 'Olive Oil', calories: 884, protein: 0, fats: 100, carbs: 0, fiber: 0 },
    { name: 'Peanut Butter', calories: 588, protein: 25, fats: 50, carbs: 20, fiber: 6 },
    { name: 'Walnuts', calories: 654, protein: 15.2, fats: 65.2, carbs: 13.7, fiber: 6.7 },
    { name: 'Coconut Oil', calories: 862, protein: 0, fats: 100, carbs: 0, fiber: 0 },
    { name: 'Chia Seeds', calories: 486, protein: 16.5, fats: 30.7, carbs: 42.1, fiber: 34.4 },
    { name: 'Flax Seeds', calories: 534, protein: 18.3, fats: 42.2, carbs: 28.9, fiber: 27.3 },
  ],
  fruits: [
    { name: 'Banana', calories: 89, protein: 1.1, fats: 0.3, carbs: 23, fiber: 2.6 },
    { name: 'Apple', calories: 52, protein: 0.3, fats: 0.2, carbs: 14, fiber: 2.4 },
    { name: 'Strawberries', calories: 32, protein: 0.7, fats: 0.3, carbs: 7.7, fiber: 2 },
    { name: 'Mango', calories: 60, protein: 0.8, fats: 0.4, carbs: 15, fiber: 1.6 },
    { name: 'Blueberries', calories: 57, protein: 0.7, fats: 0.3, carbs: 14, fiber: 2.4 },
    { name: 'Orange', calories: 47, protein: 0.9, fats: 0.1, carbs: 12, fiber: 2.4 },
    { name: 'Pineapple', calories: 50, protein: 0.5, fats: 0.1, carbs: 13.1, fiber: 1.4 },
    { name: 'Grapes', calories: 69, protein: 0.7, fats: 0.2, carbs: 18.1, fiber: 0.9 },
    { name: 'Watermelon', calories: 30, protein: 0.6, fats: 0.2, carbs: 7.6, fiber: 0.4 },
    { name: 'Kiwi', calories: 61, protein: 1.1, fats: 0.5, carbs: 14.7, fiber: 3 },
  ],
  vegetables: [
    { name: 'Spinach', calories: 23, protein: 2.9, fats: 0.4, carbs: 3.6, fiber: 2.2 },
    { name: 'Broccoli', calories: 34, protein: 2.8, fats: 0.4, carbs: 7, fiber: 2.6 },
    { name: 'Carrots', calories: 41, protein: 0.9, fats: 0.2, carbs: 10, fiber: 2.8 },
    { name: 'Bell Peppers', calories: 31, protein: 1, fats: 0.3, carbs: 6, fiber: 2.1 },
    { name: 'Kale', calories: 49, protein: 4.3, fats: 0.9, carbs: 8.8, fiber: 3.6 },
    { name: 'Cauliflower', calories: 25, protein: 1.9, fats: 0.3, carbs: 5, fiber: 2 },
    { name: 'Tomatoes', calories: 18, protein: 0.9, fats: 0.2, carbs: 3.9, fiber: 1.2 },
    { name: 'Cucumber', calories: 15, protein: 0.7, fats: 0.1, carbs: 3.6, fiber: 0.5 },
    { name: 'Zucchini', calories: 17, protein: 1.2, fats: 0.3, carbs: 3.1, fiber: 1 },
    { name: 'Mushrooms', calories: 22, protein: 3.1, fats: 0.3, carbs: 3.3, fiber: 1 },
  ],
  grains_legumes: [
    { name: 'Black Beans', calories: 132, protein: 8.9, fats: 0.5, carbs: 23.7, fiber: 8.7 },
    { name: 'Chickpeas', calories: 164, protein: 8.9, fats: 2.6, carbs: 27.4, fiber: 7.6 },
    { name: 'Pinto Beans', calories: 143, protein: 9, fats: 0.7, carbs: 26.2, fiber: 9 },
    { name: 'Kidney Beans', calories: 127, protein: 8.7, fats: 0.5, carbs: 22.8, fiber: 6.4 },
    { name: 'Couscous', calories: 112, protein: 3.8, fats: 0.2, carbs: 23.2, fiber: 1.4 },
    { name: 'Bulgur', calories: 83, protein: 3.1, fats: 0.2, carbs: 18.6, fiber: 4.5 },
    { name: 'Millet', calories: 119, protein: 3.5, fats: 1, carbs: 23.7, fiber: 2.3 },
    { name: 'Amaranth', calories: 103, protein: 3.8, fats: 1.8, carbs: 18.7, fiber: 2.8 },
    { name: 'Buckwheat', calories: 92, protein: 3.4, fats: 0.8, carbs: 19.9, fiber: 2.7 },
    { name: 'Spelt', calories: 127, protein: 5.5, fats: 0.8, carbs: 26.3, fiber: 2.7 },
  ],
  dairy: [
    { name: 'Milk (Whole)', calories: 61, protein: 3.2, fats: 3.3, carbs: 4.8, fiber: 0 },
    { name: 'Milk (Skim)', calories: 34, protein: 3.4, fats: 0.1, carbs: 5, fiber: 0 },
    { name: 'Yogurt (Plain)', calories: 59, protein: 3.5, fats: 3.3, carbs: 4.7, fiber: 0 },
    { name: 'Feta Cheese', calories: 264, protein: 14.2, fats: 21.3, carbs: 4.1, fiber: 0 },
    { name: 'Mozzarella', calories: 280, protein: 28, fats: 17, carbs: 3.1, fiber: 0 },
    { name: 'Cream Cheese', calories: 342, protein: 6.2, fats: 34, carbs: 2.7, fiber: 0 },
    { name: 'Sour Cream', calories: 198, protein: 3, fats: 19.4, carbs: 4.6, fiber: 0 },
    { name: 'Parmesan Cheese', calories: 431, protein: 38.5, fats: 29, carbs: 3.2, fiber: 0 },
    { name: 'Goat Cheese', calories: 364, protein: 21.6, fats: 29.8, carbs: 0.9, fiber: 0 },
    { name: 'Swiss Cheese', calories: 380, protein: 27, fats: 28, carbs: 5.4, fiber: 0 },
  ]
};

// Helper function to get all foods
export const getAllFoods = () => {
  const allCategories = Object.values(foodDatabase);
  return allCategories.flat();
};

// Helper function for Gemini API calls
async function callGeminiAPI(prompt: string, temperature: number = 0.5, isVision: boolean = false, imageData?: string) {
  try {
    const model = isVision ? "gemini-1.5-vision" : "gemini-2.0-flash";
    const url = `${GEMINI_API_URL}/${model}:generateContent?key=${GEMINI_API_KEY}`;
    
    let requestBody: any = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ],
      temperature: temperature
    };
    
    // Add image data for vision model if provided
    if (isVision && imageData) {
      requestBody.contents[0].parts.unshift({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData.split(',')[1] // Remove the data:image/jpeg;base64, part
        }
      });
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

// AI Nutrition Assistant chat function
export const getChatResponse = async (message: string) => {
  try {
    const prompt = `
      You are a friendly AI nutrition assistant. 
      The user is asking: "${message}"
      
      Please provide a short, clear, and engaging response about nutrition. 
      Use bullet points and emojis where appropriate. 
      Keep your response concise and end with a quick recommendation.
      
      If the user asks for a meal plan or specific nutritional advice, include sample foods with their nutritional values.
      If they ask about weight management, provide practical tips based on scientific evidence.
      If they ask about specific diets (keto, paleo, vegan, etc.), provide a balanced view of benefits and considerations.
    `;
    
    const aiResponse = await callGeminiAPI(prompt);
    
    return {
      text: aiResponse,
      loading: false,
      error: null
    };
  } catch (error) {
    console.error("Chat API error:", error);
    return {
      text: "I'm sorry, I couldn't process your request right now. Please try again later.",
      loading: false,
      error: "API error"
    };
  }
};

// Food comparison function with AI insights
export const compareFoods = async (food1: string, food2: string, quantity1: number = 100, quantity2: number = 100) => {
  // First get the basic nutrition data from our database
  const allFoods = getAllFoods();
  const food1Data = allFoods.find(food => food.name.toLowerCase() === food1.toLowerCase());
  const food2Data = allFoods.find(food => food.name.toLowerCase() === food2.toLowerCase());
  
  if (!food1Data || !food2Data) {
    return {
      error: "One or both foods not found in our database",
      data: null
    };
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
  
  try {
    // Get AI insights on the comparison
    const prompt = `
      Compare the nutritional values of ${quantity1}g ${food1} vs ${quantity2}g ${food2}:
      
      ${food1} (${quantity1}g):
      - Calories: ${food1Adjusted.calories.toFixed(1)} kcal
      - Protein: ${food1Adjusted.protein.toFixed(1)}g
      - Fats: ${food1Adjusted.fats.toFixed(1)}g
      - Carbs: ${food1Adjusted.carbs.toFixed(1)}g
      - Fiber: ${food1Adjusted.fiber.toFixed(1)}g
      
      ${food2} (${quantity2}g):
      - Calories: ${food2Adjusted.calories.toFixed(1)} kcal
      - Protein: ${food2Adjusted.protein.toFixed(1)}g
      - Fats: ${food2Adjusted.fats.toFixed(1)}g
      - Carbs: ${food2Adjusted.carbs.toFixed(1)}g
      - Fiber: ${food2Adjusted.fiber.toFixed(1)}g
      
      Provide a detailed comparative analysis of these foods including:
      1. Which food is more nutrient-dense and why
      2. How each food might fit into different dietary goals (weight loss, muscle building, general health)
      3. Which vitamins and minerals these foods are likely to contain based on their profiles
      4. Practical recommendations for how to incorporate these foods into a balanced diet
      
      Format your response in clear paragraphs with helpful comparisons.
    `;
    
    const aiInsights = await callGeminiAPI(prompt);
    
    return {
      error: null,
      data: {
        food1: food1Adjusted,
        food2: food2Adjusted,
        insights: aiInsights
      }
    };
  } catch (error) {
    console.error("Food comparison API error:", error);
    return {
      error: "Failed to get AI insights",
      data: {
        food1: food1Adjusted,
        food2: food2Adjusted,
        insights: null
      }
    };
  }
};

// BMI calculator and advice
export const calculateBMI = async (height: number, weight: number) => {
  // Calculate BMI
  const bmi = weight / ((height/100) * (height/100));
  const bmiValue = bmi.toFixed(1);
  
  let category = '';
  
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal weight';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }
  
  try {
    // Get AI-generated advice based on BMI
    const prompt = `
      A user has a BMI of ${bmiValue}, which puts them in the ${category} category.
      
      Provide personalized advice that includes:
      1. A friendly and non-judgmental assessment of their current BMI
      2. 3-5 specific, actionable nutrition recommendations appropriate for their BMI category
      3. 2-3 appropriate physical activity suggestions
      4. Information about how their current BMI might impact health
      5. A realistic timeline for healthy changes if needed
      
      Make your response engaging with emojis, motivational but realistic, and focused on overall health rather than just weight.
      Keep your response concise (around 200-250 words).
    `;
    
    const advice = await callGeminiAPI(prompt);
    
    return {
      bmi: bmiValue,
      category,
      advice
    };
  } catch (error) {
    console.error("BMI advice API error:", error);
    
    // Fallback advice if API fails
    let fallbackAdvice = '';
    
    if (bmi < 18.5) {
      fallbackAdvice = "🥗 Focus on nutrient-dense foods to help you gain weight in a healthy way. Include healthy fats like avocados, nuts, and olive oil. Strength training can help build muscle mass. Consider smaller, more frequent meals if you struggle with appetite.";
    } else if (bmi >= 18.5 && bmi < 25) {
      fallbackAdvice = "🌟 You're in a healthy weight range! Focus on maintaining balanced nutrition with plenty of whole foods. Regular physical activity will help maintain muscle mass and cardiovascular health. Stay hydrated and prioritize quality sleep.";
    } else if (bmi >= 25 && bmi < 30) {
      fallbackAdvice = "🚶 Gradual changes to diet and increasing physical activity can help. Focus on whole foods, adequate protein, and plenty of vegetables. Even small amounts of daily movement can make a difference. Staying hydrated can help manage hunger.";
    } else {
      fallbackAdvice = "💪 Start with small, sustainable changes rather than drastic diets. Increasing protein and fiber can help manage hunger. Regular movement, even just walking, is beneficial. Consider consulting a healthcare provider for personalized guidance.";
    }
    
    return {
      bmi: bmiValue,
      category,
      advice: fallbackAdvice
    };
  }
};

// Meal recognition function with AI vision model
export const recognizeMeal = async (imageData: string) => {
  try {
    const prompt = `
      You are a professional nutritionist analyzing a food image. Please provide:
      
      1. Detailed identification: What foods are in this meal? List all visible ingredients and components.
      
      2. Nutritional breakdown: Provide estimated values for:
         - Calories (total for the meal)
         - Protein (g)
         - Carbs (g) 
         - Fats (g)
         - Fiber (g)
         - Key vitamins and minerals present
      
      3. Dietary analysis:
         - Is this meal balanced? Why or why not?
         - Which food groups are represented?
         - What might be missing for optimal nutrition?
      
      4. Personalized recommendations:
         - How could this meal be optimized for better nutrition?
         - Suggest 2-3 simple modifications to improve nutritional value
         - Who might this meal be particularly suitable for? (athletes, weight loss, etc.)
      
      Format your response clearly with headings and concise bullet points. Use emojis where appropriate.
    `;
    
    const aiResponse = await callGeminiAPI(prompt, 0.5, true, imageData);
    
    // Parse the AI response to extract structured information
    const sections = aiResponse.split('\n\n');
    
    let foodIdentified = "Unknown meal";
    let nutritionInfo = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0
    };
    let recommendations = "No recommendations available";
    
    if (sections.length >= 3) {
      foodIdentified = sections[0].trim();
      
      // Extract nutrition info from the second section
      const nutritionText = sections[1];
      const caloriesMatch = nutritionText.match(/calories:?\s*(\d+)/i);
      const proteinMatch = nutritionText.match(/protein:?\s*(\d+)/i);
      const carbsMatch = nutritionText.match(/carbs:?\s*(\d+)/i);
      const fatsMatch = nutritionText.match(/fats:?\s*(\d+)/i);
      const fiberMatch = nutritionText.match(/fiber:?\s*(\d+)/i);
      
      nutritionInfo = {
        calories: caloriesMatch ? parseInt(caloriesMatch[1]) : 0,
        protein: proteinMatch ? parseInt(proteinMatch[1]) : 0,
        carbs: carbsMatch ? parseInt(carbsMatch[1]) : 0,
        fats: fatsMatch ? parseInt(fatsMatch[1]) : 0,
        fiber: fiberMatch ? parseInt(fiberMatch[1]) : 0
      };
      
      recommendations = sections[2].trim();
    }
    
    return {
      foodIdentified,
      nutritionInfo,
      recommendations,
      fullAnalysis: aiResponse
    };
  } catch (error) {
    console.error("Meal recognition API error:", error);
    
    // Return fallback data if the API call fails
    return {
      foodIdentified: "Could not identify the meal",
      nutritionInfo: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        fiber: 0
      },
      recommendations: "We couldn't analyze your meal. Please try again with a clearer image.",
      fullAnalysis: null
    };
  }
};

// Wellness journey insights function
export interface WellnessInsights {
  recommendations: string[];
  milestones: string[];
}

export const getWellnessInsights = async (goals: string[]): Promise<WellnessInsights> => {
  try {
    const prompt = `
      The user has selected the following wellness goals:
      ${goals.map(goal => `- ${goal}`).join('\n')}
      
      Based on these specific goals, create a comprehensive wellness plan that includes:
      
      1. 6 actionable, specific recommendations to help them achieve these goals
         - Each recommendation should be practical and implementable
         - Include a mix of nutrition, fitness, and lifestyle suggestions
         - For nutrition recommendations, mention specific foods and their benefits
      
      2. 5 realistic milestones they can expect to see throughout their journey
         - Provide a timeline for each milestone (e.g., "Week 1-2", "Month 3")
         - Include both physical and mental/emotional milestones
         - Explain why each milestone matters for long-term success
      
      FORMAT YOUR RESPONSE AS A JSON OBJECT with two arrays:
      {
        "recommendations": ["Recommendation 1", "Recommendation 2", ...],
        "milestones": ["Milestone 1", "Milestone 2", ...]
      }
    `;
    
    const aiResponse = await callGeminiAPI(prompt);
    
    try {
      // Try to parse the response as JSON
      const parsedResponse = JSON.parse(aiResponse);
      return {
        recommendations: Array.isArray(parsedResponse.recommendations) ? parsedResponse.recommendations : [],
        milestones: Array.isArray(parsedResponse.milestones) ? parsedResponse.milestones : []
      };
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      
      // Fallback: Try to extract recommendations and milestones from text
      const recommendationsMatch = aiResponse.match(/recommendations:?\s*\n((?:- [^\n]+\n?)+)/i);
      const milestonesMatch = aiResponse.match(/milestones:?\s*\n((?:- [^\n]+\n?)+)/i);
      
      const recommendations = recommendationsMatch ? 
        recommendationsMatch[1].split('\n')
          .filter(line => line.trim().startsWith('- '))
          .map(line => line.trim().substring(2)) : 
        [];
      
      const milestones = milestonesMatch ? 
        milestonesMatch[1].split('\n')
          .filter(line => line.trim().startsWith('- '))
          .map(line => line.trim().substring(2)) : 
        [];
      
      return { recommendations, milestones };
    }
  } catch (error) {
    console.error("Wellness insights API error:", error);
    
    // Return fallback data if the API call fails
    return {
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
  }
};
