import express from "express";
import authRoutes from "./routes/auth.js";
import homepageRoutes from "./routes/homepage.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use(authRoutes);
app.use(homepageRoutes);

app.listen(port, () => {
  console.log(`The app is listening on port: ${port}`);
});
