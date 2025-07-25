"use client";
import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [sections, setSections] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) {
      setError("Please enter a website idea.");
      return;
    }
    setLoading(true);
    setError(null);
    setSections([]);
    const minLoadingTime = 600;
    const start = Date.now();
    try {
      const res = await fetch("http://localhost:3001/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      if (!res.ok) {
        let message = "API error";
        if (res.status === 400) message = "Please enter a website idea.";
        else if (res.status === 500)
          message = "Server error. Please try again later.";
        throw new Error(message);
      }
      const data = await res.json();
      const elapsed = Date.now() - start;
      if (elapsed < minLoadingTime) {
        setTimeout(
          () => setSections(data.sections || []),
          minLoadingTime - elapsed
        );
      } else {
        setSections(data.sections || []);
      }
    } catch (err: any) {
      if (err.name === "TypeError") {
        setError("Could not connect to the server. Is the backend running?");
      } else {
        setError(err.message || "Unknown error");
      }
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < minLoadingTime) {
        setTimeout(() => setLoading(false), minLoadingTime - elapsed);
      } else {
        setLoading(false);
      }
    }
  };

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/sections");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setSections(data.sections || []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div className="bg-white/90 shadow-2xl rounded-2xl p-10 w-full max-w-lg flex flex-col items-center gap-8 border border-blue-100">
        <h1 className="text-3xl font-extrabold mb-2 text-blue-700 tracking-tight drop-shadow">
          Your AI Helper to get Ideas
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g. Landing page for bakery"
            className="border-2 border-blue-200 rounded-lg px-4 py-3 text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm bg-blue-50/50"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-lg px-4 py-2 font-semibold shadow-md hover:from-blue-700 hover:to-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Sections"
              )}
            </button>
          </div>
        </form>
        {error && (
          <div className="text-red-700 font-semibold bg-red-100 border border-red-300 rounded p-3 w-full text-center mt-2 shadow">
            {error}
          </div>
        )}
        {sections.length > 0 && (
          <div className="mt-4 w-full bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-inner p-6 border border-blue-100">
            <h2 className="text-xl font-bold mb-3 text-purple-700">Preview</h2>
            <ul className="list-disc pl-6 space-y-2">
              {sections.map((section, idx) => (
                <li
                  key={idx}
                  className="py-1 text-lg text-gray-800 font-medium"
                >
                  {section}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
