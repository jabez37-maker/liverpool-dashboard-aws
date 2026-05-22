process.on("uncaughtException", err => {
  console.error(err);
});

process.on("unhandledRejection", err => {
  console.error(err);
});

const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "*"
}));
const API_KEY = process.env.FOOTBALL_API_KEY;

const BASE_URL = "https://api.football-data.org/v4";

const headers = {
  "X-Auth-Token": API_KEY
};

// ======================================
// LIVERPOOL TEAM
// ======================================

app.get("/api/liverpool", async (req, res) => {

  try {

    const response = await fetch(
      `${BASE_URL}/teams/64`,
      { headers }
    );

    const data = await response.json();

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// ======================================
// PREMIER LEAGUE STANDINGS
// ======================================

app.get("/api/standings", async (req, res) => {

  try {

    const response = await fetch(
      `${BASE_URL}/competitions/PL/standings`,
      { headers }
    );

    const data = await response.json();

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// ======================================
// LIVERPOOL MATCHES
// ======================================

app.get("/api/matches", async (req, res) => {

  try {

    const response = await fetch(
      `${BASE_URL}/teams/64/matches`,
      { headers }
    );

    const data = await response.json();
     console.log(data);
    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// ======================================
// NEWS
// ======================================

app.get("/api/news", async (req, res) => {

  try {

    const response = await fetch(

  `https://newsapi.org/v2/everything?q="Liverpool FC" OR "Liverpool football club" OR LFC&language=en&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`

);

    const data = await response.json();
   
    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

app.get("/api/players", async (req, res) => {

    try {

        let allPlayers = [];

        for (let page = 1; page <= 4; page++) {

            const response = await fetch(
                `https://v3.football.api-sports.io/players?team=40&season=2024&page=${page}`,
                {
                    method: "GET",
                    headers: {
                        "x-apisports-key": process.env.API_FOOTBALL_KEY
                    }
                }
            );

            const data = await response.json();

            allPlayers.push(...data.response);

        }

        res.json(allPlayers);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// ======================================
// SERVER
// ======================================

app.listen(3000, "0.0.0.0", () => {

  console.log("Server running on port 3000");

});