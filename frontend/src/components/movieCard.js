

const MovieCard = ({ title, image, onClick }) => {
    return (
        <div
          className="relative w-32 h-40 bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden cursor-pointer shadow-lg transition-transform hover:scale-105"
          onClick={onClick}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
    
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-4">
            <h3 className="text-md font-semibold">{title}</h3>
          </div>
        </div>
      );
}


export default MovieCard;