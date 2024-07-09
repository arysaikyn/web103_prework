import { useEffect, useState } from "react";
import { supabase } from "../client";
import Card from "../components/Card"

export default function ShowCreators() {
    const [creators, setCreators] = useState([]);
    const [fetchSuccess, setFetchSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true)
            const { data, error } = await supabase
                .from("creators")
                .select()
            setIsLoading(false)
            if(error){
                console.log(error);
                setError("failed to fetch")
            }
            else{
                setCreators(data)
                setFetchSuccess(true);
            }
        }
        fetch()
    }, [])

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
        }}>
            {fetchSuccess && creators.length > 0 ? (
                creators.map(creator => (
                    <Card key={creator.name} creator={creator} />
                ))
            ) : (
                <p>No creators found.</p>
            )}
        </div>
    );
}