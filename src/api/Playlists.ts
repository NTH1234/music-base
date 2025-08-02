import { fetcher } from './Fetcher';

interface Artist {
  id: string;
  name: string;
}

interface Image {
  SMALL: string;
  DEFAULT: string;
}

interface PlaylistApi {
  id: string;
  name: string;
  images: Image;
  artists: Artist[];
}

export interface Album {
  id: string;
  image: string;
  title: string;
  artist: string;
}

export async function getTop100Playlists(): Promise<Album[]> {
  try {
    const data: PlaylistApi[] = await fetcher<PlaylistApi[]>({
      url: '/playlists/top100',
      method: 'GET',
    });

    return data.map(p => ({
      id: p.id,
      image: p.images.DEFAULT,
      title: p.name,
      artist: p.artists?.length
        ? p.artists.map(a => a.name).join(', ')
        : 'Various Artists',
    }));
  } catch (err) {
    // console.error('Failed to fetch Top 100 playlists:', err);
    throw err;
  }
}
