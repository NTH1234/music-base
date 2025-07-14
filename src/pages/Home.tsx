import "../styles/style.scss";
import "../styles/global.scss";
import { useEffect, useRef, useState } from 'react';

const Songs = [
  {
    id: 1,
    title: "Sai từ đầu",
    artist: "Giang Hồng Ngọc, Ali Hoàng Dương",
    cover: "/image/background_login.png",
  },
  {
    id: 2,
    title: "Chúng ta của hiện tại",
    artist: "Sơn Tùng - MTP",
    cover: "/image/background_login.png",
  },
  {
    id: 3,
    title: "Nhân Sinh Quán",
    artist: "Út nhị Mino",
    cover: "/image/background_login.png",
  },
  {
    id: 4,
    title: "Mưa rơi vào phòng",
    artist: "Khởi My",
    cover: "/image/background_login.png",
  },
  {
    id: 5,
    title: "Mưa rơi vào phòng",
    artist: "Khởi My",
    cover: "/image/background_login.png",
  },
  {
    id: 6,
    title: "Mưa rơi vào phòng",
    artist: "Khởi My",
    cover: "/image/background_login.png",
  },
  {
    id: 7,
    title: "Mưa rơi vào phòng",
    artist: "Khởi My",
    cover: "/image/background_login.png",
  },
  {
    id: 8,
    title: "Mưa rơi vào phòng",
    artist: "Khởi My",
    cover: "/image/background_login.png",
  },
  {
    id: 9,
    title: "Mưa rơi vào phòng",
    artist: "Khởi My",
    cover: "/image/background_login.png",
  },
];

const Top100 = [
  {
    id: 1,
    title: "Nhạc Phim",
    artist: "Lưu Vũ Ninh",
    cover: "/image/background_login.png",
  },
  {
    id: 2,
    title: "Top100Today",
    artist: "Ali Hoàng Dương",
    cover: "/image/background_login.png",
  },
];

const fakeArtists = [
  {
    id: 1,
    name: "Sơn Tùng M-TP",
    songNumber: 9,
    favorite: 18,
    cover: "/image/son-tung.jpg",
  },
  {
    id: 2,
    name: "Thùy Chi",
    songNumber: 0,
    favorite: 13,
    cover: "/image/thuy-chi.jpg",
  },
  {
    id: 3,
    name: "Hòa Minzy",
    songNumber: 0,
    favorite: 12,
    cover: "/image/hoa-minzy.jpg",
  },
  {
    id: 4,
    name: "Bùi Anh Tuấn",
    songNumber: 0,
    favorite: 9,
    cover: "/image/bui-anh-tuan.jpg",
  },
  {
    id: 5,
    name: "Bằng Kiều",
    songNumber: 0,
    favorite: 7,
    cover: "/image/bang-kieu.jpg",
  },
  {
    id: 6,
    name: "Hà Anh Tuấn",
    songNumber: 0,
    favorite: 5,
    cover: "/image/ha-anh-tuan.jpg",
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
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
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
      grid.addEventListener('scroll', updateArrowVisibility);
      return () => grid.removeEventListener('scroll', updateArrowVisibility);
    }
  }, []);

  return { showLeftArrow, showRightArrow, scrollSlider };
}

function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button className={`arrow-btn ${direction}`} onClick={onClick}>
      {direction === 'left' ? '\u2039' : '\u203A'}
    </button>
  );
}

const Section = ({
  title,
  data,
  hideInfo = false,
}: {
  title: string;
  data: typeof Songs;
  hideInfo?: boolean;
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { showLeftArrow, showRightArrow, scrollSlider } = useScrollArrows(sliderRef);

  return (
    <section className="slider-section">
      <h2 className="main-title">{title}</h2>
      <div className="slider-wrapper">
        {showLeftArrow && <ArrowButton direction="left" onClick={() => scrollSlider('left')} />}
        <div className="song-list-grid" ref={sliderRef}>
          {data.map((song) => (
            <div className="song-card-wrapper" key={song.id}>
              <div className="song-card">
                <img src={song.cover} alt={song.title} className="song-cover" />
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
        {showRightArrow && <ArrowButton direction="right" onClick={() => scrollSlider('right')} />}
      </div>
    </section>
  );
};

const SectionArtist = ({ title, data }: { title: string; data: typeof fakeArtists }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { showLeftArrow, showRightArrow, scrollSlider } = useScrollArrows(sliderRef);

  return (
    <section className="slider-section">
      <h2 className="main-title">{title}</h2>
      <div className="slider-wrapper">
        {showLeftArrow && <ArrowButton direction="left" onClick={() => scrollSlider('left')} />}
        <div className="artist-list-grid" ref={sliderRef}>
          {data.map((artist) => (
            <div className="artist-card-wrapper" key={artist.id}>
              <div className="artist-card">
                <img src={artist.cover} alt={artist.name} className="artist-cover" />
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
        {showRightArrow && <ArrowButton direction="right" onClick={() => scrollSlider('right')} />}
      </div>
    </section>
  );
};

const Home = () => (
  <div className="home-container">
    <Section title="Nghe gì hôm nay" data={Songs} hideInfo={true} />
    <Section title="Nhạc TOP 100" data={Top100} />
    <SectionArtist title="Nghệ sĩ yêu thích" data={fakeArtists} />
  </div>
);

export default Home;
