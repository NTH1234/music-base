import { fetcher } from './Fetcher';

interface ArtistImage {
  SMALL: string;
  DEFAULT: string;
}

interface ArtistApi {
  id: string;
  name: string;
  avatar: string;
  images: ArtistImage;
  totalSongs: number;
  totalLikes: number;
}

export interface Artist {
  id: string;
  image: string;
  name: string;
  songsCount: number;
  likesCount: number;
}

export async function getFavoriteArtists(): Promise<Artist[]> {
  try {
    const data: ArtistApi[] = await fetcher<ArtistApi[]>({
      url: '/artists/top-favourite',
      method: 'GET',
    });

    return data.map(a => ({
      id: a.id,
      image: a.images?.DEFAULT || a.avatar || '',
      name: a.name,
      songsCount: a.totalSongs || 0,
      likesCount: a.totalLikes || 0,
    }));
  } catch (err) {
    console.error('Failed to fetch favorite artists:', err);
    throw err;
  }
}
