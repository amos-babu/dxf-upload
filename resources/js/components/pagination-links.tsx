import { LinksProps } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ links }: { links: LinksProps }) {
    return (
        <div className="mt-10 flex justify-center gap-10">
            {links.prev ? (
                <div className="flex gap-3 hover:text-blue-500">
                    <ChevronLeft className="h-5 w-5 self-center" />
                    <Link href={links.prev}>Previous</Link>
                </div>
            ) : (
                <div className="flex gap-3">
                    <ChevronLeft color="gray" className="h-5 w-5 self-center" />
                    <p className="cursor-pointer text-base text-muted-foreground">Previous</p>
                </div>
            )}

            {links.next ? (
                <div className="flex gap-3 hover:text-blue-500">
                    <Link href={links.next} className="self-center hover:text-blue-500">
                        Next
                    </Link>
                    <ChevronRight className="h-5 w-5 self-center hover:text-blue-500" />
                </div>
            ) : (
                <div className="flex gap-3">
                    <p className="cursor-pointer self-center text-base text-muted-foreground">Next</p>
                    <ChevronRight color="gray" className="h-5 w-5 self-center" />
                </div>
            )}
        </div>
    );
}

export default Pagination;
