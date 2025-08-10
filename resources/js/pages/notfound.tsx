import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Notfound() {
    return (
        <div>
            <AppLayout>
                <Head title='Not Found'/>
                <div className='flex flex-col items-center gap-5'>
                    <h1 className="pt-20 text-2xl lg:text-5xl font-bold text-gray-400">Not Found</h1>
                    <p className="text-sm lg:text-base text-gray-400">The page you are looking for is not available</p>

                    <Link href={route('dashboard')}><Button  className='cursor-pointer'>Home</Button></Link>
                </div>
            </AppLayout>
        </div>
    );
}
