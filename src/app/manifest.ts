import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Share Tray',
    short_name: 'Share Tray',
    description: 'Authentic Vietnamese food discovery, food passport, and shared dining tables.',
    start_url: '/',
    display: 'standalone',
    background_color: '#15171A',
    theme_color: '#C8281E',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
