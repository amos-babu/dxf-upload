import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ShowFileDataProps } from '@/types';
import { HeartIcon, Trash } from 'lucide-react';
import { useState } from 'react';

export default function Show({ post }: { post: ShowFileDataProps }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Show Post',
            href: '/create',
        },
    ];

    const [loaded, setLoaded] = useState(false);

    console.log(post);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="my-10 flex w-full flex-col justify-center gap-5 md:flex-row">
                <div className="flex justify-center">
                    <figure className="max-w-lg rounded-lg transition-transform duration-300 hover:scale-102 hover:rounded-2xl hover:shadow-lg">
                        {!loaded && <Skeleton className="h-[400px] w-[500px] rounded-xl" />}
                        <img className="h-auto max-w-full rounded-md" src={post.data.image} alt={post.data.name} onLoad={() => setLoaded(true)} />
                    </figure>
                </div>
                <div className="mx-5 flex items-start justify-evenly md:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">{post.data.name}</h2>
                        <p className="text-sm text-gray-500">{post.data.createdAt}</p>
                        <div>
                            <p className="text-base text-gray-700">{post.data.description}</p>
                        </div>
                        <div>
                            <a href={route('dxf.download', { post: post.data.id })}>
                                <Button className="cursor-pointer">Download Dxf</Button>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-end justify-start">
                        <div className="cursor-pointer rounded-xl hover:bg-gray-200 dark:hover:bg-gray-50 dark:hover:text-gray-900">
                            <HeartIcon className="m-2" />
                        </div>

                        <div className="cursor-pointer rounded-xl hover:bg-red-600 hover:text-gray-50 dark:hover:text-gray-100">
                            <Trash className="m-2" />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
