import { FileDataProps } from '@/types';
import { Link } from '@inertiajs/react';
import Masonry from 'react-masonry-css';

export default function DisplayFiles({ items }: { items: FileDataProps[] }) {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };
    return items.map((file, idx) => (
        <Masonry className="my-masonry-grid" columnClassName="my-masonry-grid_column" key={`${file.id}-${idx}`} breakpointCols={breakpointColumnsObj}>
            <Link href={route('files.show', { file: file.id })}>
                <img className="h-auto max-w-full rounded-2xl" src={file.image} alt={file.name}></img>
                {/* <AspectRatio ratio={15 / 9} className="rounded-lg bg-muted">
                <img src={file.image} alt={file.name} className="h-full w-full rounded-lg object-cover" />
            </AspectRatio> */}
            </Link>
        </Masonry>
    ));
}
