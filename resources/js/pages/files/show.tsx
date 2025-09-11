import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ShowFileDataProps } from '@/types';
import { HeartIcon } from 'lucide-react';

export default function Show({ file }: { file: ShowFileDataProps }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Show File',
            href: '/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mt-10 flex w-full flex-col justify-center gap-5 md:flex-row">
                <figure className="max-w-lg rounded-lg bg-muted p-3 transition-transform duration-300 hover:scale-105 hover:rounded-2xl hover:shadow-lg">
                    <img className="h-auto max-w-full rounded-md" src={file.data.image} alt={file.data.name} />
                    <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400" />
                </figure>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>{file.data.name}</CardTitle>
                            <CardDescription>{file.data.createdAt}</CardDescription>
                        </div>
                        <div className="cursor-pointer rounded-xl hover:bg-gray-500 hover:text-gray-50 dark:hover:bg-amber-50 dark:hover:text-gray-500">
                            <HeartIcon strokeWidth={1} className="m-2" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>{file.data.description}</p>
                    </CardContent>
                    <CardFooter className="flex gap-5">
                        <a href={route('image.download', { file: file.data.id })}>
                            <Button className="cursor-pointer">Download Image</Button>
                        </a>
                        <a href={route('dxf.download', { file: file.data.id })}>
                            <Button className="cursor-pointer">Download Dxf</Button>
                        </a>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
