"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter  } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPlaylists() {
      if (session?.accessToken) {
        setLoading(true);
        try {
          const res = await fetch("https://api.spotify.com/v1/me/playlists", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          const data = await res.json();
          setPlaylists(data.items);
          console.log(data.items);  
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      }
    }
    fetchPlaylists();
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <button
          onClick={() => signIn("spotify")}
          className="bg-green-500 text-black font-bold py-3 px-8 rounded-full"
        >
          Login with Spotify
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.email || 'Spotify User'}</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading your playlists...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map(playlist => (
            <div 
              key={playlist.id} 
              className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition-colors"
              onClick={() => router.push(`/playlist/${playlist.id}`)}
            >
              {playlist.images?.[0]?.url && (
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded-md mb-4"
                />
              )}
              <h2 className="font-bold mb-2">{playlist.name}</h2>
              <p className="text-gray-400 text-sm">
                {playlist.tracks.total} tracks
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}