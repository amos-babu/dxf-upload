import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ShowFileDataProps } from '@/types';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

export default function Show({ file }: { file: ShowFileDataProps }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Show File',
            href: '/create',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mt-10 flex flex-col justify-center gap-5">
                <AspectRatio ratio={16 / 15} className="rounded-lg bg-muted">
                    <img src={file.data.image} alt={file.data.name} className="h-full w-full rounded-lg object-cover" />
                </AspectRatio>
                <Card>
                    <CardHeader>
                        <CardTitle>{file.data.name}</CardTitle>
                        <CardDescription>{file.data.createdAt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{file.data.description}</p>
                    </CardContent>
                    <CardFooter className='flex gap-5'>
                        <Button>Download Image</Button>
                        <Button>Download DXF</Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
