import DisplayFiles from '@/components/display-files';
import AppLayout from '@/layouts/app-layout';
import { DashboardPageProps, FileProps, FlashProps, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
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
    const [nextPageUrl, setNextPageUrl] = useState<string | undefined>(files.links.next);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView();

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
    }, [flash.success]);

    useEffect(() => {
        if (inView) {
            loadMore();
            setHasMore(files.meta.current_page < files.meta.last_page);
        }
    }, [inView, hasMore, files.meta.current_page, files.meta.last_page]);

    const loadMore = useCallback(() => {
        if (!hasMore) return;

        if (nextPageUrl) {
            router.visit(nextPageUrl, {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                only: ['files'],
                onSuccess: (page) => {
                    const props = page.props as unknown as DashboardPageProps;

                    setItems((prev) => [...prev, ...props.files.data]);
                    setNextPageUrl(props.files.links.next);
                },
            });
        }
    }, [hasMore, nextPageUrl]);

    useEffect(() => {
        const cached = localStorage.getItem('files');
        if (cached) {
            setItems(JSON.parse(cached));
        } else {
            setItems((prev) => [...prev, ...files.data]);
        }
    }, [files.data]);

    useEffect(() => {
        localStorage.setItem('files', JSON.stringify(items));
    }, [items]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Toaster richColors position="top-center" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <DisplayFiles items={items} />
                </div>

                {hasMore && (
                    <div ref={ref} className="flex justify-center gap-3">
                        <LoaderCircle className="h-10 w-10 animate-spin" />
                        <h1 className="self-center text-2xl font-bold">Loading...</h1>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
