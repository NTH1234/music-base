import "../styles/style.scss";
import "../styles/global.scss";
import {useEffect, useRef, useState} from "react";
import MusicPlayerBar from "../components/MusicPlayerBar/MusicPlayerBar";
// import { SimCard } from "@mui/icons-material";

const Songs = [
  {
    id: 1,
    title: "Sai từ đầu",
    artist: "Giang Hồng Ngọc, Ali Hoàng Dương",
    image: "/image/background_login.png",
    audio: "/mp3/song1.mp3",
  },
  {
    id: 2,
    title: "Chúng ta của hiện tại",
    artist: "Sơn Tùng - MTP",
    image: "/image/background_login.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 3,
    title: "Nhân Sinh Quán",
    artist: "Út nhị Mino",
    image: "/image/background_login.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 4,
    title: "Mưa rơi vào phòng",
    artist: "Khởi My",
    image: "/image/background_login.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: 5,
    title: "Mưa rơi vào phòng",
    artist: "Khởi My",
    image: "/image/background_login.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 6,
    title: "Mưa rơi vào phòng",
    artist: "Khởi My",
    image: "/image/background_login.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 7,
    title: "Mưa rơi vào phòng",
    artist: "Khởi My",
    image: "/image/background_login.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 8,
    title: "Mưa rơi vào phòng",
    artist: "Khởi My",
    image: "/image/background_login.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 9,
    title: "Mưa rơi vào phòng",
    artist: "Khởi My",
    image: "/image/background_login.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
];

const Top100 = [
  {
    id: 1,
    title: "Nhạc Phim",
    artist: "Lưu Vũ Ninh",
    image: "/image/background_login.png",
    audio: "/mp3/song1.mp3",
  },
  {
    id: 2,
    title: "Top100Today",
    artist: "Ali Hoàng Dương",
    image: "/image/background_login.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
];

const fakeArtists = [
  {
    id: 1,
    name: "Sơn Tùng M-TP",
    songNumber: 9,
    favorite: 18,
    image: "/image/son-tung.jpg",
  },
  {
    id: 2,
    name: "Thùy Chi",
    songNumber: 0,
    favorite: 13,
    image: "/image/thuy-chi.jpg",
  },
  {
    id: 3,
    name: "Hòa Minzy",
    songNumber: 0,
    favorite: 12,
    image: "/image/hoa-minzy.jpg",
  },
  {
    id: 4,
    name: "Bùi Anh Tuấn",
    songNumber: 0,
    favorite: 9,
    image: "/image/bui-anh-tuan.jpg",
  },
  {
    id: 5,
    name: "Bằng Kiều",
    songNumber: 0,
    favorite: 7,
    image: "/image/bang-kieu.jpg",
  },
  {
    id: 6,
    name: "Hà Anh Tuấn",
    songNumber: 0,
    favorite: 5,
    image: "/image/ha-anh-tuan.jpg",
  },
];

function useScrollArrows(ref: React.RefObject<HTMLDivElement | null>) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollSlider = (direction: string) => {
    const grid = ref.current;
    if (grid) {
      const scrollAmount = 250;
      grid.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const updateArrowVisibility = () => {
    const grid = ref.current;
    if (grid) {
      setShowLeftArrow(grid.scrollLeft > 0);
      setShowRightArrow(grid.scrollLeft + grid.clientWidth < grid.scrollWidth);
    }
  };

  useEffect(() => {
    updateArrowVisibility();
    const grid = ref.current;
    if (grid) {
      grid.addEventListener("scroll", updateArrowVisibility);
      return () => grid.removeEventListener("scroll", updateArrowVisibility);
    }
  }, []);

  return {showLeftArrow, showRightArrow, scrollSlider};
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button className={`arrow-btn ${direction}`} onClick={onClick}>
      {direction === "left" ? "\u2039" : "\u203A"}
    </button>
  );
}

const Section = ({
  title,
  data,
  hideInfo = false,
  onSelectTrack,
}: {
  title: string;
  data: typeof Songs;
  hideInfo?: boolean;
  onSelectTrack?: (track: any, index: number) => void;
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const {showLeftArrow, showRightArrow, scrollSlider} =
    useScrollArrows(sliderRef);

  return (
    <section className="slider-section">
      <h2 className="main-title">{title}</h2>
      <div className="slider-wrapper">
        {showLeftArrow && (
          <ArrowButton direction="left" onClick={() => scrollSlider("left")} />
        )}
        <div className="song-list-grid" ref={sliderRef}>
          {data.map((song, idx) => (
            <div
              className="song-card-wrapper"
              key={song.id}
              onClick={() => onSelectTrack && onSelectTrack(song, idx)}
              style={{cursor: "pointer"}}
            >
              <div className="song-card">
                <img src={song.image} alt={song.title} className="song-cover" />
                {!hideInfo && (
                  <div className="song-info">
                    <div className="song-title">{song.title}</div>
                    <div className="song-artist">{song.artist}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {showRightArrow && (
          <ArrowButton
            direction="right"
            onClick={() => scrollSlider("right")}
          />
        )}
      </div>
    </section>
  );
};

const SectionArtist = ({
  title,
  data,
}: {
  title: string;
  data: typeof fakeArtists;
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const {showLeftArrow, showRightArrow, scrollSlider} =
    useScrollArrows(sliderRef);

  return (
    <section className="slider-section">
      <h2 className="main-title">{title}</h2>
      <div className="slider-wrapper">
        {showLeftArrow && (
          <ArrowButton direction="left" onClick={() => scrollSlider("left")} />
        )}
        <div className="artist-list-grid" ref={sliderRef}>
          {data.map((artist) => (
            <div className="artist-card-wrapper" key={artist.id}>
              <div className="artist-card">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="artist-cover"
                />
                <div className="artist-info">
                  <div className="artist-name">{artist.name}</div>
                  <div className="artist-meta">{artist.songNumber} Bài hát</div>
                  <div className="artist-meta">{artist.favorite} Yêu thích</div>
                  <button className="artist-follow">+ Yêu thích</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showRightArrow && (
          <ArrowButton
            direction="right"
            onClick={() => scrollSlider("right")}
          />
        )}
      </div>
    </section>
  );
};

const Home = () => {
  const [currentTrack, setCurrentTrack] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSelectTrack = (track: any, index: number) => {
    setCurrentTrack(track);
    setCurrentIndex(index);
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % Songs.length;
    setCurrentIndex(nextIndex);
    setCurrentTrack(Songs[nextIndex]);
  };
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1) % Songs.length;
    setCurrentIndex(prevIndex);
    setCurrentTrack(Songs[prevIndex]);
  };

  return (
    <div className="home-container">
      <Section
        title="Nghe gì hôm nay"
        data={Songs}
        hideInfo={true}
        onSelectTrack={handleSelectTrack}
      />
      <Section
        title="Nhạc TOP 100"
        data={Top100}
        onSelectTrack={handleSelectTrack}
      />
      <SectionArtist title="Nghệ sĩ yêu thích" data={fakeArtists} />
      <MusicPlayerBar
        currentTrack={currentTrack}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
export default Home;
