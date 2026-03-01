import Image from 'next/image'
import React from 'react'

function LogoComponent({style, imageUrl, outerStyle}) {
  return (
    <div style={outerStyle}>
        <Image  src= {imageUrl} alt='logo' style={style} />
    </div>
  )
}

export default LogoComponent