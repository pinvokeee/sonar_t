import { createContext } from "react";

export interface IContext
{
    directoryHandle : FileSystemDirectoryEntry | null;
}

export const initialContext : IContext = 
{
    directoryHandle : null,
};

export const Context = createContext(initialContext);
// export const Store = ({ children }) =>
// {
//     return (
//         <Context.Provider value={[initialContext]}>
//             {children}
//         </Context.Provider>

//     )
// }