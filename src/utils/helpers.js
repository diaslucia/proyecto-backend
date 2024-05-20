import fs from "fs";
import __dirname from "../dirname.js";

export const findFile = (path) => {
  const data = fs.readFileSync(`${__dirname}/data/${path}.json`, "utf-8");
  const item = JSON.parse(data);
  return item;
};

export const findById = (data, idToFind) => {
  return data.find((i) => i.id == idToFind);
};

export const findByIndex = (data, idToFind) => {
  return data.indexOf((i) => i.id == idToFind);
};

export const writeFile = (path, item) => {
  fs.writeFileSync(`${__dirname}/data/${path}.json`, JSON.stringify(item));
};
