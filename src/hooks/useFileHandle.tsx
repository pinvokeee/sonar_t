import { useState } from "react";

const useFileSystemHandle = () =>
{
    const [directoryHandle, setHandle] = useState(null);

    const openSelectDirectoryWindow = async () =>
    {
        setHandle(await showSelectDirectoryPicker());
    }
};

export default useFileSystemHandle;