import { router } from '@inertiajs/react';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

export const useSearch = (initialQuery = '') => {
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    const debouncedSearch = useMemo(
        () =>
            debounce((query: string) => {
                if (query.trim() === '') return;
                router.get(
                    route('search'),
                    { q: query },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                    },
                );
            }, 400), //debounce time in ms
        [], //Ensure debounce function is created only once
    );

    // Clean up debounce on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleInputChange = (value: string) => {
        setSearchQuery(value);
        if (value.trim() === '') debouncedSearch(value);
    };

    return { searchQuery, handleInputChange };
};
