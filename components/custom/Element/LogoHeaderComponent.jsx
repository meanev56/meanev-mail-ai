import Image from 'next/image'
import React from 'react'

function LogoHeaderComponent({style, imageUrl, outerStyle}) {
  return (
    <div style={outerStyle}>
        <Image src={imageUrl} style={style} alt='logo header' />
    </div>
  )
}

export default LogoHeaderComponent