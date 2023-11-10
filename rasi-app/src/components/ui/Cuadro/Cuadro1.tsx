import React from "react";

export default function Cuadro1(props: any) {
    return (
        <div className="shadow-2xl" style={{
            backgroundColor: '#95a1a1',
            borderRadius: '25px',
            border:"0.5px solid white"
            }}>
            <div className="flex flex-row">

                <div className="self start text-xl underline box-border h-7 w-60 font-bold">{props.title}</div>
                <p className="text-xl align-baseline  "> {props.content}</p>

            </div>
        </div>
    )
}
