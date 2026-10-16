import styles from "./Brand.module.css";
export default function Brand({ compact = false }: { compact?: boolean }) {
  return <a className={`${styles.brand} ${compact ? styles.compact : ""}`} href="/" aria-label="Verdant and Veil homepage">
    <span className={styles.mark} aria-hidden="true">v<span>.</span></span>
    <span className={styles.words}><span className={styles.name}>Verdant <i>&amp;</i> Veil</span><span className={styles.sub}>BEAUTY, CONSIDERED</span></span>
  </a>;
}
