import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DOMPurify from "dompurify"; 

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const sanitizeInput = (input) => {
    const sanitized = DOMPurify.sanitize(input); 
    return sanitized.replace(/[^\w\s]/gi, '');
  };

  const fetchResults = useCallback(() => {
    const sanitizedSearch = sanitizeInput(search); // Sanitize the search term

    if (!sanitizedSearch.trim()) {
        setResults({ movie: null, ringtones: [] });
        setShowResults(false);
        return;
    }

    fetch(`https://ringtonedown.onrender.com/search?query=${encodeURIComponent(sanitizedSearch)}`)
        .then((res) => res.json())
        .then((data) => {
            const filteredResults = data.results.reduce(
                (acc, item) => {
                    if (item.type === "movie") {
                        acc.movie = { id: item._id, title: item.title };
                    } else if (item.type === "ringtone") {
                        acc.ringtones.push({
                            id: item.movieId,
                            name: item.name,
                            movieId: item.movieId
                        });
                    }
                    return acc;
                },
                { movie: null, ringtones: [] }
            );

            setResults(filteredResults);
            setShowResults(true);
        })
        .catch((error) => console.error("Search error:", error));
  }, [search]);

  useEffect(() => {
    const delay = setTimeout(fetchResults, 300);
    return () => clearTimeout(delay);
  }, [search, fetchResults]);

  const handleNavigate = (item) => {
    if (item.id) {
      navigate(`/movie/${item.id}`);
    } else if (item.movieId) {
      navigate(`/movie/${item.movieId}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-20 w-full fixed top-11 left-0 z-50">
      <div className="relative w-[90%] md:w-[80%] md:mx-[10%]">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg shadow-lg rounded-full"></div>

        <div className="relative flex items-center p-3">
          <input
            type="text"
            placeholder="Search for a ringtone or movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none pl-4 pr-10"
          />
          <SearchIcon className="text-gray-400 absolute right-3 cursor-pointer" />
        </div>

        {showResults && (
          <ul className="absolute w-full bg-black bg-opacity-80 text-white mt-2 rounded-lg shadow-lg p-2">
            {results.movie && (
              <li
                className="p-2 font-bold border-b border-gray-600 cursor-pointer hover:bg-gray-700"
                onClick={() => handleNavigate(results.movie)}
              >
                🎬 {results.movie.title}
              </li>
            )}
            {results.ringtones.length > 0 ? (
              results.ringtones.map((ringtone, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-700"
                  onClick={() => handleNavigate(ringtone)}
                >
                  🎵 {ringtone.name}
                </li>
              ))
            ) : (
              <li className="p-2 text-center">No ringtones found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
