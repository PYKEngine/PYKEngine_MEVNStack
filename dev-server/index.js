const express = require("express");
const { registerRoutes } = require("./routes")
const setEnvironment = require("./config/env")
const connectToDB = require("./config/db")

const app = express();

setEnvironment(app)
connectToDB()
registerRoutes(app)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.VUE_APP_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = 5555;

// Init Maddleware
app.use(
  express.json({
    extended: false
  })
);

app.get('*', (req, res) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
    return res.send(
      `Running server in ${process.env.NODE_ENV} mode!`
    );
  } else {
    // Returns the main index file in production environment
    return res.sendFile('index.html', { root: __dirname + '/../dist/' });
  }
})

app.listen(PORT, () => {
  console.log(`Awaiting orders on port ${PORT}!`);
});