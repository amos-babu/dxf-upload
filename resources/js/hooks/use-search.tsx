import { SearchFileProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

export const useSearch = (initialQuery = '') => {
    const { posts } = usePage<SearchFileProps>().props;
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    const handleInputChange = (value: string) => {
        setSearchQuery(value);
    };

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            router.get(
                route('files.search'),
                { q: searchQuery },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }
    }, [searchQuery]);

    return { searchQuery, handleInputChange, posts };
};
