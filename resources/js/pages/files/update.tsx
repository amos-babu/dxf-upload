import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

export default function Update() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Update File',
            href: '/update',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <></>
        </AppLayout>
    );
}
