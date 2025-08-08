import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

export default function Create() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Upload File',
            href: '/create',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <></>
        </AppLayout>
    );
}
