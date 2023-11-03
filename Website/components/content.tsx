import MovieCard from "./moviecard";

export default function Content({ movieData }) {
  return (
    <div className="absolute w-full h-68 bottom-0 bg-gradient-to-t from-black from-1% via-black to-100%">
      <h2 className="pl-14 font-bold text-xl">Trending</h2>

      <div className="w-full h-52 items-center flex flex-grow overflow-x-auto">
        <div className="w-full h-40 flex bg-red flex-row space-x-4 ">
          {movieData.map((movie, i) => (
            <MovieCard ind={i} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
