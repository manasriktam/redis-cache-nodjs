import "dotenv/config";
import redis from "redis";
import express from "express";
import fetch from "node-fetch";

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient(REDIS_PORT);
redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();
const app = express();

// Set response
function setResponse(title, description) {
  return `<div><h2>${title}</h2><p>${description}</p></div>`;
}

// Make request to Github for data
async function getRepos(req, res, next) {
  try {
    console.log("Fetching Data...");
    const { id } = req.params;

    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();

    const { title, description } = data;
    // Set to redis
    // Set data to Redis with expiration (3600 seconds)
    redisClient.set("title", title, (err, reply) => {
      if (err) throw err;
      redisClient.expire("title", 3600);
    });

    redisClient.set("description", description, (err, reply) => {
      if (err) throw err;
      redisClient.expire("description", 3600);
    });

    res.send(setResponse(title, description));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

app.get("/repos/:id", getRepos);

// Handle Redis client errors
redisClient.on("error", function (error) {
  console.error("Redis client error:", error);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
