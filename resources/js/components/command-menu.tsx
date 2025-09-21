import { Search } from 'lucide-react';
import React from 'react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './search-cmdk';
import { Button } from './ui/button';

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="hidden cursor-pointer items-center justify-center gap-2 rounded-md bg-gray-100 px-2 md:flex dark:bg-neutral-700"
            >
                <p className="m-2 text-sm text-muted-foreground dark:text-gray-200">Search for files ...</p>
                <div className="rounded-sm border border-gray-300 bg-white px-2 dark:border-neutral-500 dark:bg-neutral-500">
                    <p className="text-sm text-muted-foreground dark:text-gray-200">Ctrl</p>
                </div>
                <div className="rounded-sm border border-gray-300 bg-white px-2 dark:border-neutral-500 dark:bg-neutral-500">
                    <p className="text-sm text-muted-foreground dark:text-gray-200">K</p>
                </div>
            </div>
            <Button onClick={() => setOpen(true)} variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer lg:hidden">
                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen} className="w-full">
                <CommandInput autoFocus placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                        <CommandItem>Hello</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
