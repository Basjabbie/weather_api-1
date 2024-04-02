import { Request, Response } from "express";
import {
  generatePizzaFoodData,
  generateSuzziFoodData,
} from "../services/foodService.js";
import { validationResult } from "express-validator";

/**
 * Gets the food data for a specified food type
 * @param req the request object
 * @param res the response object
 */
export const getFoodData = async (req: Request, res: Response) => {
  // We will use the validationResult function to check if there are any validation errors
  const errors = validationResult(req);

  // If there are validation errors, we will log them and send a 400 status code
  if (!errors.isEmpty()) {
    console.error("Validation error", errors.mapped());
    res.status(400).json({ errors: errors.array() });
    return;
  }

  // We will use a try catch block to catch any errors
  try {
    // Get the city param from the request
    const { foodType } = req.params;
    console.log(foodType);

    // We will create a variable with a type of WeatherData
    let finalFoodData: FoodData;

    // We will use an if statement to check which city was passed in
    if (foodType === "Pizza") {
      console.log(generatePizzaFoodData());
      finalFoodData = generatePizzaFoodData();
    } else if (foodType === "Suzzi") {
      finalFoodData = generateSuzziFoodData();
    } else {
      // If the city is not london or dublin, we will throw an error
      res.status(404).send("${foodType} not found");
    }

    // We will return the weather data as JSON
    res.status(200).json(finalFoodData);
  } catch (error) {
    // If there is an error, we will log it and send a 500 status code
    res.status(500).send("Error in fetching food data");
  }
};
