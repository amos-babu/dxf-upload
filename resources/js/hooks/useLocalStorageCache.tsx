// import { useEffect, useState } from 'react';

// function useLocalStorageCache() {
//     const [items, setItems] = useState(files.data);
//     useEffect(() => {
//         const cached = localStorage.getItem('files');
//         if (cached) {
//             setItems(JSON.parse(cached));
//         } else {
//             setItems((prev) => [...prev, ...files.data]);
//         }
//     }, [files.data]);

//     useEffect(() => {
//         localStorage.setItem('files', JSON.stringify(items));
//     }, [items]);
//     return <div></div>;
// }

// export default useLocalStorageCache;
