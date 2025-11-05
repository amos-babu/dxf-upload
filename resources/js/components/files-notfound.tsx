import { FileX2 } from 'lucide-react';

const FilesNotFound = ({ message }: { message: string }) => {
    return (
        <div className="flex h-64 flex-col items-center justify-center">
            <FileX2 className="m-3 h-24 w-24 text-muted-foreground" />
            <p className="text-xl font-bold">Nothing here... Yet</p>
            <p className="m-3 text-base text-muted-foreground">{message}</p>
        </div>
    );
};

export default FilesNotFound;
