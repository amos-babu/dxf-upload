import { useEffect, useState } from "react";

export const useHotkeyToggle = (initialState: boolean) => {
    const [open, setOpen] = useState(initialState);

        useEffect(() => {
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

        return [open, setOpen] as const;
}
