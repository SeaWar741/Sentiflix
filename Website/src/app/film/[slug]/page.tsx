async function getMovieData(movieId) {
  const res = await fetch(`http://127.0.0.1:5001/api/movie/${movieId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getReview(movieId) {
  const res = await fetch(
    `http://127.0.0.1:5001/api/generate_review/${movieId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function formatDate(date) {
  const isoDate = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = isoDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const movieData = await getMovieData(params.slug);
  //   const reviewTextRef = getReview(params.slug);

  return (
    <div className="px-14 w-full h-full">
      <div className="h-2/3 w-full">
        <div className="h-full relative w-full flex flex-row">
          <div className="absolute left-10 w-full h-full bg-gradient-to-r from-black from-1% via-black via-5% to-30% " />
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black from-1% via-black via-5% to-30% " />{" "}
          <div className="absolute right-10 w-full h-full bg-gradient-to-l from-black from-1% via-black via-5% to-30% " />
          <div className="w-full flex flex-row justify-center">
            <img
              className="h-full w-11/12 object-cover"
              src={`${movieData.backdrop_path}`}
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
                src={`${movieData.poster_path}`}
              />
            </div>
          </div>
          <div className="w-1/2  h-full  mb-2">
            <div className="flex flex-grow space-x-3 items-baseline">
              <h2 className="text-3xl font-serif font-bold ">
                {movieData.title}
              </h2>
              <h2>[{movieData.release_date.split("-")[0]}]</h2>
            </div>
            <p className="mt-8 font-sans">{movieData.overview}</p>

            <div>
              <h2 className="mt-10 text-md font-bold uppercase">Reviews</h2>
              {movieData.reviews.results.map((review) => {
                return (
                  <div>
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
          <div className="w-1/4  sticky top-10 h-10">
            <div className="w-full flex flex-row justify-center">
              <div className="rounded-md w-full text-center bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Generated Review
              </div>
              {/* <p>{reviewTextRef}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
