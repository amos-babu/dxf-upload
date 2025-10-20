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
import { Link } from '@inertiajs/react';

export function PaginationLinks({ links, meta }: { links: LinksProps; meta: MetaProps }) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {links.prev ? (
                        <Link href={links.prev}>
                            <PaginationPrevious size="sm" />
                        </Link>
                    ) : (
                        <PaginationPrevious className="text-gray-400 hover:bg-primary hover:text-primary-foreground" size="sm" />
                    )}
                </PaginationItem>

                {meta.links
                    ?.filter((link) => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                    .map((link, index) => {
                        const isEllipsis = link.label.includes('...');
                        return (
                            <PaginationItem key={index}>
                                {isEllipsis ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink size="sm" href={link.url || '#'} isActive={link.active}>
                                        {link.label}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        );
                    })}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext size="sm" href={links.next} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
