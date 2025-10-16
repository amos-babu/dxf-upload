import { FileDataProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function DisplayFiles({ items }: { items: FileDataProps[] }) {
    return (
        <>
            {items.map((file, idx) => (
                <Link
                    className="rounded-xl hover:bg-muted hover:shadow-md hover:inset-shadow-sm"
                    key={`${file.id}-${idx}`}
                    href={route('files.show', { file: file.id })}
                >
                    <figure className="max-w-lg border-primary">
                        <img className="h-auto max-w-full rounded-2xl p-2" src={file.image} alt={file.name} />
                    </figure>
                    <h2 className="pb-2 text-center text-lg font-semibold dark:text-gray-400">{file.name}</h2>
                    <h4 className="pb-2 text-center text-base dark:text-gray-400">{file.description}</h4>
                </Link>
            ))}
        </>
    );
}
