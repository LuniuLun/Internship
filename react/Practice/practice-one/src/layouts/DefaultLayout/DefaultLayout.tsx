import Header from '../components/Header'
import styles from './DefaultLayout.module.css'

interface DefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Header />
        {children}
      </div>
    </div>
  )
}

export default DefaultLayout
