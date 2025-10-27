import { useHotkeyToggle } from '@/hooks/use-hotkeytoggel';
import { useSearch } from '@/hooks/use-search';
import { Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './search-cmdk';
import { Button } from './ui/button';
import { Kbd, KbdGroup } from './ui/kbd';

export function CommandMenu() {
    const [open, setOpen] = useHotkeyToggle(false);
    const { searchQuery, handleInputChange, posts } = useSearch();

    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="hidden w-96 cursor-pointer items-center justify-between gap-2 rounded-full border-1 border-primary bg-gray-100 px-2 md:flex dark:bg-neutral-700"
            >
                <p className="m-2 text-base text-primary dark:text-gray-200">Search for files ...</p>
                <KbdGroup>
                    <Kbd className="bg-primary text-white dark:bg-gray-500 dark:text-gray-200">Ctrl</Kbd>
                    <Kbd className="bg-primary text-white dark:bg-gray-500 dark:text-gray-200">K</Kbd>
                </KbdGroup>
            </div>
            <Button onClick={() => setOpen(true)} variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer lg:hidden">
                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput value={searchQuery} onValueChange={handleInputChange} autoFocus placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {posts?.data?.map((file) => (
                            <Link key={file.id} href={route('posts.show', { post: file.id })} className="w-full">
                                <CommandItem className="cursor-pointer" key={file.id}>
                                    <div>
                                        <p className="font-medium">{file.name}</p>
                                        <p className="text-sm text-muted-foreground">{file.description}</p>
                                    </div>
                                </CommandItem>
                            </Link>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
