export default function Page({ currentMovieData, currentMovieClassif }) {
  function formatDate(date) {
    const isoDate = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = isoDate.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <div className="px-14 w-full h-full">
      <div className="h-96 w-full">
        <div className="h-full relative w-full flex flex-row">
          <div className="absolute left-0 w-full h-full bg-gradient-to-r from-black from-1% via-black via-5% to-30% " />
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black from-1% via-black via-5% to-30% " />
          <div className="absolute right-0 w-full h-full bg-gradient-to-l from-black from-1% via-black via-5% to-30% " />
          <div className="w-full flex flex-row justify-center">
            <img
              className=" w-full object-cover"
              src={`${currentMovieData.backdrop_path}`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center min-h-screen w-full">
        <div className="rounded shadow w-4/6 space-x-10  justify-center - flex flex-row">
          <div className="w-1/4 h-full  mb-2 rounded">
            <div className="bg-white  sticky top-10 h-80 rounded">
              <img
                className="h-full w-full object-cover rounded"
                src={`${currentMovieData.poster_path}`}
              />
            </div>
          </div>
          <div className="w-1/2  h-full  mb-2">
            <div className="flex flex-grow space-x-3 items-baseline">
              <h2 className="text-3xl font-serif font-bold ">
                {currentMovieData.title}
              </h2>
              <h2>[{currentMovieData.release_date.split("-")[0]}]</h2>
            </div>
            <p className="mt-8 font-sans">{currentMovieData.overview}</p>

            <div>
              <h2 className="mt-10 text-md font-bold uppercase">Reviews</h2>
              {currentMovieData.reviews.results.map((review) => {
                return (
                  <div key={review.author}>
                    <div className="flex items-center" aria-hidden="true">
                      <div className="w-full border-t mt-5 border-gray-300">
                        <div className="mt-5">
                          <h2 className="font-medium text-lg">
                            {review.author}
                          </h2>
                          <h2 className="mb-3 text-sm">
                            {formatDate(review.created_at)}
                          </h2>
                          <p className="">{review.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-1/4 sticky top-10 h-10">
            <div className="w-full">
              <div>{currentMovieClassif.message}</div>
              <div className="mb-4 rounded-md w-full text-center bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Generated Review d
              </div>
              <p>Something...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ resolvedUrl }) {
  const currentUrl = resolvedUrl.split("/")[2];
  const reqString = `http://127.0.0.1:5001/api/movie/${currentUrl}`;
  const reqStringTwo = `http://127.0.0.1:5001/api/classify/${currentUrl}`;

  const currentMovie = await fetch(reqString);
  const classif = await fetch(reqStringTwo);

  if (!currentMovie.ok) {
    throw new Error("Failed to fetch data");
  }

  if (!classif.ok) {
    throw new Error("Failed to fetch data");
  }

  const currentMovieData = await currentMovie.json();
  const currentMovieClassif = await classif.json();

  return {
    props: {
      currentMovieData: currentMovieData,
      currentMovieClassif: currentMovieClassif,
    },
  };
}
