import "./Artists.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Artists = () => {
    const navigate = useNavigate();

    // User input use state
    const [artistName, setArtistName] = useState("");

    // Artist information use state
    const [artistData, setArtistData] = useState(null);

    // Success/Error use states
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    // Search use state
    const [showSearch, setShowSearch] = useState(false);
    // Delete use state
    const [showDel, setShowDel] = useState(false);
    // Add artist use state
    const [showAdd, setShowAdd] = useState(false);
    // New artist data
    const [newArtistName, setNewArtistName] = useState("");
    const [newArtistMonthlyListeners, setNewArtistMonthlyListeners] = useState("");
    const [newArtistGenre, setNewArtistGenre] = useState("");

    // Update Artist use state
    const [showUpdate, setShowUpdate] = useState(false);
    // Update field use state
    const [showUpdateName, setShowUpdateName] = useState(false);
    const [showUpdateMonthly, setShowUpdateMonthly] = useState(false);
    const [showUpdateGenre, setShowUpdateGenre] = useState(false);
    // Update fields
    const [updName, setUpdName] = useState("");
    const [newName, setNewName] = useState("");
    const [updMonthly, setUpdMonthly] = useState("");
    const [newMonthly, setNewMonthly] = useState("");
    const [updGenre, setUpdGenre] = useState("");
    const [newGenre, setNewGenre] = useState("");


    const fetchArtist = async () => {
        try {
            setError(null);
            const response = await axios.get(`http://localhost:5000/artists/${encodeURIComponent(artistName)}`);
            console.log("API Response:", response.data);
            setArtistData(response.data);
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateMonthly(false);
            setShowUpdateGenre(false);
        } catch (err) {
            console.error("Error fetching artist:", err);
            setArtistData(null);
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const addArtist = async () => {
        try {
            setError(null);
            const response = await axios.post("http://localhost:5000/artists", {
                Name: newArtistName,
                MonthlyListeners: newArtistMonthlyListeners,
                Genre: newArtistGenre,
                Songs: JSON.stringify([]),
                albums: JSON.stringify([])
            });

            setSuccessMessage(response.data.message);
            setNewArtistName("");
            setNewArtistMonthlyListeners("");
            setNewArtistGenre("");
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setArtistData(null);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateMonthly(false);
            setShowUpdateGenre(false);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const deleteArtist = async () => {
        try {
            setError(null);
            const response = await axios.delete(`http://localhost:5000/artists/${encodeURIComponent(artistName)}`);
            setArtistData(null);
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateMonthly(false);
            setShowUpdateGenre(false);
            setSuccessMessage(response.data.message);
            
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const updateArtistName = async () => {
        console.log("Attempting to update artist...");
        console.log("Current Name:", updName);
        console.log("New Name:", newName);

        try {
            setError(null);
            const response = await axios.put(`http://localhost:5000/artists/name/${encodeURIComponent(updName)}`, {newName}, { headers: { "Content-Type": "application/json" } });
            setUpdName("");
            setNewName("");
            setUpdMonthly("");
            setNewMonthly("");
            setUpdGenre("");
            setNewGenre("");
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateMonthly(false);
            setShowUpdateGenre(false);
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const updateArtistListeners = async () => {
        console.log("Attempting to update artist...");
        console.log("Current Monthly Listeners:", updMonthly);
        console.log("New Name:", newMonthly);

        try {
            setError(null);
            const response = await axios.put(`http://localhost:5000/artists/monthly/${encodeURIComponent(updMonthly)}`, {newMonthly}, { headers: { "Content-Type": "application/json" } });
            setUpdName("");
            setNewName("");
            setUpdMonthly("");
            setNewMonthly("");
            setUpdGenre("");
            setNewGenre("");
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateMonthly(false);
            setShowUpdateGenre(false);
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const updateArtistGenre = async () => {
        console.log("Attempting to update artist...");
        console.log("Current Genre:", updGenre);
        console.log("New Genre:", newGenre);

        try {
            setError(null);
            const response = await axios.put(`http://localhost:5000/artists/genre/${encodeURIComponent(updGenre)}`, {newGenre}, { headers: { "Content-Type": "application/json" } });
            setUpdName("");
            setNewName("");
            setUpdMonthly("");
            setNewMonthly("");
            setUpdGenre("");
            setNewGenre("");
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateMonthly(false);
            setShowUpdateGenre(false);
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className='ArtistDiv'>
            <h1 className='ArtistHeader'>
                🎵 Artists
            </h1>
            <div className='ButtonDiv'>
                <button className='Buttons' onClick={() => navigate("/")}>Go Home</button>
                <button className='Buttons' onClick={() => navigate("/Albums")}>Go to Albums</button>
                <button className='Buttons' onClick={() => navigate("/Songs")}>Go to Songs</button>
            </div>

            {showSearch && (
                <div className='ButtonDiv'>
                    <input 
                        type="text"
                        placeholder="Enter Artist Name" 
                        className="userInput" 
                        value={artistName} 
                        onChange={(e) => setArtistName(e.target.value)} 
                    />
                    <button className="Buttons" onClick={fetchArtist}>Search</button>
                </div>
            )}

            {showDel && (
                <div className='ButtonDiv'>
                    <input 
                        type="text"
                        placeholder="Enter Artist Name" 
                        className="userInput" 
                        value={artistName} 
                        onChange={(e) => setArtistName(e.target.value)} 
                    />
                    <button className="Buttons" onClick={deleteArtist}>Delete</button>
                </div>
            )}
            
            <div className="ButtonDiv">
                <button className="Buttons" onClick={() => setShowAdd(!showAdd)}>Add Artist</button>
                <button className="Buttons" onClick={() => setShowSearch(!showSearch)}>Search Artist</button>
                <button className="Buttons" onClick={() => setShowDel(!showDel)}>Delete Artist</button>
                <button className="Buttons" onClick={() => setShowUpdate(!showUpdate)}>Update Artist</button>
            </div>

            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {artistData && (
                <div className="displayArtists">
                    <h2 style={{color : "white"}}>Name: {artistData.Name}</h2>
                    <p style={{color : "white"}}>Genre: {artistData.Genre}</p>
                    <p style={{color : "white"}}>Monthly Listeners: {artistData.MonthlyListeners}</p>
                    <p style={{color : "white"}}>Songs: {artistData.Songs}</p>
                    <p style={{color : "white"}}>Albums: {artistData.Albums}</p>
                </div>
            )}
            
            {showAdd && (
                <div>
                    <h2>Add New Artist</h2>
                    <input 
                        type="text" 
                        placeholder="Artist Name" 
                        value={newArtistName} 
                        onChange={(e) => setNewArtistName(e.target.value)} 
                    />
                    <input 
                        type="number" 
                        placeholder="Monthly Listeners" 
                        value={newArtistMonthlyListeners} 
                        onChange={(e) => setNewArtistMonthlyListeners(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Genre" 
                        value={newArtistGenre} 
                        onChange={(e) => setNewArtistGenre(e.target.value)} 
                    />
                    <button className="Buttons" onClick={addArtist}>Submit</button>
                </div>
            )}

            {showUpdate && (
                <div>
                    <h2>Choose which field to update</h2>
                    <button className="Buttons" onClick={() => setShowUpdateName(!showUpdateName)}>Update Name</button>
                    <button className="Buttons" onClick={() => setShowUpdateMonthly(!showUpdateMonthly)}>Update Monthly Listeners</button>
                    <button className="Buttons" onClick={() => setShowUpdateGenre(!showUpdateGenre)}>Update Genre</button>
                </div>
            )}

            {showUpdateName && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Artist Name" 
                        value={updName} 
                        onChange={(e) => setUpdName(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="New Artist Name" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                    />
                    <button className="Buttons" onClick={updateArtistName}>Submit</button>
                </div>
            )}

            {showUpdateMonthly && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Monthly Listeners" 
                        value={updMonthly} 
                        onChange={(e) => setUpdMonthly(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="New Monthly Listeners" 
                        value={newMonthly} 
                        onChange={(e) => setNewMonthly(e.target.value)} 
                    />
                    <button className="Buttons" onClick={updateArtistListeners}>Submit</button>
                </div>
            )}

            {showUpdateGenre && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Genre" 
                        value={updGenre} 
                        onChange={(e) => setUpdGenre(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="New Genre" 
                        value={newGenre} 
                        onChange={(e) => setNewGenre(e.target.value)} 
                    />
                    <button className="Buttons" onClick={updateArtistGenre}>Submit</button>
                </div>
            )}
        </div>
    );
}

export default Artists;