import DisplayFiles from '@/components/display-files';
import AppLayout from '@/layouts/app-layout';
import { FileProps, FlashProps, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ files }: { files: FileProps }) {
    const { flash } = usePage<FlashProps>().props;
    const [items, setItems] = useState(files.data);

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
    }, [flash.success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Toaster richColors position="top-center" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <DisplayFiles items={items} />
                </div>

                <div className="mt-10 flex justify-center gap-10">
                    {files.links.prev ? (
                        <div className="flex gap-3">
                            <ChevronLeft className="h-5 w-5 self-center" />
                            <Link href={files.links.prev}>Previous</Link>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <ChevronLeft color="gray" className="h-5 w-5 self-center" />
                            <p className="cursor-pointer text-base text-muted-foreground">Previous</p>
                        </div>
                    )}

                    {files.links.next ? (
                        <div className="flex gap-3">
                            <Link href={files.links.next} className="self-center">
                                Next
                            </Link>
                            <ChevronRight className="h-5 w-5 self-center" />
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <p className="cursor-pointer self-center text-base text-muted-foreground">Next</p>
                            <ChevronRight color="gray" className="h-5 w-5 self-center" />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
