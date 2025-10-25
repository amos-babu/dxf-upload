import { SearchFileProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useDebouncedSearch } from './use-debounce';

export const useSearch = (initialQuery = '') => {
    const { posts } = usePage<SearchFileProps>().props ?? {};
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const debouncedSearch = useDebouncedSearch(searchQuery);

    const handleInputChange = (value: string) => {
        setSearchQuery(value);
    };

    useEffect(() => {
        if (debouncedSearch.trim() !== '') {
            router.get(
                route('files.search'),
                { q: debouncedSearch },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        } else {
            router.get(
                route('posts.index'),
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }
    }, [debouncedSearch]);

    return { searchQuery, handleInputChange, posts };
};
