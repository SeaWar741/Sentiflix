import Link from "next/link";

export default function MovieCard({ movie }) {
  console.log(movie);
  return (
    <div className=" rounded-md bg-cover bg-center w-72 cursor-pointer first:ml-14 shrink-0 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:opacity-40 duration-200 ">
      <Link href={`/film/${movie.id}`}>
        <img
          className="rounded-md shrink-0 w-full h-full "
          src={movie.backdrop_path}
        />
      </Link>
    </div>
  );
}
