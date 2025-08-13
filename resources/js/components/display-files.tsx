import { FileDataProps } from '@/types';
import { Link } from '@inertiajs/react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

export default function DisplayFiles({ items }: { items: FileDataProps[] }) {
    return items.map((file, idx) => (
        <Link key={`${file.id}-${idx}`} href={route('files.show', { file: file.id })}>
            <AspectRatio ratio={15 / 9} className="rounded-lg bg-muted">
                <img src={file.image} alt={file.name} className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale" />
            </AspectRatio>
        </Link>
    ));
}
