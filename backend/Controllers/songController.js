const db = require("../db");

const getSong = (req, res) => {
    const songName = req.params.songName;

    db.query("SELECT * FROM Songs WHERE Name = ?", [songName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } 

        if (results.length === 0) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json(results[0]);
    });
};

const addSong = (req, res) => {
    if(req.method === "POST") {
        const { Name, ReleaseYear, Album } = req.body;
        db.query(
            "INSERT INTO Songs (Name, ReleaseYear, Album) VALUES (?, ?, ?)",
            [Name, ReleaseYear, Album],
            (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: "Song added", songId: result.insertId });
            }
        );
    } else if(req.method === "GET") {
        const Album = req.params.songArt;
        console.log("Album: " + Album);

        db.query("SELECT Artist FROM Albums WHERE Name = ?", [Album], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            } 
    
            if (results.length === 0) {
                return res.status(404).json({ message: "Artist not found" });
            }
    
            res.json(results[0]);
        });

    } else if(req.method === "PUT") {
        const { Name, Artist, Album } = req.body;

        console.log("Artist: " + Artist);
        console.log("Song: " + Name);

        db.query("UPDATE Artists SET Songs = JSON_ARRAY_APPEND(Songs, '$', ?) WHERE Name = ?", [Name, Artist], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
    
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Artist not found" });
            }
        });

        db.query("UPDATE Albums SET Songs = JSON_ARRAY_APPEND(Songs, '$', ?) WHERE Name = ?", [Name, Album], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
    
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Artist not found" });
            }
    
        });
    }
    
};

const deleteSong = (req, res) => {
    const songName = req.params.songName;
    
    db.query("DELETE FROM Songs WHERE Name = ?", [songName], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
    
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Song not found" });
        }
    
        res.json({ message: "Song deleted successfully" });
    });
};

const updateSongName = (req, res) => {
    const currentSongName = req.params.songName;
    const newSongName = req.body.newSongName;

    console.log("Received PUT request to update song name.");
    console.log("Current Name:", currentSongName);
    console.log("New Name:", newSongName);

    db.query("UPDATE Songs SET Name = ? WHERE Name = ?", [newSongName, currentSongName], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json({ message: "Song name updated successfully" });
    });
};

const updateSongYear = (req, res) => {
    const currentYear = req.params.songYear;
    const newYear = req.body.newYear;

    console.log("Received PUT request to update song release year.");
    console.log("Current year:", currentYear);
    console.log("New year:", newYear);

    db.query("UPDATE Songs SET ReleaseYear = ? WHERE ReleaseYear = ?", [newYear, currentYear], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json({ message: "Song Release Year updated successfully" });
    });
};

const updateSongAlbum = (req, res) => {
    const currentAlbum = req.params.songAlbum;
    const newAlbum = req.body.newAlbum;

    console.log("Received PUT request to update song album.");
    console.log("Current Album:", currentAlbum);
    console.log("New Album:", newAlbum);

    db.query("UPDATE Songs SET Album = ? WHERE Album = ?", [newAlbum, currentAlbum], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json({ message: "Song Album updated successfully" });
    });
};

module.exports = { getSong, addSong, deleteSong, updateSongName, updateSongYear, updateSongAlbum };