const Movie = require("../models/movieCard");
const Ringtone = require("../models/ringtone");


const getHomePage = async(req, res) => {
    try{
        const recentMovies = await Movie.find()
            .sort({ createdAt: -1 }) // Sort by newest first
            .limit(5); // Fetch only 4 movies

        const popularRingtones = await Ringtone.aggregate([
            {
                $lookup: {
                    from: "z_movie",
                    localField: "movieId",
                    foreignField: "_id",
                    pipeline: [{ $project: { title: 1 }}],
                    as: "movieDetails"
                }
            },
            { $sort: { downloads: -1 } },
            { $limit: 6 },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    audioUrl: 1,
                    clicks: 1,
                    movieName: { $arrayElemAt: ["$movieDetails.title", 0]}
                }
            }
        ]); 

        res.json({recentMovies, popularRingtones});
    } catch (error) {
        console.log("Error in getHomePage:", error);
        res.status(500).json({ error:error});
    }
};

const getMovies = async (req, res) => {
    try {
        const movies = await MovieCard.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
};

const getRingtones = async (req, res) => {
    try {
        const { movieId } = req.params;
        const ringtones = await Ringtone.find({ movieId });
        res.json(ringtones);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch ringtones" });
    }
};




module.exports = { getHomePage };