const { log } = require("console");
const express = require("express");
// const serverless = require("serverless-http");
const app = express();

app.get("/", async (req, res) => {
  log("hello");
  const resp = await fetch("https://api.github.com/users");
  const data = await resp.json();
  res.status(200).send({ message: data });
});

app.get("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const resp = await fetch(`https://api.github.com/users/${name}`);
    const data = await resp.json();
    const { login, html_url, avatar_url } = data;
    res.status(200).send({ message: { login, html_url, avatar_url } });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

app.post("/:name", async (req, res) => {
  const { name } = req.params;
  const resp = await fetch(`https://api.github.com/users/${name}`);
  const data = await resp.json();
  const { login, html_url, avatar_url } = data;
  res.status(200).send({ message: { login, html_url, avatar_url } });
});

app.post("/getuser", async (req, res) => {
  const { name } = req.body;
  //   log(req.bo);
  const resp = await fetch(`https://api.github.com/users/${name}`);
  const data = await resp.json();
  const { login, html_url, avatar_url } = data;
  res.status(200).send({ message: { login, html_url, avatar_url } });
});

app.listen("3000", () => {
  console.log("running....");
});
