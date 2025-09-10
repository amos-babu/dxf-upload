import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ShowFileDataProps } from '@/types';
import { Link, useForm } from '@inertiajs/react';

export default function Show({ file }: { file: ShowFileDataProps }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Show File',
            href: '/create',
        },
    ];

    const {} = useForm();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mt-10 flex w-full flex-col justify-center gap-5 md:flex-row">
                <figure className="max-w-lg rounded-lg bg-muted p-3 transition-transform duration-300 hover:scale-105 hover:rounded-2xl hover:shadow-lg">
                    <img className="h-auto max-w-full rounded-md" src={file.data.image} alt={file.data.name} />
                    <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400" />
                </figure>
                <Card>
                    <CardHeader>
                        <CardTitle>{file.data.name}</CardTitle>
                        <CardDescription>{file.data.createdAt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{file.data.description}</p>
                    </CardContent>
                    <CardFooter className="flex gap-5">
                        <Link href={route('image.download', { file: file.data.id })}>
                            <Button>Download Image</Button>
                        </Link>
                        <Button>Download DXF</Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
