import Image from "next/image";
import Navbar from "../../components/navbar";
import BgImageMock from "../../assets/br2049.jpg";
import Content from "../../components/content";
import Center from "../../components/center";
import Layout from "./layout";

async function getMovieData() {
  const res = await fetch("http://127.0.0.1:5001/api/trending");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const movieData = await getMovieData();

  return (
    <>
      <Center movieData={movieData} />
      <Content movieData={movieData.results} />
    </>
  );
}
