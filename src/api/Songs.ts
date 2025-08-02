import { fetcher } from './Fetcher';

interface Artist {
  id: string;
  name: string;
}

interface Audio {
  id: string;
  url: string;
}

interface Image {
  SMALL: string;
  DEFAULT: string;
}

interface SongApi {
  id: string;
  name: string;
  artists: Artist[];
  audios: Audio[];
  images: Image;
  duration: number;
}

export interface Song {
  id: string;
  image: string;
  title: string;
  artist: string;
  song: string;
  duration: string;
}

export async function getRecommendedSongs(page: number = 1, pageSize: number = 20): Promise<Song[]> {
  try {
    const songs: SongApi[] = await fetcher<SongApi[]>({
      url: `/songs/recommended?page=${page}&pageSize=${pageSize}`,
      method: 'GET',
    });

    return songs.map(s => ({
      id: s.id,
      image: s.images.DEFAULT,
      title: s.name,
      artist: s.artists?.[0]?.name || 'Unknown Artist',
      song: s.audios?.[0]?.url || '',
      duration: s.duration.toString(),
    }));
  } catch (err) {
    // console.error('Failed to fetch recommended songs:', err);
    throw err;
  }
}
