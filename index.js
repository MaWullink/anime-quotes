import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
const BASE_URL = "https://api.animechan.io/v1";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(BASE_URL + "/quotes/random");
    const quoteData = response.data.data;

    const randomNumber = Math.floor(Math.random() * 7) + 1;
    const randomImage = `images/anime${randomNumber}.png`;

    res.render("index.ejs", {
      quote: quoteData.content,
      anime: quoteData.anime.name,
      character: quoteData.character.name,
      image: randomImage,
    });
  } catch (error) {
    console.error("API failed, using backup quote:", error.message);

    // Backup quote
    const backupQuote = {
      quote: "No one can decide what someone else should do with their life.",
      anime: "Fairy Tail",
      character: "Makarov Dreyar",
    };

    const randomNumber = Math.floor(Math.random() * 7) + 1;
    const randomImage = `images/anime${randomNumber}.png`;

    res.render("index.ejs", {
      quote: backupQuote.quote,
      anime: backupQuote.anime,
      character: backupQuote.character,
      image: randomImage,
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
