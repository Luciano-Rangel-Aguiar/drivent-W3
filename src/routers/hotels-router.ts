import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getHotelWhitRooms } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", getHotelWhitRooms);
export { hotelsRouter };
