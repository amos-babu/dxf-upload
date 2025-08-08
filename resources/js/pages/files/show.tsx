import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

export default function Show() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Show File',
            href: '/create',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <></>
        </AppLayout>
    );
}
