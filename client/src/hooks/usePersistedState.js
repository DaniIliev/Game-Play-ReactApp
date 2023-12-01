import { useState } from "react";


export default function usePersistedState(key, defaultValue){
    const [state, setState] = useState(() => {
        const persistedState = localStorage.getItem(key)
        if(persistedState){

            return JSON.parse(persistedState)
        }

        return defaultValue
    })

    const setPersistedState = (value) => {
        setState(value)

        localStorage.setItem(key, JSON.stringify(value))
    }
    return [state, setPersistedState]
}