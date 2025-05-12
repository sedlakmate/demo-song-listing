import type { Song } from "../../types/song";
import Image from "next/image";
import { sanitizeUrl } from "../../utils/sanitize-url";

const host = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export function SongCard(props: { song: Song }) {
  return (
    <div className="carousel-item flex justify-center">
      <div
        className="card card-side bg-base-200 shadow-xl w-full
                      max-w-sm md:max-w-2xl xl:max-w-4xl h-32 md:h-48 xl:h-64"
      >
        <figure className="w-1/3 h-full">
          <Image
            src={sanitizeUrl(`${host}/${props.song.imageUrl}`)}
            alt={props.song.name}
            width={300}
            height={300}
            unoptimized
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body h-full justify-center px-4">
          <h2 className="card-title text-base md:text-lg xl:text-xl">
            {props.song.name}
          </h2>
          <p className="text-sm md:text-base">{props.song.artist}</p>
        </div>
      </div>
    </div>
  );
}
