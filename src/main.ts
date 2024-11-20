import "./style.css";
import {
  addChristmasCarousel,
  addChristmasLights,
  getChristmasWorld,
  showTheWorldToTheChildren,
} from "./christmas-utils.ts";

getChristmasWorld()
  .then(addChristmasLights)
  .then(addChristmasCarousel)
  .then(showTheWorldToTheChildren);
