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

    const { url } = usePage();
    const isSearchIndexPage = url.startsWith(route('files.search')) || url.startsWith(route('posts.index'));

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
            if (isSearchIndexPage) {
                window.history.replaceState({}, '', route('posts.index'));
            }
        }
    }, [debouncedSearch]);

    return { searchQuery, handleInputChange, posts };
};
