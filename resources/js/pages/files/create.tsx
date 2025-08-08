import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
            <form>
                <h1 className="my-7 text-center text-lg font-bold">Upload your file here</h1>
                <div className="px-6 py-3">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" placeholder="Name" className="mt-3" />
                </div>
                <div className="px-6 py-3">
                    <Label htmlFor="name">Description</Label>
                    <Textarea className="mt-3" placeholder="Type your description here.." />
                </div>
                <div className="px-6 py-3">
                    <Label htmlFor="name">File Image</Label>
                    <Input id="picture" type="file" className="mt-3" />
                </div>
                <div className="px-6 py-3">
                    <Label htmlFor="name">Dxf File</Label>
                    <Input id="picture" type="file" className="mt-3" />
                </div>
                <div className="px-6 pt-3">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </AppLayout>
    );
}
