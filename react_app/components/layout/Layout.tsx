import { ReactElement } from 'react'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'


type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)
