import React from "react";

function LibrarySong({ song }) {
  return (
    <div className="song-container">
      <img src={song.cover} alt={`${song.name} ${song.artist}`} />
      <h3>{song.name}</h3>
      <h4>{song.artist}</h4>
    </div>
  );
}

export default LibrarySong;
