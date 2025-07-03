const express = require("express");
const { getSong, addSong, deleteSong, updateSongName, updateSongYear, updateSongAlbum } = require("../Controllers/songController");

const router = express.Router();

router.get("/:songName", getSong);
router.post("/", addSong);
router.get("/songArt/:songArt", addSong);
router.put("/songAdd/:songAdd", addSong);
router.delete("/:songName", deleteSong);
router.put("/songName/:songName", updateSongName);
router.put("/songYear/:songYear", updateSongYear);
router.put("/songAlbum/:songAlbum", updateSongAlbum);

module.exports = router;