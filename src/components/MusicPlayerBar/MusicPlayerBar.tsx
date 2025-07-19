import React, {useRef, useState, useEffect} from "react";
import {
  FaHeart,
  FaPlus,
  FaRandom,
  FaStepBackward,
  FaStepForward,
  FaRedo,
  // FaPlay,
  // FaPause,
  FaListUl,
  FaVolumeUp,
  FaShareAlt,
  FaRegFileAlt,
} from "react-icons/fa";
import "./MusicPlayerBar.scss";

type Track = {
  image: string;
  title: string;
  artist: string;
  audio: string;
};

interface Props {
  currentTrack: Track | null;
  onNext?: () => void;
  onPrev?: () => void;
}

const MusicPlayerBar: React.FC<Props> = ({currentTrack, onNext, onPrev}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setCurrentTime(0);
      if (isPlaying) {
        audio.play();
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="music-bar">
      <div className="music-left">
        <img src={currentTrack.image} alt="cover" />
        <div className="info">
          <div className="title">{currentTrack.title}</div>
          <div className="artist">{currentTrack.artist}</div>
        </div>
        <div className="actions">
          <span className="mv">Video MV</span>
          <FaHeart />
          <FaPlus />
        </div>
      </div>

      <div className="music-center">
        <div className="controls">
          <FaRandom />
          <FaStepBackward onClick={onPrev} style={{cursor: "pointer"}} />
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? "■" : "▶"}
          </button>
          <FaStepForward onClick={onNext} style={{cursor: "pointer"}} />
          <FaRedo />
        </div>
        <div className="progress">
          <span>{formatTime(currentTime)}</span>
          <div className="bar" onClick={handleSeek}>
            <div
              className="played"
              style={{width: `${(currentTime / duration) * 100}%`}}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="music-right">
        <FaRegFileAlt title="Lời bài hát" />
        <FaShareAlt title="Chia sẻ" />
        <FaVolumeUp title="Âm lượng" />
        <FaListUl title="Danh sách phát" />
      </div>

      <audio ref={audioRef} src={currentTrack.audio} />
    </div>
  );
};

export default MusicPlayerBar;
