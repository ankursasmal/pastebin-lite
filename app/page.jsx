"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  async function createPaste() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      alert("Failed to create paste");
      return;
    }

    const data = await res.json();
    setUrl(data.url);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-zinc-900">
        <h1 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          Pastebin Lite
        </h1>

        <textarea
          className="w-full rounded border border-zinc-300 p-3 text-black focus:outline-none focus:ring dark:border-zinc-700 dark:bg-black dark:text-white"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your text here..."
        />

        <button
          onClick={createPaste}
          className="mt-4 rounded bg-black px-4 py-2 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Create Paste
        </button>

        {url && (
          <p className="mt-4 break-all text-sm text-green-600 dark:text-green-400">
            Share URL:{" "}
            <a href={url} className="underline">
              {url}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
