import { useParams } from 'react-router-dom';
import { supabase } from "../client";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function ViewCreator() {
  const params = useParams();
  const { name } = params;
  const [data, setData] = useState(null);
  const [fetchSuccess, setFetchSuccess] = useState(false);
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
        console.log(error);
        setError("Failed to fetch");
      } else if (data.length === 0) {
        setError("No creators found");
      } else {
        setData(data[0]);
        setFetchSuccess(true);
      }
    };
    fetchCreator();
  }, [name]);

  const deleteCreator = async (name) => {
    try {
      const response = await supabase
        .from('creators')
        .delete()
        .eq('name', name);

      if (response.error) {
        throw new Error(response.error.message);
      }

      console.log('Creator deleted successfully:', response.data);
      history.back()
      return response.data;
    } catch (error) {
      console.error('Error deleting creator:', error);
      throw error;
    }
  };


  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : fetchSuccess ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "white",
          padding: "2rem",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "50rem",
            gap: "100px"
          }}>
            <div style={{
              backgroundImage: `url(${data.imageURL})`,
              height: "300px",
              width: "300px",
              borderRadius: "10%",
            }}></div>
            <div>
                <h1>{data.name}</h1>
                <h2>{data.description}</h2>
                <h2>URL:<a href={data.url}>{data.url}</a></h2>
            </div>
          </div>
          <div style={{
            display: "flex",
            width: "100px",
            justifyContent: "space-between"
          }}>
            <Link to={`/${name}/edit`}><button>Edit</button></Link>
            <button onClick={() => deleteCreator(name)}>Delete</button>
          </div>
        </div>
      ) : (
        <p>No creators found.</p>
      )}
    </>
  );
}
