import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, CategoryOptionsProps, CreateProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

export default function Create({ categoryOptions }: { categoryOptions: CategoryOptionsProps[] }) {
    const { data, setData, post, errors, processing } = useForm<CreateProps>({
        name: '',
        description: '',
        category: '',
        image: null,
        dxf_file: null,
    });

    console.log(categoryOptions);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/files');
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Upload File',
            href: '/files/create',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex justify-center">
                <form onSubmit={submit} className="md:w-5/6 lg:w-1/2">
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
                        <p className="font-sans text-sm text-red-600">{errors.name}</p>
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
                        <p className="font-sans text-sm text-red-600">{errors.description}</p>
                    </div>
                    <div className="px-6 py-3">
                        <Label htmlFor="name">Category</Label>
                        <div className="mt-3">
                            <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        {categoryOptions.map((category) => (
                                            <SelectItem key={category.value} value={category.value}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <p className="font-sans text-sm text-red-600">{errors.category}</p>
                    </div>
                    <div className="px-6 py-3">
                        <Label htmlFor="name">File Image</Label>
                        <Input
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                            name="image"
                            id="picture"
                            type="file"
                            className="mt-3 cursor-pointer"
                        />
                        <p className="font-sans text-sm text-red-600">{errors.image}</p>
                    </div>
                    <div className="px-6 py-3">
                        <Label htmlFor="name">Dxf File</Label>
                        <Input
                            onChange={(e) => setData('dxf_file', e.target.files ? e.target.files[0] : null)}
                            name="dxf_file"
                            id="picture"
                            type="file"
                            className="mt-3 cursor-pointer"
                        />
                        <p className="font-sans text-sm text-red-600">{errors.dxf_file}</p>
                    </div>

                    <div className="px-6 pt-3 mb-6">
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
