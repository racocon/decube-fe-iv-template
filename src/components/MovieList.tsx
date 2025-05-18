import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

let endpointUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
let token = process.env.NEXT_PUBLIC_BEARER_TOKEN;
let imgPath = process.env.NEXT_PUBLIC_API_IMAGE_PATH;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export default function MovieList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `${endpointUrl}/3/movie/popular?language=en-US&page=1`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setData(data.results);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>UwU | Loading...</p>
      ) : error ? (
        <p>OmO | Error: {error}</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {data.map((item: any) => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.title}
              imgPath={imgPath + item.poster_path}
            />
          ))}
        </div>
      )}
    </div>
  );
}
