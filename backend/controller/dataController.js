const Movie = require("../models/movieCard");
const Ringtone = require("../models/ringtone");


const getRingtonesWithMovies = async (filter = {}, sort = {}, limit = 0 ) => {
    const pipeline = [
        { $match: filter }, 
        {
            $lookup: {
                from: "z_movie", 
                localField: "movieId",
                foreignField: "_id",
                pipeline: [{ $project: { title: 1, image: 1 } }],
                as: "movieDetails"
            }
        },
        { $sort: sort }, 
        {
            $project: {
                _id: 1,
                name: 1,
                audioUrl: 1,
                clicks: 1,
                movie: {
                    title: { $arrayElemAt: ["$movieDetails.title", 0] },
                    imageUrl: { $arrayElemAt: ["$movieDetails.image", 0] }
                }
            }
        }
    ];
    if (limit > 0) {
        pipeline.push({ $limit: limit });
    }
    return await Ringtone.aggregate(pipeline);
};
const getHomePage = async(req, res) => {
    try{
        const recentMovies = await Movie.find()
            .sort({ _id: -1 }) // Sort by newest first
            .limit(8); // Fetch only 4 movies

        const popularRingtones = await getRingtonesWithMovies( {}, { clicks: -1 }, 6);

        res.json({recentMovies, popularRingtones});
    } catch (error) {
        console.log("Error in getHomePage:", error);
        res.status(500).json({ error:error});
    }
};

const getRingtones = async (req, res) => {
    try {
        let { movieId } = req.params;

        movieId = isNaN(movieId) ? movieId : Number(movieId);

        const movie = await Movie.findById(movieId, { title: 1, image: 1 });
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const ringtones = await Ringtone.aggregate([
            { $match: { movieId: movieId } }, 
            {
                $lookup: {
                    from: "z_movie", 
                    localField: "movieId",
                    foreignField: "_id", 
                    as: "movieDetails"
                }
            },
            { $unwind: "$movieDetails" }, 
            {
                $project: {
                    _id: 1,
                    name: 1,
                    audioUrl: 1,
                    clicks: 1,
                    movie: {
                        title: "$movieDetails.title",
                        imageUrl: "$movieDetails.image"
                    }
                }
            }
        ]);
        
        res.json({ ringtones });

    } catch (error) {
        console.error("Error fetching ringtones:", error);
        res.status(500).json({ error: "Failed to fetch ringtones" });
    }
};

const searchItems = async (req, res) => {
    try {
        const query = req.query.query?.trim();
        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const searchRegex = new RegExp(query, "i");

        const movies = await Movie.find({ title: searchRegex })
            .limit(5)
            .select("title image");

        const ringtones = await Ringtone.aggregate([
            {
                $match: { name: searchRegex }
            },
            {
                $lookup: {
                    from: "z_movie",
                    localField: "movieId",
                    foreignField: "_id",
                    as: "movieDetails"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    audioUrl: 1,
                    clicks: 1,
                    movieId: 1
                }
            }
        ]);

        const results = [
            ...movies.map((movie) => ({ type: "movie", ...movie.toObject() })),
            ...ringtones.map((ringtone) => ({ type: "ringtone", ...ringtone }))
        ];

        res.json({ results });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};




module.exports = { getHomePage, getRingtones, searchItems };