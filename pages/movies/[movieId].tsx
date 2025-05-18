import { fetchMovie } from "@/src/lib/tmdb";
import { GetServerSideProps } from "next";
import Image from "next/image";

let imgPath = process.env.NEXT_PUBLIC_API_IMAGE_PATH;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const movieId = context.params?.movieId as string;

  try {
    const movie = await fetchMovie(movieId);
    return { props: { movie } };
  } catch (err) {
    return { notFound: true };
  }
};

export default function MoviePage({ movie }: any) {
  const date = new Date(movie.release_date);
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(date);

  function formatRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins}m`;
  }

  const genres = movie.genres.map((g: any) => g.name).join(", ");

  return (
    <div className="min-h-screen flex items-center justify-center p-24 gap-4">
      <div className="max-w-[1440px] grid grid-cols-3">
        <Image
          className="z-0 h-96 w-64 object-cover rounded-md col-span-1"
          src={imgPath + movie.poster_path}
          width={500}
          height={500}
          draggable={false}
          alt="Movie Poster"
        />
        <div className="col-span-2">
          <p className="text-4xl pb-2">
            <span className="font-bold">{movie.title} </span>(
            {date.getFullYear()})
          </p>
          <p className="pb-6">
            {formattedDate} • {genres} • {formatRuntime(movie.runtime)}
          </p>
          <p className="font-bold text-2xl pb-14">
            {Math.floor(movie.vote_average * 10)}% User Score
          </p>
          <p className="pb-2 italic">{movie.tagline}</p>
          <p className="pb-2 font-bold text-2xl">Overview</p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
