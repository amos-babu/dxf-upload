import { useEffect, useState } from 'react';

export default function useTimeout({ errors }: { errors: any }) {
    const [message, setMessage] = useState(errors.favorite || null);
    useEffect(() => {
        if (errors.favorite) {
            setMessage(errors.favorite);
            const timer = setTimeout(() => {
                setMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors.favorite]);

    return { message };
}
