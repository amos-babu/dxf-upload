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

                {meta.links
                    .filter((link) => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                    .map((link) => (
                        <PaginationLink key={link.label} className={link.active ? 'bg-accent' : ''} size="sm" href={link.url || '#'}>
                            {link.label}
                        </PaginationLink>
                    ))}

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>

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

        /* {meta.links.length > 3 && (
                <div>
                    {meta.links.map((link) => (
                        <Link key={link.label} href={link.url || '#'} className={link.active ? 'active' : ''}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            )} */
    );
}
