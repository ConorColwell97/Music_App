const express = require("express");
const artistRoutes = require("./Routes/artistRoutes");
const albumRoutes = require("./Routes/albumRoutes");
const songRoutes = require("./Routes/songRoutes");
const cors = require("cors");
require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded());

server.use("/artists", artistRoutes);
server.use("/albums", albumRoutes);
server.use("/songs", songRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});