import DisplayFiles from '@/components/display-files';
import Pagination from '@/components/pagination-links';
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

export default function Dashboard({ files }: { files: FileProps }) {
    const { flash } = usePage<FlashProps>().props;
    console.log(files);

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
    }, [flash.success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Toaster richColors position="top-center" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Suspense fallback={<h4 className="text-center">Loading ...</h4>}>
                        <DisplayFiles items={files.data} />
                    </Suspense>
                    {/* <DisplayFiles items={files.data} /> */}
                </div>
                <Pagination links={files.links} />
            </div>
        </AppLayout>
    );
}
