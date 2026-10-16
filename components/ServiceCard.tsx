import type { SalonService } from "@/lib/types";
import FallbackImage from "@/components/FallbackImage";
import { formatNaira } from "@/lib/format";
import styles from "./ServiceCard.module.css";
const images: Record<string,{local:string;fallback:string}> = {
  facial: { local: "/images/signature-facial.jpg", fallback: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85" },
  "silk-press": { local: "/images/silk-press.jpg", fallback: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85" },
  manicure: { local: "/images/veil-manicure.jpg", fallback: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85" },
  brows: { local: "/images/brow-shape.jpg", fallback: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=85" }
};
export default function ServiceCard({ service, index }: { service: SalonService; index: number }) {
  return <article className={styles.card}><div className={styles.photoWrap}><FallbackImage className={styles.photo} src={(images[service.image_key] || images.facial).local} fallback={(images[service.image_key] || images.facial).fallback} alt={`${service.name} at Verdant & Veil`} loading="lazy"/><span className={styles.number}>0{index + 1}</span></div><div className={styles.details}><div><h3>{service.name}</h3><p>{service.description}</p></div><div className={styles.meta}><span>{service.duration_minutes} MIN</span><strong>{formatNaira(service.price)}</strong></div></div></article>;
}
