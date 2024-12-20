import { useEffect, useRef } from "react";

export const useClickOutSide = (handler: () => void) => {
    const ref = useRef<HTMLElement | any>();
    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handler();
            }
        };

        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [handler]);


    return { ref }


}