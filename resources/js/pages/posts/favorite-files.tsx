import DisplayFiles from '@/components/display-files';
import { PaginationLinks } from '@/components/pagination-links';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, FileProps } from '@/types';
import { Suspense } from 'react';

export default function Show({ favoritePosts }: { favoritePosts: FileProps }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Show Favorite Posts',
            href: '/favorites',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    <Suspense fallback={<h4 className="text-center">Loading ...</h4>}>
                        <DisplayFiles posts={favoritePosts.data} />
                    </Suspense>
                </div>
                <div className="p-5">
                    <PaginationLinks links={favoritePosts.links} meta={favoritePosts.meta} />
                </div>
            </div>
        </AppLayout>
    );
}
