"use client";

import { useRef, useState } from "react";
import { FaPlay, FaPause, FaRotateLeft, FaRotateRight } from "react-icons/fa6";
import { markBookAsFinished } from "@/services/libraryService";
import { useAppSelector } from "@/app/store/hooks";

type AudioPlayerProps = {
  audioUrl: string;
  bookId: string;
};

export default function AudioPlayer({ audioUrl, bookId }: AudioPlayerProps) {
  const user = useAppSelector((state) => state.auth.user);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  async function handleAudioEnded() {
    setIsPlaying(false);

    if (!user) {
      return;
    }

    try {
      await markBookAsFinished(user.uid, bookId);
    } catch (error) {
      console.error("Unable to mark book as finished:", error);
    }
  }

  function changePlaybackRate(rate: number) {
    setPlaybackRate(rate);

    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }

  function skipBackward() {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.currentTime = Math.max(
      0,
      audioRef.current.currentTime - 10,
    );
  }

  function skipForward() {
    if (!audioRef.current) {
      return;
    }

    const nextTime = audioRef.current.currentTime + 10;

    audioRef.current.currentTime = Math.min(
      audioRef.current.duration || nextTime,
      nextTime,
    );
  }

  function formatTime(seconds: number) {
    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  }

  function handleSeek(value: number) {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.currentTime = value;
    setCurrentTime(value);
  }

  async function togglePlayPause() {
    if (!audioRef.current) {
      return;
    }

    if (audioRef.current.paused) {
      await audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        className="player-page__audio"
        src={audioUrl}
        hidden
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleAudioEnded}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
        }}
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration);
        }}
      >
        Your browser does not support audio playback.
      </audio>

      <div className="audio-player__controls">
        <button
          type="button"
          className="audio-player__skip-button"
          onClick={skipBackward}
          aria-label="Go back 10 seconds"
        >
          <FaRotateLeft />
          <span>10</span>
        </button>

        <button
          type="button"
          className="audio-player__play-button"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button
          type="button"
          className="audio-player__skip-button"
          onClick={skipForward}
          aria-label="Go forward 10 seconds"
        >
          <FaRotateRight />
          <span>10</span>
        </button>
      </div>

      <input
        className="audio-player__progress"
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={currentTime}
        style={{
          background: `linear-gradient(
      to right,
      #032b41 0%,
      #032b41 ${progressPercentage}%,
      #d4d9dc ${progressPercentage}%,
      #d4d9dc 100%
    )`,
        }}
        onChange={(event) => {
          handleSeek(Number(event.target.value));
        }}
        aria-label="Audio progress"
      />

      <div className="audio-player__time">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="audio-player__speed">
        <span>Playback speed:</span>

        {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
          <button
            key={rate}
            type="button"
            className={`audio-player__speed-button ${
              playbackRate === rate ? "audio-player__speed-button--active" : ""
            }`}
            onClick={() => changePlaybackRate(rate)}
          >
            {rate}x
          </button>
        ))}
      </div>
    </div>
  );
}
