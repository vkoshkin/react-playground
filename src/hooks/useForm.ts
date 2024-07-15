import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

type TUseFormController<T> = {
    values: T;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setValues: Dispatch<SetStateAction<T>>;
};

export function useForm<T>(inputValues: T): TUseFormController<T> {
    const [values, setValues] = useState(inputValues);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}
