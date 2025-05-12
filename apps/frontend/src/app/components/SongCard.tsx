import type { Song } from '../../types/song';
import Image from 'next/image';
import { sanitizeUrl } from '../../utils/sanitize-url';
import { SongActionsMenu } from './SongActionsMenu';

const host = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001';

export function SongCard(props: { song: Song; onDelete: () => void; onEdit: () => void }) {
  const { song, onDelete, onEdit } = props;
  return (
    <div className="carousel-item flex justify-center">
      <div className="card card-side bg-base-200 relative h-32 w-full max-w-sm items-center shadow-xl md:h-48 md:max-w-2xl xl:h-64 xl:max-w-4xl">
        <SongActionsMenu onEdit={onEdit} onDelete={onDelete} />

        <figure className="aspect-square w-24 md:w-32 xl:w-48">
          <Image
            src={sanitizeUrl(`${host}/${song.imageUrl}`)}
            alt={song.name}
            width={300}
            height={300}
            unoptimized
            className="h-full w-full object-cover"
          />
        </figure>

        {/* Text */}
        <div className="card-body h-full justify-center px-4">
          <h2 className="card-title text-base md:text-lg xl:text-xl">{song.name}</h2>
          <p className="text-sm md:text-base">{song.artist}</p>
        </div>
      </div>
    </div>
  );
}
