import { useState } from "react";

export default function DoughCounter(){
    const [count, setCount] = useState(0)

    function increase(){
        setCount(count+1);
    }

    return(
        <>
            <div className="dough-counter">{count}</div>
            <button onClick={increase}></button>
        </>
    );
}
