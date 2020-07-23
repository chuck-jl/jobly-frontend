import {useState, useEffect} from "react";

const useLocalStorage = (key, defaultValue = null) =>{
    const initVal = localStorage.getItem(key) || defaultValue;
    const [item, setItem] = useState(initVal);

    useEffect(()=>{
        if(!item){
            localStorage.removeItem(key);
        }else{
            localStorage.setItem(key, item);
        }
    },[key, item])

    return [item, setItem];
}

export default useLocalStorage;