const express = require("express");
const ejs = require("ejs")
const _ = require("lodash");
const bodyParser = require("body-parser")
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const arrPost = [];

const homeContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const contactContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

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

app.listen(8080, () => {
    console.log("Listening at 8080");
});