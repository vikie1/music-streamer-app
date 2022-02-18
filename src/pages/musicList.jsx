import React from "react";
import { MusicList } from "../components/musiclist/music-list";
import { useFetch } from "../customHooks/useFetch";

export const MusicListPage = (props) => {
  const {
    data: allMusic,
    isLoading,
    error,
  } = useFetch("https://pbvictor.herokuapp.com/api/music/");
  return (
    <div className="bg-gray-800 min-h-screen px-20 py-5">
      {!error && <h1 className="text-white font-nunito text-4xl md:text-5xl md:my-5 text-center">We have a great playlist for you</h1>}
      {error && <div>{error}</div>}
      {isLoading && (
        <div>Please wait while the playlist is geting prepared...</div>
      )}
      <main className="flex justify-center">
          {allMusic && <MusicList allMusic={allMusic}/>}
      </main>
    </div>
  );
};
