"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, use } from "react";

export default function PlaylistAnalysis({ params }) {
  const unwrappedParams = use(params); 
  const playlistId = unwrappedParams.id;

  const { data: session } = useSession();
  const [playlistData, setPlaylistData] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaylistData() {
      if (session && session.accessToken) {
        setLoading(true);
        setError(null);

        try {
         
          const playlistRes = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId}`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );

          if (!playlistRes.ok) {
            throw new Error("Failed to fetch playlist details");
          }

          const playlist = await playlistRes.json();
          setPlaylistData(playlist);

          
          const trackIds = playlist.tracks.items
            .filter((item) => item?.track?.id)
            .map((item) => item.track.id);

          if (!trackIds.length) {
            setTracks([]);
            return;
          }

          
          const trackIdsString = trackIds.join(",");
          const tracksRes = await fetch(
            `https://api.spotify.com/v1/tracks?ids=${trackIdsString}`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );

          if (!tracksRes.ok) {
            throw new Error("Failed to fetch track details");
          }

          const tracksResponse = await tracksRes.json();
     
          setTracks(tracksResponse.tracks || []);
        } catch (err) {
          console.error("Error fetching playlist data:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchPlaylistData();
  }, [session, playlistId]);


  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl">Analyzing playlist...</h1>
      </div>
    );
  }


  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl text-red-500">Error: {error}</h1>
      </div>
    );
  }


  const totalDurationMs = tracks.reduce(
    (acc, track) => acc + (track?.duration_ms || 0),
    0
  );
  const averageDurationSec =
    tracks.length > 0 ? Math.round(totalDurationMs / tracks.length / 1000) : 0;


const totalPopularity = tracks.reduce(
    (acc, track) => acc + (track?.popularity || 0),
    0
);
const averagePopularity = tracks.length > 0 ? Math.round(totalPopularity / tracks.length) : 0;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {playlistData && (
        <div>
          <div className="flex items-center gap-6 mb-8">
            {playlistData.images?.[0]?.url && (
              <img
                src={playlistData.images[0].url}
                alt={playlistData.name}
                className="w-48 h-48 rounded-lg shadow-xl"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">{playlistData.name}</h1>
              <p className="text-gray-400">
                {playlistData.tracks.total} tracks
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-900 p-6 rounded-lg">
              <h3 className="text-xl mb-2">Average Popularity</h3>
              <p className="text-3xl font-bold text-blue-400">
                {averagePopularity}
              </p>
              <p className="text-gray-400">Across all tracks</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg">
              <h3 className="text-xl mb-2">Average Duration</h3>
              <p className="text-3xl font-bold text-green-400">
                {averageDurationSec} seconds
              </p>
              <p className="text-gray-400">Across all tracks</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
