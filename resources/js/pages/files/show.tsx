import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ShowFileDataProps } from '@/types';

export default function Show({ file }: { file: ShowFileDataProps }) {
    console.log(file);
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
