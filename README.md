# Spotify Playlist Analyzer 🎵

Analyze your favorite Spotify playlists and gain insights into track durations and other stats! This app fetches playlist details using the Spotify Web API and provides useful metrics, like average track duration.

---

## Features ✨
- 🎧 Fetches playlist data directly from Spotify
- ⏱️ Calculates the **average duration** of tracks in a playlist
- 🖼️ Displays playlist metadata (name, cover image, and total tracks)

---

## Technologies Used 🛠️
- **Frontend**: [Next.js](https://nextjs.org/) for the user interface
- **Backend/API**: Integrated with [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a responsive, modern UI

---

## Prerequisites ✅
- A **Spotify Developer Account** to get a `client_id` and `client_secret`.
- Node.js installed on your machine.
- A Spotify account to analyze playlists.

---

## Getting Started 

### Clone the Repository
```bash
git clone https://github.com/your-username/spotify-playlist-analyzer.git
cd spotify-playlist-analyzer

---
**### Install Dependencies**
```bash
npm install

---
### Set Up Environment Variables
Create a .env file in the root of the project
```bash
NEXTAUTH_URL=http://localhost:3000
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

### Run the App
```bash
npm run dev

Visit the app in your browser at http://localhost:3000.
