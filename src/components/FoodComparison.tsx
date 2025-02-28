
import React, { useState, useEffect } from 'react';
import { compareFoods, foodDatabase, getAllFoods } from '../services/api';
import { toast } from 'sonner';
import { Apple, Carrot, Banana } from 'lucide-react';

interface FoodData {
  name: string;
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
  fiber: number;
}

interface ComparisonResult {
  food1: FoodData;
  food2: FoodData;
  insights?: string;
}

const FoodComparison: React.FC = () => {
  const [food1, setFood1] = useState('');
  const [food2, setFood2] = useState('');
  const [quantity1, setQuantity1] = useState(100);
  const [quantity2, setQuantity2] = useState(100);
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [foodOptions, setFoodOptions] = useState<string[]>([]);

  // Extract all food names on component mount
  useEffect(() => {
    const allFoods = getAllFoods();
    const foodNames = allFoods.map(food => food.name);
    setFoodOptions(foodNames);
  }, []);

  // Filter foods based on search term
  const getFilteredFoods = (searchTerm: string) => {
    if (!searchTerm) return [];
    return foodOptions.filter(food => 
      food.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limit to 5 results
  };

  const handleCompare = async () => {
    if (!food1 || !food2) {
      toast.error('Please select both foods to compare');
      return;
    }
    
    setIsLoading(true);
    try {
      const response: any = await compareFoods(food1, food2, quantity1, quantity2);
      if (response.error) {
        toast.error(response.error);
      } else {
        setResult(response.data);
      }
    } catch (error) {
      toast.error('Error comparing foods. Please try again.');
      console.error("Food comparison error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectFood = (food: string, field: 'food1' | 'food2') => {
    if (field === 'food1') {
      setFood1(food);
      setShowDropdown1(false);
    } else {
      setFood2(food);
      setShowDropdown2(false);
    }
  };

  // Highlight the higher/lower value
  const getComparisonClass = (value1: number, value2: number, higherIsBetter = false) => {
    if (value1 === value2) return '';
    
    const isBetter = higherIsBetter ? value1 > value2 : value1 < value2;
    return isBetter ? 'text-green-600 font-medium' : 'text-amber-600';
  };

  const renderFoodCategories = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(foodDatabase).map(([category, foods], index) => (
          <div 
            key={category}
            className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-wellness-softGreen/30 opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <h3 className="text-wellness-darkGreen font-medium mb-2 capitalize">{category}</h3>
            <div className="text-sm text-wellness-charcoal">
              {foods.slice(0, 4).map((food: FoodData, i: number) => (
                <div key={i} className="mb-1 flex justify-between">
                  <span>{food.name}</span>
                  <span className="text-wellness-darkGreen">{food.calories} cal</span>
                </div>
              ))}
              {foods.length > 4 && <div className="text-xs text-wellness-mediumGreen">+ {foods.length - 4} more</div>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Food Categories Display */}
      {renderFoodCategories()}
      
      {/* Comparison Tool */}
      <div className="glass-panel p-6">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1 relative">
            <label className="block text-wellness-darkGreen font-medium mb-2">First Food</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm1}
                  onChange={(e) => {
                    setSearchTerm1(e.target.value);
                    setShowDropdown1(true);
                  }}
                  placeholder="Search for a food..."
                  className="input-field w-full"
                  onFocus={() => setShowDropdown1(true)}
                />
                {showDropdown1 && searchTerm1 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-wellness-softGreen/50 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {getFilteredFoods(searchTerm1).length > 0 ? (
                      getFilteredFoods(searchTerm1).map((food, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-wellness-softGreen/30 cursor-pointer transition-colors"
                          onClick={() => selectFood(food, 'food1')}
                        >
                          {food}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-wellness-charcoal/70">No foods found</div>
                    )}
                  </div>
                )}
              </div>
              <input
                type="number"
                value={quantity1}
                onChange={(e) => setQuantity1(Number(e.target.value))}
                className="input-field w-24"
                min="0"
              />
              <span className="self-center text-wellness-charcoal">g</span>
            </div>
            {food1 && (
              <div className="mt-2 px-3 py-1 bg-wellness-softGreen/40 rounded-full inline-flex items-center">
                <Apple className="h-4 w-4 text-wellness-darkGreen mr-1" />
                <span className="text-sm">{food1} ({quantity1}g)</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 relative">
            <label className="block text-wellness-darkGreen font-medium mb-2">Second Food</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm2}
                  onChange={(e) => {
                    setSearchTerm2(e.target.value);
                    setShowDropdown2(true);
                  }}
                  placeholder="Search for a food..."
                  className="input-field w-full"
                  onFocus={() => setShowDropdown2(true)}
                />
                {showDropdown2 && searchTerm2 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-wellness-softGreen/50 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {getFilteredFoods(searchTerm2).length > 0 ? (
                      getFilteredFoods(searchTerm2).map((food, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-wellness-softGreen/30 cursor-pointer transition-colors"
                          onClick={() => selectFood(food, 'food2')}
                        >
                          {food}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-wellness-charcoal/70">No foods found</div>
                    )}
                  </div>
                )}
              </div>
              <input
                type="number"
                value={quantity2}
                onChange={(e) => setQuantity2(Number(e.target.value))}
                className="input-field w-24"
                min="0"
              />
              <span className="self-center text-wellness-charcoal">g</span>
            </div>
            {food2 && (
              <div className="mt-2 px-3 py-1 bg-wellness-softGreen/40 rounded-full inline-flex items-center">
                <Banana className="h-4 w-4 text-wellness-darkGreen mr-1" />
                <span className="text-sm">{food2} ({quantity2}g)</span>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={handleCompare}
          disabled={isLoading || !food1 || !food2}
          className="btn-primary rounded-lg w-full mb-6"
        >
          {isLoading ? 'Comparing...' : 'Compare Foods'}
        </button>
        
        {result && (
          <div className="bg-white bg-opacity-70 rounded-xl p-4 shadow-sm border border-wellness-softGreen/30 animate-scale-in">
            <h3 className="text-center text-xl text-wellness-darkGreen font-medium mb-4">Comparison Results</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-wellness-softGreen/30">
                    <th className="py-2 px-4 text-left font-medium text-wellness-darkGreen">Nutrient</th>
                    <th className="py-2 px-4 text-right font-medium text-wellness-darkGreen">{result.food1.name} ({quantity1}g)</th>
                    <th className="py-2 px-4 text-right font-medium text-wellness-darkGreen">{result.food2.name} ({quantity2}g)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-wellness-softGreen/20">Calories</td>
                    <td className={`py-2 px-4 text-right border-b border-wellness-softGreen/20 ${getComparisonClass(result.food1.calories, result.food2.calories, false)}`}>
                      {result.food1.calories.toFixed(1)} kcal
                    </td>
                    <td className={`py-2 px-4 text-right border-b border-wellness-softGreen/20 ${getComparisonClass(result.food2.calories, result.food1.calories, false)}`}>
                      {result.food2.calories.toFixed(1)} kcal
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-wellness-softGreen/20">Protein</td>
                    <td className={`py-2 px-4 text-right border-b border-wellness-softGreen/20 ${getComparisonClass(result.food1.protein, result.food2.protein, true)}`}>
                      {result.food1.protein.toFixed(1)}g
                    </td>
                    <td className={`py-2 px-4 text-right border-b border-wellness-softGreen/20 ${getComparisonClass(result.food2.protein, result.food1.protein, true)}`}>
                      {result.food2.protein.toFixed(1)}g
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-wellness-softGreen/20">Fats</td>
                    <td className={`py-2 px-4 text-right border-b border-wellness-softGreen/20 ${getComparisonClass(result.food1.fats, result.food2.fats, false)}`}>
                      {result.food1.fats.toFixed(1)}g
                    </td>
                    <td className={`py-2 px-4 text-right border-b border-wellness-softGreen/20 ${getComparisonClass(result.food2.fats, result.food1.fats, false)}`}>
                      {result.food2.fats.toFixed(1)}g
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-wellness-softGreen/20">Carbs</td>
                    <td className={`py-2 px-4 text-right border-b border-wellness-softGreen/20`}>
                      {result.food1.carbs.toFixed(1)}g
                    </td>
                    <td className={`py-2 px-4 text-right border-b border-wellness-softGreen/20`}>
                      {result.food2.carbs.toFixed(1)}g
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Fiber</td>
                    <td className={`py-2 px-4 text-right ${getComparisonClass(result.food1.fiber, result.food2.fiber, true)}`}>
                      {result.food1.fiber.toFixed(1)}g
                    </td>
                    <td className={`py-2 px-4 text-right ${getComparisonClass(result.food2.fiber, result.food1.fiber, true)}`}>
                      {result.food2.fiber.toFixed(1)}g
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {result.insights && (
              <div className="mt-4 p-4 bg-wellness-softGreen/30 rounded-lg">
                <h4 className="font-medium text-wellness-darkGreen mb-2">AI Insights</h4>
                <p className="text-wellness-charcoal text-sm whitespace-pre-line">{result.insights}</p>
              </div>
            )}
            
            {!result.insights && (
              <div className="mt-4 p-3 bg-wellness-softGreen/30 rounded-lg text-sm">
                <span className="font-medium text-wellness-darkGreen">Summary:</span> {' '}
                {result.food1.calories < result.food2.calories
                  ? `${result.food1.name} has ${(result.food2.calories - result.food1.calories).toFixed(1)} fewer calories than ${result.food2.name}.`
                  : `${result.food2.name} has ${(result.food1.calories - result.food2.calories).toFixed(1)} fewer calories than ${result.food1.name}.`
                } {' '}
                {result.food1.protein > result.food2.protein
                  ? `${result.food1.name} provides ${(result.food1.protein - result.food2.protein).toFixed(1)}g more protein.`
                  : `${result.food2.name} provides ${(result.food2.protein - result.food1.protein).toFixed(1)}g more protein.`
                }
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodComparison;
