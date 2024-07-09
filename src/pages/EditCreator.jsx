import { useState, useEffect } from 'react';
import { supabase } from "../client";
import { useParams } from 'react-router-dom';

export default function EditCreator() {
  const { name } = useParams();
  const [creator, setCreator] = useState(null);
  const [newName, setNewName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCreator = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("name", name);

      setIsLoading(false);
      if (error) {
        console.error("Error fetching creator:", error);
        setError("Failed to fetch creator");
      } else if (data.length === 0) {
        setError("No creator found");
      } else {
        const creatorData = data[0];
        setCreator(creatorData);
        setNewName(creatorData.name);
        setDescription(creatorData.description);
        setUrl(creatorData.url);
        setImageURL(creatorData.imageURL);
      }
    };

    fetchCreator();
  }, [name]);

  const updateCreator = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("creators")
      .update({ name: newName, description, url, imageURL })
      .eq("name", name);

    setIsLoading(false);
    if (error) {
      console.error("Error updating creator:", error);
      setError("Failed to update creator");
    } else {
      console.log("Creator updated successfully:", data);
      history.back()
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", color: "white"}}>
      <h1>Edit Creator</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault();
          updateCreator();
        }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>URL:</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Image URL:</label>
            <input
              type="url"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Update Creator</button>
        </form>
      )}
    </div>
  );
}