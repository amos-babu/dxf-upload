import { FileDataProps } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

export default function DisplayFiles({ posts }: { posts: FileDataProps[] }) {
    const [loaded, setLoaded] = useState(false);
    return (
        <>
            {posts.map((post, idx) => (
                <Link
                    className="rounded-xl hover:shadow-md hover:inset-shadow-sm"
                    key={`${post.id}-${idx}`}
                    href={route('posts.show', { post: post.id })}
                >
                    <figure className="max-w-lg">
                        {!loaded && <Skeleton className="h-[300px] w-[300px] rounded-xl" />}
                        <img className="h-auto max-w-full rounded-2xl p-2" src={post.image} alt={post.name} onLoad={() => setLoaded(true)} />
                    </figure>
                    <h2 className="pb-2 text-center text-lg font-semibold dark:text-gray-400">
                        {post.name || <Skeleton className="h-[20px] w-[100px] rounded-md" />}
                    </h2>
                    <h4 className="pb-2 text-center text-base dark:text-gray-400">
                        {post.description || <Skeleton className="h-[16px] w-[150px] rounded-md" />}
                    </h4>
                </Link>
            ))}
        </>
    );
}
