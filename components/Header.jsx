import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import SignInButton from './SignInButton'

function Header () {
  return (
    <div className='flex items-center justify-between p-4 shadow-sm px-10'>
      <Image 
        src={"/logo.svg"}
        alt='logo'
        width={70}
        height={50}
        className='rounded-xl'
      />
      <div>
        <div className='flex gap-3 items-center '>
          <Link href={"/dashboard"}>
            <Button>
              Dashboard
            </Button>
          </Link>

          <Image 
            src={"/profile.png"}
            alt='profile'
            width={35}
            height={35}
            className='rounded-full'
          />
        </div>
        <SignInButton />
      </div>
    </div>
  )
}

export default Header