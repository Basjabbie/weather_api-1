// import { Request, Response } from "express";
// import { validationResult } from "express-validator";
// import { generateFoodData } from "../services/foodService.js"; // Updated import

// export const getFoodData = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.error("Validation error", errors.mapped());
//     res.status(400).json({ errors: errors.array() });
//     return;
//   }

//   try {
//     const { foodType } = req.params;
//     let finalFoodData: FoodData;
//     const foodCategoryMap = {
//       pizza: 'Regular', // Assume 'Regular' for pizzas
//       suzzi: 'Vegan'   // Assume 'Vegan' for suzzis
//     };

//     if (foodType in foodCategoryMap) {
//       finalFoodData = await generateFoodData(foodType, foodCategoryMap[foodType]);
//     } else {
//       res.status(404).send("foodType not found");
//       return;
//     }

//     res.status(200).json(finalFoodData);
//   } catch (error) {
//     console.error("Error in fetching food data", error);
//     res.status(500).send("Error in fetching food data");
//   }
// };

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { generateFoodData } from "../services/foodService.js";
//import { FoodData } from "../types"; // Assuming you have a type definition file

export const getFoodData = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation error", errors.mapped());
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { foodType } = req.params;
  const foodCategoryMap = {
    pizza: 'Regular', // Assume 'Regular' for pizzas
    sushi: 'Vegan',    // Assume 'Vegan' for sushis
    burger: 'Regular',  // Assume 'Regular' for burgers
    salad: 'Vegan'      // Assume 'Vegan' for salads; can also be 'Vegetarian'
  };

  try {
    const category = foodCategoryMap[foodType];
    if (!category) {
      console.error("Food type not found:", foodType);
      res.status(404).send("Food type not found: " + foodType);
      return;
    }

    const finalFoodData: FoodData = await generateFoodData(foodType, category);
    res.status(200).json(finalFoodData);
  } catch (error) {
    console.error("Error in fetching food data for", foodType, ":", error);
    res.status(500).send("Error in fetching food data");
  }
};

  // try {
  //   if (!foodCategoryMap[foodType]) {
  //     res.status(404).send("Food type not found: " + foodType);
  //     return;
  //   }

//     const finalFoodData: FoodData = await generateFoodData(foodType, foodCategoryMap[foodType]);
//     res.status(200).json(finalFoodData);
//   } catch (error) {
//     console.error("Error in fetching food data for", foodType, ":", error);
//     res.status(500).send("Error in fetching food data");
//   }
// };

