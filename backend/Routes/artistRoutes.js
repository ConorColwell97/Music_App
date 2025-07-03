const express = require("express");
const { getArtist, addArtist, deleteArtist, updateArtistName, updateArtistListeners, updateArtistGenre } = require("../Controllers/artistController");
const router = express.Router();

router.get("/:name", getArtist);
router.post("/", addArtist);
router.delete("/:name", deleteArtist);
router.put("/name/:name", updateArtistName);
router.put("/monthly/:monthly", updateArtistListeners);
router.put("/genre/:genre", updateArtistGenre);

module.exports = router;