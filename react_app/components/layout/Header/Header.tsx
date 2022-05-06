import { memo } from 'react'
import styles from './Header.module.css'


export const Header = memo(() => {
  return (
    <>
      <header className="site-header" role="banner">
        <div className="wrapper">
          <h1 className="site-title"><span className="title-Auto">Auto</span> Scheduler</h1>
          <p className="credit-line">byハッカソン部</p>
        </div>
      </header>


      <style jsx>{`
      .wrapper{
        background-color: rgb(61, 184, 211);
      }
      .site-title[

      ]
      `}</style>
    </>

  )
})
