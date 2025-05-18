import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ id, imgPath }: any) {
  return (
    <Link href={`/movies/${id}`}>
      <Image
        className="z-0 h-96 w-64 object-cover rounded-md hover:scale-105 hover:cursor-pointer duration-200"
        src={imgPath}
        width={500}
        height={500}
        draggable={false}
        alt="Movie Poster"
      />
    </Link>
  );
}
