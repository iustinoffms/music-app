import React from "react";

function LibrarySong({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  songs,
  setSongs,
}) {
  return (
    <div
      onClick={() => {
        setCurrentSong(song);
        if (isPlaying) {
          async function waitForTheSong() {
            await audioRef;
            audioRef.current.play();
          }
          waitForTheSong();
        }
        const updatedSongsList = songs.map((mappedSong) => {
          return mappedSong.id === song.id
            ? { ...song, active: true }
            : { ...mappedSong, active: false };
        });
        setSongs(updatedSongsList);
      }}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={`${song.name} ${song.artist}`} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
