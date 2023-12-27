const express = require("express");
const cors = require("cors");
const header_routes = require("./routes/menu");
const socialInfo_routes = require("./routes/social");

const app = express();

app.use(express.json());
app.use(cors());

//heading
app.use("/header", header_routes);
//social info
app.use("/social", socialInfo_routes);

app.listen(8000, () => {
  console.log(`server runing at 8000 port`);
});
