import { AspectRatio } from '@/components/ui/aspect-ratio';
import AppLayout from '@/layouts/app-layout';
import { FileProps, FlashProps, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
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
    const [items, setItems] = useState(files.data)
    const [nextPage, setNextPage] = useState(files.links.next)
    const [successMessage, setSuccessMessage] = useState(flash.success);

    useEffect(() => {
        setItems(files.data)
        setNextPage(files.links.next)
    }, [files])

    const loadMore = () => {
        if (!nextPage) return

        router.visit(nextPage, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            only: ['files'],
            onSuccess: (page) => {
                setItems(prev => [...prev, ...page.props.files.data ])
                setNextPage(page.props.files.links.next);
            }
        });
    };


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
                    {items.map((file) => (
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
