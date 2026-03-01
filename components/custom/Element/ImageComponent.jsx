import Image from 'next/image'
import React from 'react'

function ImageComponent({style, imageUrl, outerStyle}) {
  return (
    <div style={outerStyle}>
        <Image src={imageUrl} alt='image' style={style} />
    </div>
  )
}

export default ImageComponent