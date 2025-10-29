import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PageProps, router } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Icon } from './icon';

interface Props extends PageProps {
    categories: {
        label: string;
        value: string;
    }[];
}

export function CategoriesSelector() {
    const { categories } = usePage<Props>().props ?? {};
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedCategory) return;

        router.get(
            route('posts.index'),
            { category: selectedCategory },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }, [selectedCategory]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer rounded-lg px-2 py-1 hover:bg-accent">
                <div className="flex items-center justify-center gap-1">
                    <h4 className="font-semibold">Categories</h4>
                    <Icon iconNode={ChevronDown} className="h-5 w-5" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Categories</DropdownMenuLabel>
                <DropdownMenuGroup>
                    {categories.map((category) => (
                        <DropdownMenuItem
                            onSelect={() => setSelectedCategory(category.value)}
                            className={`cursor-pointer ${selectedCategory === category.value ? 'bg-accent' : ''}`}
                            key={category.value}
                        >
                            {category.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
