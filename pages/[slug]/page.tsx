export async function generateStaticParams() {
  const posts = await fetch("https://api.themoviedb.org/3/movie/").then((res) =>
    res.json()
  );

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
