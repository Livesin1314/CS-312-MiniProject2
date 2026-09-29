//import the Express and Axios for web server and API
const express = require("express");
const axios = require("axios");
//have the express application and setting the port number
const app = express();
const PORT = 3000;

//Have the express use EJS as the view engine
app.set("view engine", "ejs");

//Have the express files from the public folder
app.use(express.static("public"));

//The home page when the user vists localhost:3000
app.get("/", (req, res) => {
    //set the render of index.ejs for start of webpage
    res.render("index", {
        cocktail: null,
        error: null
    });
});
//
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/random-cocktail", async (req, res) => {
    try {
        // Request a random cocktail from TheCocktailDB
        const response = await axios.get(
            "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );

        //Get the API Cocktail from the API and stores
        const cocktail = response.data.drinks[0];

        //have the cocktail information on index.ejs
        res.render("index", {
            cocktail: cocktail,
            error: null
        });
        //if there is an error
    } catch (error) {
        //print the error message on the termainl
        console.error("API Error:", error.message);

        // Display an error message if the API request fails
        res.render("index", {
            cocktail: null,
            error: "Sorry, we could not retrieve a cocktail. Please try again."
        });
    }
});