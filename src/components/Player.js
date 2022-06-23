import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleRight,
  faAngleLeft,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

function Player({
  audioRef,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  setCurrentSong,
  currentSong,
  songs,
  setSongs,
}) {
  const playSongHandler = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    }
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };
  function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  function skipTrackHandler(skipDirection) {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    if (skipDirection === "skip-back") {
      if (currentSongIndex - 1 === -1) {
        setCurrentSong(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[currentSongIndex - 1]);
      }
    }
    if (skipDirection === "skip-forward") {
      setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
    }
  }
  useEffect(() => {
    const updatedSongsList = songs.map((mappedSong) => {
      return mappedSong.id === currentSong.id
        ? { ...currentSong, active: true }
        : { ...mappedSong, active: false };
    });
    setSongs(updatedSongsList);

    if (isPlaying) {
      async function waitForTheSong() {
        await audioRef.current.play();
        audioRef.current.play();
      }
      waitForTheSong();
    }
  }, [currentSong]);
  return (
    <div className="player">
      <div className="time-control">
        <p>{formatTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{songInfo.duration ? formatTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={!isPlaying ? faPlay : faPause}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
}

export default Player;
