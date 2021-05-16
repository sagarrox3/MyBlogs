const express = require("express");
const ejs = require("ejs")
const _ = require("lodash");
const bodyParser = require("body-parser")
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const arrPost = [];

const homeContent = "Hello there..!! This is your personal daily blog post website. You can compose as many you want and access them very easily.";
const aboutContent = "My name is Sagar Aggarwal and this is my one of first project with Node and Express. Publish and Enjoy ✌";
const contactContent = "You can contact me at ";

app.get("/", (req, res) => {
    res.render("home", { HomeContent: homeContent, formArr:arrPost });
});

app.get("/about", (req, res) => {
    res.render("about", { AboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
    res.render("contact", { ContactContent: contactContent });
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const postTitle = req.body.postTitle;
    const postBody = req.body.postBody;

    const formObject = { title: postTitle, body: postBody };
    arrPost.push(formObject);
    res.redirect("/"); 

});

app.get("/post/:postName", (req,res) => {
    const paramName = _.lowerCase(req.params.postName);
    arrPost.forEach(
        function(variableName){
            if(_.lowerCase(variableName.title) === paramName)
            {
                res.render("post", {
                    dynamicPost : variableName.title,
                    dynamicPostBody : variableName.body
                });
            }
        }
    );
});

app.listen(port, () => {
    console.log("Listening");
});