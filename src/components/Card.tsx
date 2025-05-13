import { useRouter } from "next/router";

export default function Card(data) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === data.id ? "red" : "white",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(data.id);
  };

  return (
    <a href={data.id} onClick={handleClick} style={style}>
      <div className="text-4xl font-bold">{data.title}</div>
      <div className="text-xl">{data.overview}</div>
      <div className="text-md">{data.release_date}</div>
    </a>
  );
}
