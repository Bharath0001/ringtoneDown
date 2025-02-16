
const AudioCard = ({ ringtone }) => {
  return (
    <div className="w-full h-16 bg-gray-800 rounded-xl flex items-center px-4 space-x-4 shadow-md">
      <div className="w-10 h-10 flex items-center justify-center">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src= {ringtone.movie.imageUrl}
          alt="Movie"
          title={ringtone.movie.title}
        />
      </div>

      {/* Truncated Title Section */}
      <div className="flex-1 overflow-hidden">
        <p className="text-white font-medium truncate" title={ringtone.name}>
          {ringtone.name}
        </p>
        <div className="text-gray-400 text-xs">{ringtone.clicks} downloads</div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="bg-white text-black px-4 py-1 text-sm font-medium rounded-lg shadow hover:bg-gray-200 transition" onClick={() => window.open( ringtone.audioUrl, "_blank")}>
          Download
        </button>
      </div>
    </div>
  );
};

export default AudioCard;
