import { FileDataProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function DisplayFiles({ items }: { items: FileDataProps[] }) {
    return (
        <>
            {items.map((file, idx) => (
                <Link key={`${file.id}-${idx}`} href={route('files.show', { file: file.id })}>
                    <figure className="max-w-lg rounded-lg border-primary bg-muted transition-transform duration-100 hover:scale-105 hover:rounded-2xl hover:shadow-md">
                        <img className="h-auto max-w-full rounded-2xl p-2" src={file.image} alt={file.name} />
                        <figcaption className="pb-2 text-center text-sm text-gray-500 dark:text-gray-400">{file.name}</figcaption>
                    </figure>
                </Link>
            ))}
        </>
    );
}
