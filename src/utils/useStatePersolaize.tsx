import { useState } from "react";

export function useFormState<T extends object>(initialState: T | null){
    const[state, setState] = useState<T | null>(initialState);

    function updateField<K extends keyof T>(field: K, value: T[K]){
        setState((prev)=>
            prev ? {...prev,[field]: value} : {...({} as T), [field]: value}
        );
    }

    return{state, updateField, setState};
}