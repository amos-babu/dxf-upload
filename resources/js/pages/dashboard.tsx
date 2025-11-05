import DisplayFiles from '@/components/display-files';
import FilesNotFound from '@/components/files-notfound';
import { PaginationLinks } from '@/components/pagination-links';
import AppLayout from '@/layouts/app-layout';
import { FileProps, FlashProps, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Suspense, useEffect } from 'react';
import { toast, Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ posts }: { posts: FileProps }) {
    const { flash } = usePage<FlashProps>().props;

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
    }, [flash.success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Toaster richColors position="top-center" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {posts.data.length > 0 ? (
                    <div className="grid auto-rows-min justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                        <Suspense fallback={<h4 className="text-center">Loading ...</h4>}>
                            <DisplayFiles posts={posts.data} />
                        </Suspense>
                    </div>
                ) : (
                    <FilesNotFound message="Upload some files to get started." />
                )}

                {posts.data.length > 0 && (
                    <div className="p-5">
                        <PaginationLinks links={posts.links} meta={posts.meta} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
