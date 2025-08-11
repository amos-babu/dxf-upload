import { AspectRatio } from '@/components/ui/aspect-ratio';
import AppLayout from '@/layouts/app-layout';
import { FileProps, FlashProps, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
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
    const [successMessage, setSuccessMessage] = useState(flash.success);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            setSuccessMessage(undefined);
        }
    }, [successMessage]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Toaster richColors position="top-center" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {files.data.map((file) => (
                        <Link key={file.id} href={route('files.show', file)}>
                            <AspectRatio ratio={15 / 9} className="rounded-lg bg-muted">
                                <img
                                    src={file.image}
                                    alt={file.name}
                                    className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                                />
                            </AspectRatio>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
