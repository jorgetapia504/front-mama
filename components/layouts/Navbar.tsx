import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <div className='w-full p-2 border-b flex justify-between'>
      <Link href='/'>
        <img className='w-64' src='https://res.cloudinary.com/deudntwvw/image/upload/v1687377581/Carmen%20Orellana/icon_qahqm4.png' />
      </Link>
      <ul className='flex gap-4 my-auto'>
        <li><Link href='/'>Inicio</Link></li>
        <li><Link href='/banco-santander'>Banco Santander</Link></li>
      </ul>
    </div>
  )
}
