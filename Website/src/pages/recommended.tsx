import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player'
import Head from 'next/head';

export default function Page() {
  const [currentMovieData, setCurrentMovieData] = useState(null);
  const [currentMovieClassif, setCurrentMovieClassif] = useState(null);
  const [currentMovieReview, setCurrentMovieReview] = useState(null);
  const [currentMovieTrailers, setCurrentMovieTrailers] = useState({result:[]});

  useEffect(() => {
    async function fetchData() {
      try {
        // Assuming the endpoint for the sorted list by rating is `/api/movies/rated`
        const movieRes = await fetch("http://127.0.0.1:5000/api/top_rated");
        if (!movieRes.ok) throw new Error("Failed to fetch movies data");
        const movieData = await movieRes.json();

        // You might not need to pick a random movie anymore, just select the top one or any other logic you have in mind
        const topRatedMovie = movieData.results[0]; // for example, taking the first one
        const movieId = topRatedMovie.id.toString();

        // ... (Other fetch requests remain unchanged)
        const classifResponse = await fetch(`http://127.0.0.1:5000/api/classify/${movieId}`);
        const reviewResponse = await fetch(`http://127.0.0.1:5000/api/generate_review/${movieId}`);
        const trailerResponse = await fetch(`http://127.0.1:5000/api/trailer/${movieId}`);

  
        //check each response for errors isolate the error and display it
        if (!classifResponse.ok) {
          console.log(classifResponse.statusText);
        }
        if (!reviewResponse.ok) {
          console.log(reviewResponse.statusText);
        }
        if (!trailerResponse.ok) {
          console.log(trailerResponse.statusText);
        }
  
        const classifData = await classifResponse.json();
        const reviewData = await reviewResponse.json();
        const trailerData = await trailerResponse.json();

        // If all fetch requests are successful, set state with the new data
        setCurrentMovieData(topRatedMovie);
        // ... (Other state setters remain unchanged)
        setCurrentMovieClassif(classifData);
        setCurrentMovieReview(reviewData);
        setCurrentMovieTrailers(trailerData);
        
      } catch (error) {
        console.error("Error fetching movies data:", error);
        // Handle the error state in the UI as needed
      }
    }
  
    fetchData();
  }, []);

  function formatDate(date) {
    const isoDate = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = isoDate.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  function Button({ text }) {
    const isGood = text === "Good Movie";
    const color = isGood ? "green" : "red";
    //check if the movie is good or bad or No reviews found--> put in blue and say no reviews found
    if (text === "No reviews found") {
      return (
        <button
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed`}
          disabled={true}
        >
          {text}
        </button>
      );
    }
    const buttonText = isGood ? "Good Movie" : "Bad Movie";
    const isDisabled = text === "No reviews found";
    

    return (
      <button
        className={`${
          color === "green" ? "bg-green-500" : "bg-red-500"
        } text-white font-bold py-2 px-4 rounded`}
        disabled={isDisabled}
      >
        {buttonText}
      </button>
    );
  }

  if (!currentMovieData || !currentMovieClassif) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return (
    <>
      <Head>
        <title>Sentiflix | {currentMovieData.title}</title>
        <meta name="description" content="Description of my Next.js page" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#000000"/>
      </Head>
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
                alt='movie backdrop'
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center min-h-screen w-full">
          <div className="rounded shadow w-4/6 space-x-10  justify-center - flex flex-row">
          <div className="w-1/4 h-full mb-2 rounded">
              <div className="bg-white sticky top-10 h-80 rounded">
                <img
                  className="h-full w-full object-cover rounded"
                  src={`${currentMovieData.poster_path}`}
                  alt='movie poster'
                />
                <div className="flex justify-center mt-8"> {/* mt-8 is 2rem */}
                  <Button text={currentMovieClassif.result}/>
                </div>
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
                <div>
                  {/*if trailer is not empty put the first video */}
                  {currentMovieTrailers.result.length > 0 && (
                    <div>
                      <h2 className="mt-10 text-md font-bold uppercase">
                        Trailer
                      </h2>
                      <div className="flex justify-center">
                        <ReactPlayer
                          className="w-3/4 h-2/4"
                          url={`https://www.youtube.com/watch?v=${currentMovieTrailers.result[0]}`}
                          controls={true}
                        />
                      </div>
                    </div>
                    )}
                </div>
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
                <div>{currentMovieReview.result}</div>
                <div className="mb-4 rounded-md w-full text-center bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Generated Review by AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
