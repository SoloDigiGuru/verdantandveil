import Brand from "@/components/Brand";
import styles from "./SiteHeader.module.css";
export default function SiteHeader() {
  return <header className={styles.header}><div className={styles.inner}><Brand/><nav className={styles.nav} aria-label="Main navigation"><a href="#rituals">Our rituals</a><a href="#studio">The studio</a><a href="#visit">Visit us</a></nav><a className={styles.book} href="#contact">Enquire <span aria-hidden="true">↗</span></a></div></header>;
}
