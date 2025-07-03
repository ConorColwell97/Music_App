import './Albums.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Albums = () => {
    const navigate = useNavigate();

    // User input use state
    const [albumName, setAlbumName] = useState("");

    // Album information use state
    const [albumData, setAlbumData] = useState(null);

    // Success/Error use states
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    // Search use state
    const [showSearch, setShowSearch] = useState(false);
    // Delete use state
    const [showDel, setShowDel] = useState(false);
    // Add album use state
    const [showAdd, setShowAdd] = useState(false);
    // New album data
    const [newAlbumName, setNewAlbumName] = useState("");
    const [newArtistName, setNewArtistName] = useState("");
    const [newAlbumReleaseYear, setNewAlbumReleaseYear] = useState("");
    const [newAlbumListeners, setNewAlbumListeners] = useState("");

    // Update album use state
    const [showUpdate, setShowUpdate] = useState(false);
    // Update field use state
    const [showUpdateName, setShowUpdateName] = useState(false);
    const [showUpdateArtist, setShowUpdateArtist] = useState(false);
    const [showUpdateYear, setShowUpdateYear] = useState(false);
    const [showUpdateListeners, setShowUpdateListeners] = useState(false);
    // Update fields
    const [updName, setUpdName] = useState("");
    const [newName, setNewName] = useState("");
    const [updArtist, setUpdArtist] = useState("");
    const [newArtist, setNewArtist] = useState("");
    const [updYear, setUpdYear] = useState("");
    const [newYear, setNewYear] = useState("");
    const [updListeners, setUpdListeners] = useState("");
    const [newListeners, setNewListeners] = useState("");

    const fetchAlbum = async () => {
        try {
            setError(null);
            const response = await axios.get(`http://localhost:5000/albums/${encodeURIComponent(albumName)}`);
            console.log("API Response:", response.data);
            setAlbumData(response.data);
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateYear(false);
            setShowUpdateListeners(false);
        } catch (err) {
            console.error("Error fetching album:", err);
            setAlbumData(null);
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const addAlbum = async () => {
        try {
            setError(null);
            const response = await axios.post("http://localhost:5000/albums", {
                Name: newAlbumName,
                Artist: newArtistName,
                ReleaseYear: newAlbumReleaseYear,
                NumberOfListeners: newAlbumListeners,
                Songs: JSON.stringify([])
            });
            setSuccessMessage(response.data.message);

            const response2 = await axios.put(`http://localhost:5000/albums/addAlb/${encodeURIComponent(newArtistName)}`, { Name: newAlbumName, Artist: newArtistName }, { headers: { "Content-Type": "application/json" } });
            
            setNewAlbumName("");
            setNewArtistName("");
            setNewAlbumReleaseYear("");
            setNewAlbumListeners("");
            setShowAdd(false);
            setAlbumData(null);
            setShowSearch(false);
            setShowDel(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateYear(false);
            setNewListeners(false);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const deleteAlbum = async () => {
        try {
            setError(null);
            const response = await axios.delete(`http://localhost:5000/albums/${encodeURIComponent(albumName)}`);
            setAlbumData(null);
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateYear(false);
            setShowUpdateListeners(false);
            setSuccessMessage(response.data.message);
            
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const updateAlbumName = async () => {
        console.log("Attempting to update album...");
        console.log("Current Name:", updName);
        console.log("New Name:", newName);

        try {
            setError(null);
            const response = await axios.put(`http://localhost:5000/albums/albName/${encodeURIComponent(updName)}`, {newName}, { headers: { "Content-Type": "application/json" } });
            setUpdName("");
            setNewName("");
            setUpdArtist("");
            setNewArtist("");
            setUpdYear("");
            setNewYear("");
            setUpdListeners("");
            setNewListeners("");
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateArtist(false);
            setShowUpdateYear(false);
            setShowUpdateListeners(false);
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const updateAlbumArtist = async () => {
        console.log("Attempting to update album...");
        console.log("Current Artist:", updArtist);
        console.log("New Artist:", newArtist);

        try {
            setError(null);
            const response = await axios.put(`http://localhost:5000/albums/albArtist/${encodeURIComponent(updArtist)}`, {newArtist}, { headers: { "Content-Type": "application/json" } });
            setUpdName("");
            setNewName("");
            setUpdArtist("");
            setNewArtist("");
            setUpdYear("");
            setNewYear("");
            setUpdListeners("");
            setNewListeners("");
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateArtist(false);
            setShowUpdateYear(false);
            setShowUpdateListeners(false);
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const updateAlbumReleaseYear = async () => {
        console.log("Attempting to update album...");
        console.log("Current Release Year:", updYear);
        console.log("New Release Year:", newYear);

        try {
            setError(null);
            const response = await axios.put(`http://localhost:5000/albums/year/${encodeURIComponent(updYear)}`, {newYear}, { headers: { "Content-Type": "application/json" } });
            setUpdName("");
            setNewName("");
            setUpdArtist("");
            setNewArtist("");
            setUpdYear("");
            setNewYear("");
            setUpdListeners("");
            setNewListeners("");
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateArtist(false);
            setShowUpdateYear(false);
            setShowUpdateListeners(false);
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const updateAlbumListeners = async () => {
        console.log("Attempting to update album...");
        console.log("Current Listeners:", updListeners);
        console.log("New Listeners:", newListeners);

        try {
            setError(null);
            const response = await axios.put(`http://localhost:5000/albums/listeners/${encodeURIComponent(updListeners)}`, {newListeners}, { headers: { "Content-Type": "application/json" } });
            setUpdName("");
            setNewName("");
            setUpdArtist("");
            setNewArtist("");
            setUpdYear("");
            setNewYear("");
            setUpdListeners("");
            setNewListeners("");
            setShowSearch(false);
            setShowDel(false);
            setShowAdd(false);
            setShowUpdate(false);
            setShowUpdateName(false);
            setShowUpdateArtist(false);
            setShowUpdateYear(false);
            setShowUpdateListeners(false);
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return (
      <div className='AlbumsDiv'>
          <h1 className='AlbumsHeader'>
                🎵 Albums
          </h1>
          <div className='ButtonDiv'>
            <button className='Buttons' onClick={() => navigate("/")}>Go Home</button>
            <button className='Buttons' onClick={() => navigate("/Artists")}>Go to Artists</button>
            <button className='Buttons' onClick={() => navigate("/Songs")}>Go to Songs</button>
          </div>

          {showSearch && (
            <div className='ButtonDiv'>
                <input 
                    type="text"
                    placeholder="Enter Album Name" 
                    className="userInput" 
                    value={albumName} 
                    onChange={(e) => setAlbumName(e.target.value)} 
                />
                <button className="Buttons" onClick={fetchAlbum}>Search</button>
            </div>
          )}

        {showDel && (
            <div className='ButtonDiv'>
                <input 
                    type="text"
                    placeholder="Enter Album Name" 
                    className="userInput" 
                    value={albumName} 
                    onChange={(e) => setAlbumName(e.target.value)} 
                />
                <button className="Buttons" onClick={deleteAlbum}>Delete</button>
            </div>
          )}

          <div className="ButtonDiv">
                <button className="Buttons" onClick={() => setShowAdd(!showAdd)}>Add Album</button>
                <button className="Buttons" onClick={() => setShowSearch(!showSearch)}>Search Album</button>
                <button className="Buttons" onClick={() => setShowDel(!showDel)}>Delete Album</button>
                <button className="Buttons" onClick={() => setShowUpdate(!showUpdate)}>Update Album</button>
         </div>

            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {albumData && (
                <div className="displayAlbums">
                    <h2 style={{color : "white"}}>Name: {albumData.Name}</h2>
                    <p style={{color : "white"}}>Artist: {albumData.Artist}</p>
                    <p style={{color : "white"}}>Release Year: {albumData.ReleaseYear}</p>
                    <p style={{color : "white"}}>Listeners: {albumData.NumberOfListeners}</p>
                    <p style={{color : "white"}}>Songs: {albumData.Songs}</p>
                </div>
            )}
            
            {showAdd && (
                <div>
                    <h2>Add New Album</h2>
                    <input 
                        type="text" 
                        placeholder="Album Name" 
                        value={newAlbumName} 
                        onChange={(e) => setNewAlbumName(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Artist Name" 
                        value={newArtistName} 
                        onChange={(e) => setNewArtistName(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Release Year" 
                        value={newAlbumReleaseYear} 
                        onChange={(e) => setNewAlbumReleaseYear(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Listeners" 
                        value={newAlbumListeners} 
                        onChange={(e) => setNewAlbumListeners(e.target.value)} 
                    />
                    <button className="Buttons" onClick={addAlbum}>Submit</button>
                </div>
            )}

            {showUpdate && (
                <div>
                    <h2>Choose which field to update</h2>
                    <button className="Buttons" onClick={() => setShowUpdateName(!showUpdateName)}>Update Name</button>
                    <button className="Buttons" onClick={() => setShowUpdateArtist(!showUpdateArtist)}>Update Artist</button>
                    <button className="Buttons" onClick={() => setShowUpdateYear(!showUpdateYear)}>Update Release Year</button>
                    <button className="Buttons" onClick={() => setShowUpdateListeners(!showUpdateListeners)}>Update Listeners</button>
                </div>
            )}

            {showUpdateName && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Album Name" 
                        value={updName} 
                        onChange={(e) => setUpdName(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="New Album Name" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                    />
                    <button className="Buttons" onClick={updateAlbumName}>Submit</button>
                </div>
            )}

            {showUpdateArtist && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Artist Name" 
                        value={updArtist} 
                        onChange={(e) => setUpdArtist(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="New Artist Name" 
                        value={newArtist} 
                        onChange={(e) => setNewArtist(e.target.value)} 
                    />
                    <button className="Buttons" onClick={updateAlbumArtist}>Submit</button>
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
                    <button className="Buttons" onClick={updateAlbumReleaseYear}>Submit</button>
                </div>
            )}

            {showUpdateListeners && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Listeners" 
                        value={updListeners} 
                        onChange={(e) => setUpdListeners(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="New Listeners" 
                        value={newListeners} 
                        onChange={(e) => setNewListeners(e.target.value)} 
                    />
                    <button className="Buttons" onClick={updateAlbumListeners}>Submit</button>
                </div>
            )}
      </div>
    );
};

export default Albums;