import DisplayFiles from '@/components/display-files';
import FilesNotFound from '@/components/files-notfound';
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

    console.log(favoritePosts);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {favoritePosts.data.length > 0 ? (
                    <div className="grid auto-rows-min justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                        <Suspense fallback={<h4 className="text-center">Loading ...</h4>}>
                            <DisplayFiles posts={favoritePosts.data} />
                        </Suspense>
                    </div>
                ) : (
                    <FilesNotFound message="Like some files to add them to your favorites." />
                )}

                {favoritePosts.data.length > 0 && (
                    <div className="p-5">
                        <PaginationLinks links={favoritePosts.links} meta={favoritePosts.meta} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
