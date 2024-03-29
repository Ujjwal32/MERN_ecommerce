const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

app.use(cors());
// app.use(express.bodyParser({})
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/category", categoryRoutes);

app.listen(PORT, () => {
  console.log("server started");
});
