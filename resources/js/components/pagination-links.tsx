import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { LinksProps, MetaProps } from '@/types';

export function PaginationLinks({ links, meta }: { links: LinksProps; meta: MetaProps }) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        disabled
                        className={
                            !links.prev
                                ? 'text-muted-foreground hover:bg-white hover:text-muted-foreground dark:hover:bg-gray-600 dark:hover:text-gray-400'
                                : ''
                        }
                        href={links.prev}
                        size="sm"
                    />
                </PaginationItem>
                <PaginationLink size="sm" href={links.first || '#'}>
                    {1}
                </PaginationLink>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationLink size="sm" href={links.last || '#'}>
                    {1}
                </PaginationLink>
                <PaginationItem>
                    <PaginationNext
                        disabled
                        className={!links.next ? 'text-muted-foreground hover:bg-white hover:text-muted-foreground' : ''}
                        href={links.next}
                        size="sm"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
