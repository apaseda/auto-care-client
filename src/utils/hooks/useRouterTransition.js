import { useState } from "react";

import themeConfig from "../../configs/themeConfig";

export const useRouterTransition = () => {

    const [transition, setTransition] = useState(() => {
        try {
            return themeConfig.layout.routerTransition
        } catch (error) {
            console.log(error);
            return themeConfig.layout.routerTransition;
        }
    });

    const setValue = value => {
        try {
            const valueToStore = value instanceof Function ? value(transition) : value

            setTransition(valueToStore);
        }catch (error) {
            console.log((error))
        }
    }

    return [transition, setValue];
}