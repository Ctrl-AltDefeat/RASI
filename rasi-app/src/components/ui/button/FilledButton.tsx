import React from "react";

export default function FilledButton(props:any) {
  return (

      <div className="col">
          <button className={`btn btn-${props.className}`}> {props.title}</button>
      </div>

  )

}