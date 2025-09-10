import { FileDataProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function DisplayFiles({ items }: { items: FileDataProps[] }) {
    // const breakpointColumnsObj = {
    //     default: 3,
    //     1100: 3,
    //     700: 2,
    //     500: 1,
    // };
    return items.map((file, idx) => (
        // <Masonry className="my-masonry-grid" columnClassName="my-masonry-grid_column" key={`${file.id}-${idx}`} breakpointCols={breakpointColumnsObj}>
        <Link key={`${file.id}-${idx}`} href={route('files.show', { file: file.id })}>
            {/* <img className="h-auto max-w-full rounded-2xl" src={file.image} alt={file.name}></img> */}
            {/* <AspectRatio ratio={15 / 9} className="rounded-lg bg-muted">
                <img src={file.image} alt={file.name} className="h-full w-full rounded-lg object-cover" />
            </AspectRatio> */}

            <figure className="max-w-lg rounded-lg bg-muted p-3 transition-transform duration-300 hover:scale-105 hover:rounded-2xl hover:shadow-lg">
                <img className="h-auto max-w-full rounded-md" src={file.image} alt={file.name} />
                <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">{file.name}</figcaption>
            </figure>
        </Link>
        // </Masonry>
    ));
}
