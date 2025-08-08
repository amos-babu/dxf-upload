import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { router, useForm } from '@inertiajs/react';
import React from 'react';

type CreateProps = {
    name: string;
    description: string;
    image: File | null;
    dxf_file: File | null;
};

export default function Create() {
    const { data, setData, post, errors } = useForm<CreateProps>({
        name: '',
        description: '',
        image: null,
        dxf_file: null,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post(route('files.store'), data);
    };
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Upload File',
            href: '/create',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={submit} className="md:w-3/4 lg:w-1/2">
                <h1 className="my-7 text-center text-lg font-bold">Upload your file here</h1>
                <div className="px-6 py-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Name"
                        className="mt-3"
                    />
                </div>
                <div className="px-6 py-3">
                    <Label htmlFor="name">Description</Label>
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        name="description"
                        className="mt-3"
                        placeholder="Type your description here.."
                    />
                </div>
                <div className="px-6 py-3">
                    <Label htmlFor="name">File Image</Label>
                    <Input
                        onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                        name="image"
                        id="picture"
                        type="file"
                        className="mt-3"
                    />
                </div>
                <div className="px-6 py-3">
                    <Label htmlFor="name">Dxf File</Label>
                    <Input
                        onChange={(e) => setData('dxf_file', e.target.files ? e.target.files[0] : null)}
                        name="dxf_file"
                        id="picture"
                        type="file"
                        className="mt-3"
                    />
                </div>
                <div className="px-6 pt-3">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </AppLayout>
    );
}
