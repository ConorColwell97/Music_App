const db = require("../db");

const getArtist = (req, res) => {
    const artistName = req.params.name;

    db.query("SELECT * FROM Artists WHERE Name = ?", [artistName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } 

        if (results.length === 0) {
            return res.status(404).json({ message: "Artist not found" });
        }

        res.json(results[0]);
    });
};

const addArtist = (req, res) => {
    const { Name, MonthlyListeners, Genre, Songs, Albums } = req.body;

    const songs = Songs ? Songs : JSON.stringify([]);
    const albums = Albums ? Albums : JSON.stringify([]);

    db.query(
        "INSERT INTO Artists (Name, MonthlyListeners, Genre, songs, albums) VALUES (?, ?, ?, ?, ?)",
        [Name, MonthlyListeners, Genre, songs, albums],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Artist added", artistId: result.insertId });
        }
    );
};

const deleteArtist = (req, res) => {
    const artistName = req.params.name;
    
    db.query("DELETE FROM Artists WHERE Name = ?", [artistName], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
    
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Artist not found" });
        }
    
        res.json({ message: "Artist deleted successfully" });
    });
};

const updateArtistName = (req, res) => {
    const currentName = req.params.name;
    const newName = req.body.newName;

    console.log("Received PUT request to update artist name.");
    console.log("Current Name:", currentName);
    console.log("New Name:", newName);

    db.query("UPDATE Artists SET Name = ? WHERE Name = ?", [newName, currentName], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Artist not found" });
        }

        res.json({ message: "Artist name updated successfully" });
    });
};

const updateArtistListeners = (req, res) => {
    const currentMonthly = req.params.monthly;
    const newMonthly = req.body.newMonthly;

    console.log("Received PUT request to update artist Listeners.");
    console.log("Current Listeners:", currentMonthly);
    console.log("New Listeners:", newMonthly);

    db.query("UPDATE Artists SET MonthlyListeners = ? WHERE MonthlyListeners = ?", [newMonthly, currentMonthly], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Artist not found" });
        }

        res.json({ message: "Artist Monthly Listeners updated successfully" });
    });
};

const updateArtistGenre = (req, res) => {
    const currentGenre = req.params.genre;
    const newGenre = req.body.newGenre;

    console.log("Received PUT request to update artist Genre.");
    console.log("Current Genre:", currentGenre);
    console.log("New Genre:", newGenre);

    db.query("UPDATE Artists SET Genre = ? WHERE Genre = ?", [newGenre, currentGenre], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Artist not found" });
        }

        res.json({ message: "Artist Genre updated successfully" });
    });
};

module.exports = { getArtist, addArtist, deleteArtist, updateArtistName, updateArtistListeners, updateArtistGenre };