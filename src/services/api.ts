
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
    { name: 'Shrimp', calories: 99, protein: 24, fats: 0.3, carbs: 0, fiber: 0 },
    { name: 'Pork Chop', calories: 231, protein: 25, fats: 14, carbs: 0, fiber: 0 },
    { name: 'Beef Steak', calories: 271, protein: 26, fats: 19, carbs: 0, fiber: 0 },
    { name: 'Tempeh', calories: 193, protein: 19, fats: 11, carbs: 9, fiber: 0 },
    { name: 'Seitan', calories: 370, protein: 75, fats: 2, carbs: 14, fiber: 1 },
    { name: 'Cod Fish', calories: 82, protein: 18, fats: 0.7, carbs: 0, fiber: 0 },
    { name: 'Tilapia', calories: 96, protein: 20, fats: 1.7, carbs: 0, fiber: 0 },
    { name: 'Bison', calories: 143, protein: 28, fats: 2.4, carbs: 0, fiber: 0 },
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
    { name: 'Buckwheat', calories: 343, protein: 13.3, fats: 3.4, carbs: 71.5, fiber: 10 },
    { name: 'Rice Noodles', calories: 109, protein: 0.9, fats: 0.1, carbs: 24.9, fiber: 0.9 },
    { name: 'Couscous', calories: 176, protein: 5.9, fats: 0.3, carbs: 36.5, fiber: 2.2 },
    { name: 'Bagel', calories: 245, protein: 9.6, fats: 1.0, carbs: 47.9, fiber: 2.1 },
    { name: 'English Muffin', calories: 134, protein: 4.4, fats: 1.0, carbs: 26.5, fiber: 1.6 },
    { name: 'Tortilla (Corn)', calories: 52, protein: 1.4, fats: 0.7, carbs: 10.7, fiber: 1.5 },
    { name: 'Tortilla (Flour)', calories: 104, protein: 2.8, fats: 2.1, carbs: 17.8, fiber: 1.2 },
    { name: 'Rye Bread', calories: 83, protein: 2.7, fats: 0.9, carbs: 15.5, fiber: 1.9 },
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
    { name: 'Pistachios', calories: 562, protein: 20.2, fats: 45.4, carbs: 27.5, fiber: 10.3 },
    { name: 'Cashews', calories: 553, protein: 18.2, fats: 43.9, carbs: 30.2, fiber: 3.3 },
    { name: 'Macadamia Nuts', calories: 718, protein: 7.9, fats: 75.8, carbs: 13.8, fiber: 8.6 },
    { name: 'Hazelnuts', calories: 628, protein: 15.0, fats: 60.8, carbs: 16.7, fiber: 9.7 },
    { name: 'Pecans', calories: 691, protein: 9.2, fats: 72.0, carbs: 13.9, fiber: 9.6 },
    { name: 'Sunflower Seeds', calories: 584, protein: 20.8, fats: 51.5, carbs: 20.0, fiber: 8.6 },
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
    { name: 'Pear', calories: 57, protein: 0.4, fats: 0.1, carbs: 15.2, fiber: 3.1 },
    { name: 'Peach', calories: 39, protein: 0.9, fats: 0.3, carbs: 9.5, fiber: 1.5 },
    { name: 'Plum', calories: 46, protein: 0.7, fats: 0.3, carbs: 11.4, fiber: 1.4 },
    { name: 'Cherries', calories: 50, protein: 1.0, fats: 0.3, carbs: 12.2, fiber: 1.6 },
    { name: 'Grapefruit', calories: 42, protein: 0.8, fats: 0.1, carbs: 10.7, fiber: 1.6 },
    { name: 'Avocado', calories: 160, protein: 2.0, fats: 14.7, carbs: 8.5, fiber: 6.7 },
    { name: 'Pomegranate', calories: 83, protein: 1.7, fats: 1.2, carbs: 18.7, fiber: 4.0 },
    { name: 'Cantaloupe', calories: 34, protein: 0.8, fats: 0.2, carbs: 8.2, fiber: 0.9 },
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
    { name: 'Asparagus', calories: 20, protein: 2.2, fats: 0.1, carbs: 3.9, fiber: 2.1 },
    { name: 'Brussels Sprouts', calories: 43, protein: 3.4, fats: 0.3, carbs: 9.0, fiber: 3.8 },
    { name: 'Cabbage', calories: 25, protein: 1.3, fats: 0.1, carbs: 5.8, fiber: 2.5 },
    { name: 'Celery', calories: 16, protein: 0.7, fats: 0.2, carbs: 3.4, fiber: 1.6 },
    { name: 'Eggplant', calories: 25, protein: 1.0, fats: 0.2, carbs: 6.0, fiber: 3.0 },
    { name: 'Green Beans', calories: 31, protein: 1.8, fats: 0.2, carbs: 7.0, fiber: 3.4 },
    { name: 'Onion', calories: 40, protein: 1.1, fats: 0.1, carbs: 9.3, fiber: 1.7 },
    { name: 'Lettuce', calories: 15, protein: 1.4, fats: 0.2, carbs: 2.9, fiber: 1.3 },
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
    { name: 'Navy Beans', calories: 140, protein: 8.2, fats: 0.6, carbs: 26.0, fiber: 10.5 },
    { name: 'Lentils (Red)', calories: 115, protein: 9.0, fats: 0.4, carbs: 20.0, fiber: 8.0 },
    { name: 'Lentils (Green)', calories: 116, protein: 9.0, fats: 0.4, carbs: 20.0, fiber: 7.9 },
    { name: 'Split Peas', calories: 118, protein: 8.3, fats: 0.4, carbs: 21.1, fiber: 8.3 },
    { name: 'Farro', calories: 170, protein: 7.0, fats: 1.5, carbs: 34.0, fiber: 5.0 },
    { name: 'Wild Rice', calories: 101, protein: 4.0, fats: 0.3, carbs: 21.0, fiber: 2.0 },
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
    { name: 'Cottage Cheese (1%)', calories: 82, protein: 12.4, fats: 1.0, carbs: 3.1, fiber: 0 },
    { name: 'Greek Yogurt (Plain)', calories: 59, protein: 10.0, fats: 0.4, carbs: 3.6, fiber: 0 },
    { name: 'Ricotta Cheese', calories: 174, protein: 11.4, fats: 12.6, carbs: 4.0, fiber: 0 },
    { name: 'Blue Cheese', calories: 353, protein: 21.4, fats: 28.7, carbs: 2.3, fiber: 0 },
    { name: 'Brie Cheese', calories: 334, protein: 20.8, fats: 27.7, carbs: 0.5, fiber: 0 },
    { name: 'Butter Milk', calories: 62, protein: 3.3, fats: 3.3, carbs: 4.8, fiber: 0 },
  ]
};

// Helper function to get all foods
export const getAllFoods = () => {
  const allCategories = Object.values(foodDatabase);
  return allCategories.flat();
};

// Helper function for Gemini API calls
async function callGeminiAPI(prompt: string, temperature: number = 0.7, isVision: boolean = false, imageData?: string) {
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
      ]
    };
    
    // Add image data for vision model if provided
    if (isVision && imageData) {
      // Extract mime type and base64 data properly
      const mimeTypeMatch = imageData.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';
      const base64Data = imageData.replace(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/, '');

      requestBody.contents[0].parts.unshift({
        inlineData: {
          mimeType: mimeType,
          data: base64Data
        }
      });
    }
    
    console.log(`Calling ${model} API...`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      throw new Error(`API error: ${response.status} - ${errorData?.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      console.error("Unexpected API response format:", data);
      throw new Error("Invalid response format from API");
    }
    
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
      Keep your response concise (maximum 3-4 bullet points) and end with a quick recommendation.
      
      Format your response with bullet points and emojis, making it easy to scan and understand.
      
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
      
      Provide a short, concise comparative analysis of these foods. Format your response as 4-5 bullet points with emojis, highlighting:
      1. Which food is more nutrient-dense and why
      2. How each food might fit into different dietary goals (weight loss, muscle building)
      3. Which food has more fiber and its benefits
      4. A simple practical recommendation for incorporating these foods
      
      Be friendly, concise, and focused on practical advice.
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
      
      Provide personalized advice with 4-5 bullet points with emojis covering:
      1. A friendly assessment of their current BMI
      2. 2-3 specific, actionable nutrition recommendations
      3. 1-2 physical activity suggestions
      4. A brief timeline for healthy changes if needed
      
      Make each bullet point concise, friendly, and focused on overall health rather than just weight.
      Format your response with emojis at the beginning of each bullet point.
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
    // First, validate the image data
    if (!imageData || !imageData.startsWith('data:image/')) {
      throw new Error("Invalid image data");
    }
    
    // Try to analyze the image with Gemini Vision model
    const prompt = `
      You are a professional nutritionist analyzing a food image. Please provide the following information about the food in the image:
      
      1. IDENTIFICATION
      What foods are in this meal? Be specific and detailed. If there are no food items visible, say "No food detected".
      
      2. NUTRITION INFORMATION (Provide specific numbers for each)
      - Calories: [number]
      - Protein: [number] g
      - Carbs: [number] g
      - Fats: [number] g
      - Fiber: [number] g
      
      3. RECOMMENDATIONS
      Provide 3-4 brief bullet points about:
      - How this meal could be balanced/improved
      - Benefits of the foods in the image
      - Suggestions for complementary foods
      
      Format your response clearly with emoji bullet points for the recommendations.
      If you cannot identify any food in the image, respond with "No food detected in this image" and estimate zero for all nutritional values.
    `;
    
    // Call the Gemini Vision API
    const aiResponse = await callGeminiAPI(prompt, 0.7, true, imageData);
    
    // Check if the API indicated no food was found
    if (aiResponse.toLowerCase().includes("no food detected") || 
        aiResponse.toLowerCase().includes("i cannot identify")) {
      return {
        foodIdentified: "Could not identify the meal",
        nutritionInfo: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
          fiber: 0
        },
        recommendations: "We couldn't identify any food in this image. Please try again with a clearer image of food items.",
        fullAnalysis: aiResponse
      };
    }
    
    // Parse the AI response to extract structured information
    const sections = aiResponse.split('\n\n');

    // Handle case where response is not properly formatted
    if (sections.length < 2) {
      throw new Error("Unexpected response format from AI");
    }
    
    let foodIdentified = "Unknown meal";
    let nutritionInfo = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0
    };
    let recommendations = "No recommendations available";
    
    // Extract identified food from first section
    for (const section of sections) {
      if (!section.toLowerCase().includes("calor") && 
          !section.toLowerCase().includes("protein") &&
          !section.toLowerCase().includes("recommend")) {
        foodIdentified = section.trim();
        break;
      }
    }
    
    // Find the nutrition section
    const nutritionSection = sections.find(section => 
      section.toLowerCase().includes("calor") && 
      section.toLowerCase().includes("protein")
    );
    
    if (nutritionSection) {
      const caloriesMatch = nutritionSection.match(/calories:?\s*(\d+)/i);
      const proteinMatch = nutritionSection.match(/protein:?\s*(\d+)/i);
      const carbsMatch = nutritionSection.match(/carbs:?\s*(\d+)/i);
      const fatsMatch = nutritionSection.match(/fats:?\s*(\d+)/i);
      const fiberMatch = nutritionSection.match(/fiber:?\s*(\d+)/i);
      
      nutritionInfo = {
        calories: caloriesMatch ? parseInt(caloriesMatch[1]) : 0,
        protein: proteinMatch ? parseInt(proteinMatch[1]) : 0,
        carbs: carbsMatch ? parseInt(carbsMatch[1]) : 0,
        fats: fatsMatch ? parseInt(fatsMatch[1]) : 0,
        fiber: fiberMatch ? parseInt(fiberMatch[1]) : 0
      };
    }
    
    // Find the recommendations section
    const recommendationsSection = sections.find(section => 
      section.toLowerCase().includes("recommend") || 
      section.includes("•") || 
      section.includes("- ") ||
      /[\u{1F300}-\u{1F6FF}]/u.test(section)
    );
    
    if (recommendationsSection) {
      recommendations = recommendationsSection.trim();
    }
    
    // Make sure values are positive numbers
    Object.keys(nutritionInfo).forEach(key => {
      const value = nutritionInfo[key as keyof typeof nutritionInfo];
      if (typeof value === 'number' && (isNaN(value) || value < 0)) {
        nutritionInfo[key as keyof typeof nutritionInfo] = 0;
      }
    });
    
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
      
      Based on these goals, provide:
      1. 5 actionable recommendations to help them achieve these goals
      2. 5 realistic milestones they can expect to see on their journey
      
      Format your response as a JSON object with two arrays:
      {
        "recommendations": ["🥗 Recommendation 1", "💪 Recommendation 2", ...],
        "milestones": ["Week 1-2: 🌱 Milestone 1", "Month 1: 🏆 Milestone 2", ...]
      }
      
      Make sure to include emojis at the beginning of each recommendation and milestone.
      Each item should be very concise (15 words or less).
      For milestones, include a timeframe (e.g., "Week 1-2:", "Month 3:")
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
        "🥗 Start with small, achievable daily habits",
        "📊 Track your progress beyond just the scale",
        "🍎 Focus on how foods make you feel",
        "💪 Include strength training alongside cardio",
        "😴 Prioritize sleep for recovery and reduced cravings"
      ],
      milestones: [
        "Week 1-2: 🌱 Notice improved energy levels",
        "Week 3-4: 💪 Feel stronger during workouts",
        "Week 6-8: 👖 Clothes fit differently",
        "Month 3: 🏆 Significant habit changes established",
        "Month 6: 🌟 Major progress toward your goals"
      ]
    };
  }
};
