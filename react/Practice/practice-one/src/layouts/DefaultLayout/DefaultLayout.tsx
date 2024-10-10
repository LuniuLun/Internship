import Header from '../components/Header/Header'
import styles from './DefaultLayout.module.css'

interface DefaultLayoutProps {
  children: React.ReactNode
}

function DefaultLayout({ children }: Readonly<DefaultLayoutProps>) {
  return (
    <div className={styles.wrapper}>
      <Header />
      {children}
    </div>
  )
}

export default DefaultLayout
