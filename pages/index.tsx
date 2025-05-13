"use client";

import Card from "@/src/components/Card";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

let endpointUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
let token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export default function Home() {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    fetch(`${endpointUrl}/3/movie/popular?language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((data) => setMovieData(data.results))
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-24 gap-4",
        inter.className
      )}
    >
      <div className="grid grid-cols-4 gap-4">
        {movieData
          ? movieData.map((movie, index) => {
              const { id, title, overview, release_date } = movie;
              return (
                <Card
                  key={index}
                  id={id}
                  title={title}
                  overview={overview}
                  release_date={release_date}
                />
              );
            })
          : "No Data uwu"}
      </div>
    </main>
  );
}
