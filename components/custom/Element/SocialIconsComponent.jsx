import Image from 'next/image'
import React from 'react'

export default function SocialIconsComponent({options, style , outerStyle}) {
  return (
    <div style={outerStyle}>
        {options?.map((option, index)=> (
            <Image  alt='' style={style} key={index} src={option?.icon} />
        ))}
    </div>
  )
}
