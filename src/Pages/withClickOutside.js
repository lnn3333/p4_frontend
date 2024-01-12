import React, { useState, useEffect, useRef } from "react";

export default function withClickOutside(WrappedComponent) {
  const Component = (props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      // Cleanup the event listener when the component is unmounted
    //   return () => {
    //     document.removeEventListener("mousedown", handleClickOutside);
    //   };
    }, [ref]);

    return <WrappedComponent open={open} setOpen={setOpen} ref={ref} {...props} />;
  };

  return Component;
}
