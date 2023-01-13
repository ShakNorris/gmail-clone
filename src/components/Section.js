import React from 'react'
import './Section.css'

function Section({Icon, title, selected}) {
  return <div className={`section ${selected && 'section-selected'}`}>
    <Icon/>
    <h4>{title}</h4>
  </div>
}

export default Section