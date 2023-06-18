import React, { PropsWithChildren } from 'react'
import { Navbar } from './Navbar'

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      { children }
    </>
  )
}
