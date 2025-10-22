import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './search-cmdk';
import { Button } from './ui/button';
import { Kbd, KbdGroup } from './ui/kbd';

export function CommandMenu() {
    const [open, setOpen] = useState(false);

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
                className="hidden w-96 cursor-pointer items-center justify-between gap-2 rounded-full border-1 border-primary bg-gray-100 px-2 md:flex dark:bg-neutral-700"
            >
                <p className="m-2 text-base text-primary dark:text-gray-200">Search for files ...</p>
                <KbdGroup>
                    <Kbd className="bg-primary text-white">Ctrl</Kbd>
                    <Kbd className="bg-primary text-white">K</Kbd>
                </KbdGroup>
            </div>
            <Button onClick={() => setOpen(true)} variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer lg:hidden">
                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
            </Button>
            <CommandDialog  open={open} onOpenChange={setOpen}>
                <CommandInput autoFocus placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                        <CommandItem>time</CommandItem>
                        <CommandItem>Hello</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
