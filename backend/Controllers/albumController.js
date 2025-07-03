const db = require("../db");

const getAlbum = (req, res) => {
    const albumName = req.params.albName;

    db.query("SELECT * FROM Albums WHERE Name = ?", [albumName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } 

        if (results.length === 0) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.json(results[0]);
    });
};

const addAlbum = (req, res) => {

    if(req.method === "POST") {
        const { Name, Artist, ReleaseYear, NumberOfListeners, Songs } = req.body;
        const songs = Songs ? Songs : JSON.stringify([]);

        db.query(
            "INSERT INTO Albums (Name, Artist, ReleaseYear, NumberOfListeners, songs) VALUES (?, ?, ?, ?, ?)",
                [Name, Artist, ReleaseYear, NumberOfListeners, songs],
                (err, result) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.status(201).json({ message: "Album added", albumId: result.insertId });
                }
            );
    } else if(req.method === "PUT") {
        const { Name, Artist } = req.body;

        db.query("UPDATE Artists SET Albums = JSON_ARRAY_APPEND(Albums, '$', ?) WHERE Name = ?", [Name, Artist], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
        
                if (results.affectedRows === 0) {
                    return res.status(404).json({ message: "Album not found" });
                }
        
                res.json({ message: "Album name updated successfully" });
            });
    }
    
};

const deleteAlbum = (req, res) => {
    const albumName = req.params.albName;
    
    db.query("DELETE FROM Albums WHERE Name = ?", [albumName], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
    
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Album not found" });
        }
    
        res.json({ message: "Album deleted successfully" });
    });
};

const updateAlbumName = (req, res) => {
    const currentAlbName = req.params.albName;
    const newAlbName = req.body.newName;

    console.log("Received PUT request to update album name.");
    console.log("Current Name:", currentAlbName);
    console.log("New Name:", newAlbName);

    db.query("UPDATE Albums SET Name = ? WHERE Name = ?", [newAlbName, currentAlbName], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.json({ message: "Album name updated successfully" });
    });
};

const updateAlbumReleaseYear = (req, res) => {
    const currentYear = req.params.year;
    const newYear = req.body.newYear;

    console.log("Received PUT request to update album release year.");
    console.log("Current year:", currentYear);
    console.log("New year:", newYear);

    db.query("UPDATE Albums SET ReleaseYear = ? WHERE ReleaseYear = ?", [newYear, currentYear], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.json({ message: "Album Release Year updated successfully" });
    });
};

const updateAlbumArtist = (req, res) => {
    const currentArtist = req.params.albArtist;
    const newArtist = req.body.newArtist;

    console.log("Received PUT request to update album artist.");
    console.log("Current artist:", currentArtist);
    console.log("New artist:", newArtist);

    db.query("UPDATE Albums SET Artist = ? WHERE Artist = ?", [newArtist, currentArtist], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.json({ message: "Album Artist updated successfully" });
    });
};

const updateAlbumListeners = (req, res) => {
    const currentListeners = req.params.listeners;
    const newListeners = req.body.newListeners;

    console.log("Received PUT request to update album listeners.");
    console.log("Current Listeners:", currentListeners);
    console.log("New Listeners:", newListeners);

    db.query("UPDATE Albums SET NumberOfListeners = ? WHERE NumberOfListeners = ?", [newListeners, currentListeners], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.json({ message: "Album Listeners updated successfully" });
    });
};

module.exports = { getAlbum, addAlbum, deleteAlbum, updateAlbumName, updateAlbumArtist, updateAlbumReleaseYear, updateAlbumListeners };