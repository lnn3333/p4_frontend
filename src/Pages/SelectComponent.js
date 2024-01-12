import React,  { useEffect, useState }  from "react";
import withClickOutside from "./withClickOutside";

const SelectComponent = React.forwardRef( ({
	options,
    placeholder = "",
    onChange,
    selectedKey,
    open,
    setOpen
    
},ref) => {
    const [inputValue, setInputValue] = useState("");
    
    useEffect(()=>{
        if (selectedKey) {
            setInputValue(options.find((o)=>o.key === selectedKey).value)
        }
    }, [selectedKey, options]);
    const onInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const onItemSelected = (option) =>{
        onChange !== undefined && onChange(option.key);
        onChange !== undefined && setInputValue(option.value);
        setOpen(false);
        
    }
    
    const clearDropdown =() => {
        setInputValue("");
        onChange("");
    }
    

    const onInputClick =()=> {
        setOpen((prevValue) => !prevValue);
    }

    return (
    <div className = "menu" ref={ref}>
        <div onClick={onInputClick}>
        <input className = "menu-item"
            type = "text"
            value = {inputValue}
            placeholder = {placeholder}
            onChange = {onInputChange}/>

        {selectedKey || inputValue ? (<div onClick={clearDropdown}></div>) : null}
        </div>

    <div className={`dropdown ${open ? 'visible':""}`} >
    {options.map(opt=>{
    return(
        <ol className="itemsub" >
        <div
         key={opt.key}
        onClick={() =>onItemSelected(opt)} 
        >
        {opt.value}
        </div>
        </ol>
    );
    })}
    </div>
    </div>

    );  
}
)
export default withClickOutside(SelectComponent);

