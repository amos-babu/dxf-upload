import { FileDataProps } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

export default function DisplayFiles({ items }: { items: FileDataProps[] }) {
    const [loaded, setLoaded] = useState(false);
    return (
        <>
            {items.map((file, idx) => (
                <Link
                    className="rounded-xl hover:shadow-md hover:inset-shadow-sm"
                    key={`${file.id}-${idx}`}
                    href={route('files.show', { file: file.id })}
                >
                    <figure className="max-w-lg">
                        {!loaded && <Skeleton className="h-[300px] w-[300px] rounded-xl" />}
                        <img className="h-auto max-w-full rounded-2xl p-2" src={file.image} alt={file.name} onLoad={() => setLoaded(true)} />
                    </figure>
                    <h2 className="pb-2 text-center text-lg font-semibold dark:text-gray-400">{file.name || <Skeleton className="h-[20px] w-[100px] rounded-md" />}</h2>
                    <h4 className="pb-2 text-center text-base dark:text-gray-400">{file.description || <Skeleton className="h-[16px] w-[150px] rounded-md" />}</h4>
                </Link>
            ))}
        </>
    );
}
