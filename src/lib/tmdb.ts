let endpointUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
let token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export async function fetchMovie(id: string) {
  const url = `${endpointUrl}/3/movie/${id}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error(`Failed to fetch from ${url}`, await res.text()); // Add this
    throw new Error("Failed to fetch movie");
  }
  return res.json();
}
