import { FileDataProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function DisplayFiles({ items }: { items: FileDataProps[] }) {
    return (
        <>
            {items.map((file, idx) => (
                <Link key={`${file.id}-${idx}`} href={route('files.show', { file: file.id })}>
                    <figure className="max-w-lg rounded-lg bg-muted p-3 transition-transform duration-300 hover:scale-105 hover:rounded-2xl hover:shadow-lg">
                        <img className="h-auto max-w-full rounded-md" src={file.image} alt={file.name} />
                        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">{file.name}</figcaption>
                    </figure>
                </Link>
            ))}
        </>
    );
}
