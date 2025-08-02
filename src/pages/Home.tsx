import "../styles/style.scss";
import "../styles/global.scss";
import {useEffect, useRef, useState} from "react";
import MusicPlayerBar from "../components/MusicPlayerBar/MusicPlayerBar";
import { getRecommendedSongs, Song } from "../api/Songs";
import { getTop100Playlists, Album } from "../api/Playlists";
import { getFavoriteArtists, Artist } from "../api/Artist";
// import { SimCard } from "@mui/icons-material";



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
  data: Array<{
    id: number;
    title: string;
    artist: string;
    image: string;
    audio: string;
  }>;
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
  data: Array<{
    id: number;
    name: string;
    songNumber: number;
    favorite: number;
    image: string;
  }>;
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
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const [top100Playlists, setTop100Playlists] = useState<Album[]>([]);
  const [favoriteArtists, setFavoriteArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTop100, setLoadingTop100] = useState(true);
  const [loadingArtists, setLoadingArtists] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorTop100, setErrorTop100] = useState<string | null>(null);
  const [errorArtists, setErrorArtists] = useState<string | null>(null);

  // Fetch recommended songs from API
  useEffect(() => {
    const fetchRecommendedSongs = async () => {
      try {
        setLoading(true);
        // console.log('Fetching recommended songs...');
        const songs = await getRecommendedSongs(1, 20);
        // console.log('Received songs:', songs);
        setRecommendedSongs(songs);
        setError(null);
      } catch (err) {
        // console.error('Error fetching recommended songs:', err);
        setError('Không thể tải danh sách bài hát đề xuất');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedSongs();
  }, []);

  // Fetch Top 100 playlists from API
  useEffect(() => {
    const fetchTop100Playlists = async () => {
      try {
        setLoadingTop100(true);
        // console.log('Fetching Top 100 playlists...');
        const playlists = await getTop100Playlists();
        // console.log('Received Top 100 playlists:', playlists);
        setTop100Playlists(playlists);
        setErrorTop100(null);
      } catch (err) {
        // console.error('Error fetching Top 100 playlists:', err);
        setErrorTop100('Không thể tải danh sách Top 100');
      } finally {
        setLoadingTop100(false);
      }
    };

    fetchTop100Playlists();
  }, []);

  // Fetch favorite artists from API
  useEffect(() => {
    const fetchFavoriteArtists = async () => {
      try {
        setLoadingArtists(true);
        // console.log('Fetching favorite artists...');
        const artists = await getFavoriteArtists();
        // console.log('Received favorite artists:', artists);
        setFavoriteArtists(artists);
        setErrorArtists(null);
      } catch (err) {
        // console.error('Error fetching favorite artists:', err);
        setErrorArtists('Không thể tải danh sách nghệ sĩ yêu thích');
      } finally {
        setLoadingArtists(false);
      }
    };

    fetchFavoriteArtists();
  }, []);

  const handleSelectTrack = (track: any, index: number) => {
    setCurrentTrack(track);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const allSongs = [...recommendedSongs, ...top100Playlists];
    const nextIndex = (currentIndex + 1) % allSongs.length;
    setCurrentIndex(nextIndex);
    setCurrentTrack(allSongs[nextIndex]);
  };

  const handlePrev = () => {
    const allSongs = [...recommendedSongs, ...top100Playlists];
    const prevIndex = currentIndex === 0 ? allSongs.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentTrack(allSongs[prevIndex]);
  };

  // Transform API songs to match the expected format
  const transformApiSongs = (songs: Song[]) => {
    return songs.map(song => ({
      id: parseInt(song.id) || Math.random(),
      title: song.title,
      artist: song.artist,
      image: song.image,
      audio: song.song,
    }));
  };

  // Transform API playlists to match the expected format
  const transformApiPlaylists = (playlists: Album[]) => {
    return playlists.map(playlist => ({
      id: parseInt(playlist.id) || Math.random(),
      title: playlist.title,
      artist: playlist.artist,
      image: playlist.image,
      audio: '', // Playlists don't have direct audio, this will be handled by the player
    }));
  };

  // Transform API artists to match the expected format
  const transformApiArtists = (artists: Artist[]) => {
    return artists.map(artist => ({
      id: parseInt(artist.id) || Math.random(),
      name: artist.name,
      songNumber: artist.songsCount,
      favorite: artist.likesCount,
      image: artist.image,
    }));
  };

  return (
    <div className="home-container">
      <Section
        title="Nghe gì hôm nay"
        data={loading ? [] : transformApiSongs(recommendedSongs)}
        hideInfo={true}
        onSelectTrack={handleSelectTrack}
      />
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Đang tải danh sách bài hát...
        </div>
      )}
      {error && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          {error}
        </div>
      )}
      <Section
        title="Nhạc TOP 100"
        data={loadingTop100 ? [] : transformApiPlaylists(top100Playlists)}
        onSelectTrack={handleSelectTrack}
      />
      {loadingTop100 && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Đang tải danh sách Top 100...
        </div>
      )}
      {errorTop100 && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          {errorTop100}
        </div>
      )}
      <SectionArtist title="Nghệ sĩ yêu thích" data={loadingArtists ? [] : transformApiArtists(favoriteArtists)} />
      {loadingArtists && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Đang tải danh sách nghệ sĩ...
        </div>
      )}
      {errorArtists && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          {errorArtists}
        </div>
      )}
      <MusicPlayerBar
        currentTrack={currentTrack}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
export default Home;
