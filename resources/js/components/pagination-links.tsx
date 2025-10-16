import { LinksProps } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ links }: { links: LinksProps }) {
    return (
        <div className="flex justify-center gap-6">
            {links.prev ? (
                <Link href={links.prev} className="flex cursor-pointer gap-3 hover:text-primary">
                    <ChevronLeft className="h-5 w-5 self-center" />
                    <span>Previous</span>
                </Link>
            ) : (
                <div className="flex gap-3 text-muted-foreground">
                    <ChevronLeft color="gray" className="h-5 w-5 self-center" />
                    <span>Previous</span>
                </div>
            )}

            {links.next ? (
                <Link href={links.next} className="flex cursor-pointer gap-3 hover:text-primary">
                    <span className="self-center hover:text-primary">Next</span>
                    <ChevronRight className="h-5 w-5 self-center hover:text-primary" />
                </Link>
            ) : (
                <div className="flex gap-3 text-base text-muted-foreground">
                    <span>Next</span>
                    <ChevronRight color="gray" className="h-5 w-5 self-center" />
                </div>
            )}
        </div>
    );
}

export default Pagination;
