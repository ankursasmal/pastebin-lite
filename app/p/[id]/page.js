async function getPaste(id) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/pastes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function PastePage({ params }) {
  const { id } = await params;

  const paste = await getPaste(id);

  if (!paste) {
    return <h1 className="p-6">404 – Paste not found</h1>;
  }

  return (
    <pre className="p-6 whitespace-pre-wrap">
      {paste.content}
    </pre>
  );
}
