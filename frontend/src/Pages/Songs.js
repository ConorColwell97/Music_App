import './Songs.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Songs = () => {
    const navigate = useNavigate();

    // User input use state
    const [songName, setSongName] = useState("");
    
    // Album information use state
    const [songData, setSongData] = useState(null);
    
    // Success/Error use states
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    
    // Search use state
    const [showSearch, setShowSearch] = useState(false);
    // Delete use state
    const [showDel, setShowDel] = useState(false);
    // Add song use state
    const [showAdd, setShowAdd] = useState(false);
    // New song data
    const [newSongName, setNewSongName] = useState("");
    const [newSongReleaseYear, setNewSongReleaseYear] = useState("");
    const [newSongAlbum, setNewSongAlbum] = useState("");
    
    // Update song use state
    const [showUpdate, setShowUpdate] = useState(false);
    // Update field use state
    const [showUpdateName, setShowUpdateName] = useState(false);
    const [showUpdateYear, setShowUpdateYear] = useState(false);
    const [showUpdateAlbum, setShowUpdateAlbum] = useState(false);
    // Update fields
    const [updName, setUpdName] = useState("");
    const [newName, setNewName] = useState("");
    const [updYear, setUpdYear] = useState("");
    const [newYear, setNewYear] = useState("");
    const [updAlbum, setUpdAlbum] = useState("");
    const [newAlbum, setNewAlbum] = useState("");

    const fetchSong = async () => {
        try {
            setError(null);
            const response = await axios.get(`http://localhost:5000/songs/${encodeURIComponent(songName)}`);
            console.log("API Response:", response.data);
            setSongData(response.data);
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateYear(false);
            setShowUpdateAlbum(false);
        } catch (err) {
            console.error("Error fetching song:", err);
            setSongData(null);
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const addSong = async () => {
        try {
            setError(null);
            const response = await axios.post("http://localhost:5000/songs", {
                Name: newSongName,
                ReleaseYear: newSongReleaseYear,
                Album: newSongAlbum,
            });

            const response2 = await axios.get(`http://localhost:5000/songs/songArt/${encodeURIComponent(newSongAlbum)}`);
            const ArtistName = response2.data.Artist;

            const response3 = await axios.put(`http://localhost:5000/songs/songAdd/${encodeURIComponent(ArtistName)}`, {Name: newSongName, Artist: ArtistName, Album: newSongAlbum});

            setNewSongName("");
            setNewSongReleaseYear("");
            setNewSongAlbum("");
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setSongData(null);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateYear(false);
            setShowUpdateAlbum(false);
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const deleteSong = async () => {
        try {
            setError(null);
            const response = await axios.delete(`http://localhost:5000/songs/${encodeURIComponent(songName)}`);
            setSongData(null);
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateYear(false);
            setShowUpdateAlbum(false);
            setSuccessMessage(response.data.message);
            
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const updateSongName = async () => {
        console.log("Attempting to update song...");
        console.log("Current Name:", updName);
        console.log("New Name:", newName);

        try {
            setError(null);
            const response = await axios.put(`http://localhost:5000/songs/songName/${encodeURIComponent(updName)}`, {newSongName: newName}, { headers: { "Content-Type": "application/json" } });
            setUpdName("");
            setNewName("");
            setUpdYear("");
            setNewYear("");
            setUpdAlbum("");
            setNewAlbum("");
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateYear(false);
            setShowUpdateAlbum(false);
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const updateSongReleaseYear = async () => {
        console.log("Attempting to update song...");
        console.log("Current Release Year:", updYear);
        console.log("New Year:", newYear);

        try {
            setError(null);
            const response = await axios.put(`http://localhost:5000/songs/songYear/${encodeURIComponent(updYear)}`, {newYear}, { headers: { "Content-Type": "application/json" } });
            setUpdName("");
            setNewName("");
            setUpdYear("");
            setNewYear("");
            setUpdAlbum("");
            setNewAlbum("");
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateYear(false);
            setShowUpdateAlbum(false);
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const updateSongAlbum = async () => {
        console.log("Attempting to update song...");
        console.log("Current Album:", updAlbum);
        console.log("New Album:", newAlbum);

        try {
            setError(null);
            const response = await axios.put(`http://localhost:5000/songs/songAlbum/${encodeURIComponent(updAlbum)}`, {newAlbum}, { headers: { "Content-Type": "application/json" } });
            setUpdName("");
            setNewName("");
            setUpdYear("");
            setNewYear("");
            setUpdAlbum("");
            setNewAlbum("");
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateYear(false);
            setShowUpdateAlbum(false);
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className='SongsDiv'>
            <h1 className='SongsHeader'>
                🎵 Songs
            </h1>
            <div className='ButtonDiv'>
                <button className='Buttons' onClick={() => navigate("/")}>Go Home</button>
                <button className='Buttons' onClick={() => navigate("/Artists")}>Go to Artists</button>
                <button className='Buttons' onClick={() => navigate("/Albums")}>Go to Albums</button>
            </div>

            {showSearch && (
                <div className='ButtonDiv'>
                    <input 
                        type="text"
                        placeholder="Enter Song Name" 
                        className="userInput" 
                        value={songName} 
                        onChange={(e) => setSongName(e.target.value)} 
                    />
                    <button className="Buttons" onClick={fetchSong}>Search</button>
                </div>
            )}

            {showDel && (
                <div className='ButtonDiv'>
                    <input 
                        type="text"
                        placeholder="Enter Song Name" 
                        className="userInput" 
                        value={songName} 
                        onChange={(e) => setSongName(e.target.value)} 
                    />
                    <button className="Buttons" onClick={deleteSong}>Delete</button>
                </div>
            )}

          <div className="ButtonDiv">
                <button className="Buttons" onClick={() => setShowAdd(!showAdd)}>Add Song</button>
                <button className="Buttons" onClick={() => setShowSearch(!showSearch)}>Search Song</button>
                <button className="Buttons" onClick={() => setShowDel(!showDel)}>Delete Song</button>
                <button className="Buttons" onClick={() => setShowUpdate(!showUpdate)}>Update Song</button>
         </div>

            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {songData && (
                <div className="displaySongs">
                    <h2 style={{color : "white"}}>Name: {songData.Name}</h2>
                    <p style={{color : "white"}}>Release Year: {songData.ReleaseYear}</p>
                    <p style={{color : "white"}}>Album: {songData.Album}</p>
                </div>
            )}
            
            {showAdd && (
                <div>
                    <h2>Add New Song</h2>
                    <input 
                        type="text" 
                        placeholder="Song Name" 
                        value={newSongName} 
                        onChange={(e) => setNewSongName(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Release Year" 
                        value={newSongReleaseYear} 
                        onChange={(e) => setNewSongReleaseYear(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Album" 
                        value={newSongAlbum} 
                        onChange={(e) => setNewSongAlbum(e.target.value)} 
                    />
                    <button className="Buttons" onClick={addSong}>Submit</button>
                </div>
            )}

            {showUpdate && (
                <div>
                    <h2>Choose which field to update</h2>
                    <button className="Buttons" onClick={() => setShowUpdateName(!showUpdateName)}>Update Name</button>
                    <button className="Buttons" onClick={() => setShowUpdateYear(!showUpdateYear)}>Update Release Year</button>
                    <button className="Buttons" onClick={() => setShowUpdateAlbum(!showUpdateAlbum)}>Update Album</button>
                </div>
            )}

            {showUpdateName && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Song Name" 
                        value={updName} 
                        onChange={(e) => setUpdName(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="New Song Name" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                    />
                    <button className="Buttons" onClick={updateSongName}>Submit</button>
                </div>
            )}

            {showUpdateYear && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Release Year" 
                        value={updYear} 
                        onChange={(e) => setUpdYear(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="New Release Year" 
                        value={newYear} 
                        onChange={(e) => setNewYear(e.target.value)} 
                    />
                    <button className="Buttons" onClick={updateSongReleaseYear}>Submit</button>
                </div>
            )}

            {showUpdateAlbum && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Album" 
                        value={updAlbum} 
                        onChange={(e) => setUpdAlbum(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="New Album" 
                        value={newAlbum} 
                        onChange={(e) => setNewAlbum(e.target.value)} 
                    />
                    <button className="Buttons" onClick={updateSongAlbum}>Submit</button>
                </div>
            )}
        </div>
    );
}

export default Songs;