import { useState } from 'react'
import style from "../styles/errors.module.css"

function Errors({errors}) {
  return(
    <ul className={style.error}><b>Inputs errors :</b>
      {errors.map(err => {
        return(<li key={errors.indexOf(err)} >{err.msg}</li>)
      })}
    </ul>
  )
}

export default Errors