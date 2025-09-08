import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ShowFileDataProps } from '@/types';

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
                <AspectRatio ratio={19 / 5} className="rounded-lg bg-muted">
                    <img src={file.data.image} alt={file.data.name} className="h-full w-full rounded-lg border object-cover shadow-lg" />
                </AspectRatio>

                {/* <figure className="bg-muted">
                    <img className="h-auto rounded-md" src={file.data.image} alt={file.data.name} />
                    <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">{file.data.name}</figcaption>
                </figure> */}
                <Card>
                    <CardHeader>
                        <CardTitle>{file.data.name}</CardTitle>
                        <CardDescription>{file.data.createdAt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{file.data.description}</p>
                    </CardContent>
                    <CardFooter className="flex gap-5">
                        <Button>Download Image</Button>
                        <Button>Download DXF</Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
