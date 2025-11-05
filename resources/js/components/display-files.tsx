import { FileDataProps } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

export default function DisplayFiles({ posts }: { posts: FileDataProps[] }) {
    const [loaded, setLoaded] = useState(false);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

    const handleImageLoad = (id: number) => {
        setLoadedImages((prev) => new Set(prev).add(id));
    };
    return (
        <>
            {posts.map((post, idx) => (
                <Link
                    className="rounded-xl hover:shadow-md/30 dark:hover:bg-accent"
                    key={`${post.id}-${idx}`}
                    href={route('posts.show', { post: post.id })}
                >
                    <figure className="aspect-square max-w-lg overflow-hidden rounded-xl">
                        {!loadedImages.has(post.id) && <Skeleton className="h-[300px] w-[300px] rounded-xl" />}
                        <img
                            className={`h-full w-full rounded-2xl object-cover transition-opacity duration-300 ${loadedImages.has(post.id) ? 'opacity-100' : 'opacity-0'}`}
                            src={post.image}
                            alt={post.name}
                            onLoad={() => handleImageLoad(post.id)}
                        />
                    </figure>
                    <h2 className="pb-2 text-center text-lg font-semibold dark:text-gray-200">
                        {!loadedImages.has(post.id) ? (
                            <Skeleton className="mt-3 h-[20px] w-[100px] rounded-md text-center text-gray-300" />
                        ) : (
                            <p>{post.name}</p>
                        )}
                    </h2>
                    <h4 className="pb-2 text-center text-base dark:text-gray-400">
                        {!loadedImages.has(post.id) ? <Skeleton className="h-[16px] w-[150px] rounded-md" /> : <p>{post.description}</p>}
                    </h4>
                </Link>
            ))}
        </>
    );
}
