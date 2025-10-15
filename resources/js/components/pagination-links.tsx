import { LinksProps } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ links }: { links: LinksProps }) {
    return (
        <div className="flex justify-center gap-6">
            {links.prev ? (
                <div className="flex cursor-pointer gap-3 hover:text-primary">
                    <ChevronLeft className="h-5 w-5 self-center" />
                    <Link href={links.prev}>Previous</Link>
                </div>
            ) : (
                <div className="flex gap-3">
                    <ChevronLeft color="gray" className="h-5 w-5 self-center" />
                    <p className="text-base text-muted-foreground">Previous</p>
                </div>
            )}

            {links.next ? (
                <div className="flex cursor-pointer gap-3 hover:text-primary">
                    <Link href={links.next} className="self-center hover:text-primary">
                        Next
                    </Link>
                    <ChevronRight className="h-5 w-5 self-center hover:text-primary" />
                </div>
            ) : (
                <div className="flex gap-3">
                    <p className="self-center text-base text-muted-foreground">Next</p>
                    <ChevronRight color="gray" className="h-5 w-5 self-center" />
                </div>
            )}
        </div>
    );
}

export default Pagination;
