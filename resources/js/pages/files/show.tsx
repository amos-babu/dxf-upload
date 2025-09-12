import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ShowFileDataProps } from '@/types';
import { HeartIcon, Trash } from 'lucide-react';

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
                <figure className="max-w-lg rounded-lg transition-transform duration-300 hover:scale-102 hover:rounded-2xl hover:shadow-lg">
                    <img className="h-auto max-w-full rounded-md" src={file.data.image} alt={file.data.name} />
                </figure>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>{file.data.name}</CardTitle>
                            <CardDescription>{file.data.createdAt}</CardDescription>
                        </div>
                        <div className="flex">
                            <div className="cursor-pointer rounded-xl hover:bg-gray-200 dark:hover:bg-gray-50 dark:hover:text-gray-900">
                                <HeartIcon className="m-2" />
                            </div>

                            <div className="cursor-pointer rounded-xl hover:bg-red-600 hover:text-gray-50 dark:hover:text-gray-100">
                                <Trash className="m-2" />
                            </div>
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
