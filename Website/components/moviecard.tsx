import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <div className="group relative rounded-md bg-cover bg-center w-72 h-40 cursor-pointer shrink-0 transition ease-in-out delay-150 hover:scale-110 duration-200">
      <Link href={`/film/${movie.id}`} legacyBehavior>
        <a>
          <img
            className="rounded-md shrink-0 w-full h-full"
            src={movie.backdrop_path}
            alt={movie.title}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition duration-200">
            <span className="text-white text-center">{movie.title}</span>
          </div>
        </a>
      </Link>
    </div>
  );
}
