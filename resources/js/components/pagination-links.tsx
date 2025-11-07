import { LinksProps, MetaProps } from '@/types';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination';

export function PaginationLinks({ links, meta }: { links: LinksProps; meta: MetaProps }) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {!links.prev || links.prev === '' ? (
                        <PaginationPrevious
                            className="cursor-not-allowed text-muted-foreground hover:bg-white hover:text-muted-foreground dark:hover:bg-gray-600 dark:hover:text-gray-400"
                            preserveScroll
                            href="#"
                            size="sm"
                            onClick={(e) => e.preventDefault()}
                        />
                    ) : (
                        <PaginationPrevious preserveScroll href={links.prev} size="sm" />
                    )}
                </PaginationItem>

                {meta.links
                    .filter((link) => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                    .map((link) => (
                        <PaginationLink
                            key={link.label}
                            preserveScroll
                            className={link.active ? 'border-2 border-primary' : ''}
                            size="sm"
                            href={link.url || '#'}
                        >
                            {link.label}
                        </PaginationLink>
                    ))}

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                    {!links.next ? (
                        <PaginationNext
                            className="cursor-not-allowed text-muted-foreground hover:bg-white hover:text-muted-foreground dark:hover:bg-gray-600 dark:hover:text-gray-400"
                            preserveScroll
                            href="#"
                            size="sm"
                            onClick={(e) => e.preventDefault()}
                        />
                    ) : (
                        <PaginationNext preserveScroll href={links.next} size="sm" />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
