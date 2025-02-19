import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SearchBar from "../components/searchBar";
import AudioCard from "../components/audioCard";

const API_URL = process.env.REACT_APP_API_URL;

function MovieRingtonePage() {
    
    const { movieId } = useParams();
    const [audioCard, setAudioCard] = useState([]);
    console.log(audioCard);

    useEffect(() => {
        fetch(`${API_URL}movie/${movieId}`)
            .then((res) => res.json())
            .then((data) => {
                setAudioCard(data.ringtones);
            })
            .catch((error) => console.error("Error fetching ringtoneCard info", error));
    }, [movieId]);
       
    return (
        <>
            <div className="min-h-screen text-white ">
                <div className="text-3xl font-bold sticky top-0 bg-black py-3 text-center z-50">
                    <a href="https://ringtown.netlify.app/" className="hover:text-gray-300 transition">Ringtown</a>
                </div>
                <SearchBar />
                <div className="max-w-6xl mx-auto pt-24 px-4">
                    <h2 className="text-2xl font-bold mb-4 ">{audioCard.length > 0 ? `${audioCard[0]?.movie?.title ?? "Loading..."}`: "No ringtones for this movie" } Ringtones</h2>
                    <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {audioCard.map((ringtone)=>
                            (
                                <AudioCard key={ringtone._id} ringtone={ringtone} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );  
}


export default MovieRingtonePage;