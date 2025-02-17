import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MovieCard from "../components/movieCard";
import SearchBar from "../components/searchBar";
import AudioCard from "../components/audioCard";

function HomePage() { 
    const [recentMovies, setRecentMovies] = useState([]);
    const [popularRingtones, setPopularRingtones] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch("https://ringtonedown.onrender.com/")
        .then((response) => response.json())
        .then((data) => {
          setRecentMovies(data.recentMovies);
          setPopularRingtones(data.popularRingtones);
        })
        .catch((error) => console.error("Error Fetching data", error));
    }, []);
    
    return (
      <div className="min-h-screen text-white">
        <SearchBar />
  
        <div className="max-w-6xl mx-auto pt-24 px-4">
  
          {/* Recently Uploaded */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-4 ">Recently Uploaded</h2>
              {/* <button className="text-gray-300 hover:text-white mb-4">All Uploades</button> */}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-10 gap-y-4 sm:gap-x-2 md:gap-x-10">
              {recentMovies.map((movie) => (
                <MovieCard key={movie._id} {...movie} onClick={ () => navigate(`/movie/${movie._id}`)} />
              ))}
            </div>
          </div>
  
          {/* Popular Ringtones */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Popular Ringtones</h2>
              {/* <button className="text-gray-300 hover:text-white ">Show More</button> */}
            </div>
            <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-4">
              {popularRingtones.map((ringtone)=>
                  (
                    <AudioCard key={ringtone._id} ringtone={ringtone} />
  
                  ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default HomePage;
  
