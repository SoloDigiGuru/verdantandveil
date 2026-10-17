import Brand from "@/components/Brand";
import SiteHeader from "@/components/SiteHeader";
import ServiceCard from "@/components/ServiceCard";
import ContactForm from "@/components/ContactForm";
import FallbackImage from "@/components/FallbackImage";
import { createClient } from "@/lib/supabase/server";
import { demoHours, demoServices } from "@/lib/demo-content";
import { formatTime } from "@/lib/format";
import type { OpeningHour, SalonService } from "@/lib/types";
import styles from "./home.module.css";
export const dynamic = "force-dynamic";

async function getContent() {
  try {
    const supabase = await createClient();
    const [serviceResult, hoursResult] = await Promise.all([
      supabase.from("services").select("*").eq("is_published", true).order("sort_order"),
      supabase.from("opening_hours").select("*").order("sort_order")
    ]);
    return {
      services: serviceResult.error || !serviceResult.data?.length ? demoServices : serviceResult.data as SalonService[],
      hours: hoursResult.error || !hoursResult.data?.length ? demoHours : hoursResult.data as OpeningHour[],
      connected: !serviceResult.error && !hoursResult.error
    };
  } catch { return { services: demoServices, hours: demoHours, connected: false }; }
}

export default async function HomePage() {
  const { services, hours } = await getContent();
  return <><SiteHeader/><main>
    <section className={styles.hero}><div className={styles.heroText}><p className="eyebrow">A beauty studio in Abuja</p><h1>Beauty, <em>considered.</em></h1><p className={styles.intro}>A quieter kind of beauty ritual. Thoughtful treatments, considered details and a little room to return to yourself.</p><a href="#rituals" className={styles.heroCta}>Discover our rituals <span>↘</span></a><div className={styles.heroFoot}><span>01 / THE STUDIO</span><span>CARE, WITH INTENTION</span></div></div><div className={styles.heroImage}><FallbackImage src="/images/hero-salon.jpg" fallback="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=88" alt="Warm, serene beauty salon interior" loading="eager"/><div className={styles.imageNote}><span>THE VERDANT &amp; VEIL APPROACH</span><strong>Less, but<br/>more meaningful.</strong></div><span className={styles.imageIndex}>EST. FOR YOUR RITUAL</span></div><div className={styles.heroVertical}>VERDANT &amp; VEIL · BEAUTY, CONSIDERED</div></section>
    <section className={styles.introBand} id="studio"><div className={styles.introMark}>v.</div><p>Beauty should feel like <em>coming back to yourself.</em> We bring thoughtful care, a calm space and a personal touch to every appointment.</p><span className="eyebrow">A NOTE FROM THE STUDIO</span></section>
    <section className={styles.rituals} id="rituals"><div className="section-shell"><div className="section-heading"><div><span className="eyebrow">THE TREATMENT MENU</span><h2>Small rituals.<br/><em>Lasting feeling.</em></h2></div><p>Considered treatments, tailored to you. Every detail is intentional, every visit is your own.</p></div><div className={styles.serviceGrid}>{services.map((service,index)=><ServiceCard key={service.id} service={service} index={index}/>)}</div><p className={styles.menuNote}>All prices are shown in Nigerian naira. Please enquire if you would like guidance on the right treatment for you.</p></div></section>
    <section className={styles.quoteSection}><div className={styles.quoteImage}><FallbackImage src="/images/studio-detail.jpg" fallback="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=85" alt="A calm beauty and self-care moment" loading="lazy"/></div><div className={styles.quoteText}><span className="eyebrow">A LITTLE SPACE FOR YOU</span><p className="serif">“The most beautiful rituals are the ones that make you feel <em>more like yourself.</em>”</p><span className={styles.quoteRule}></span><span className={styles.quoteCaption}>THE VERDANT &amp; VEIL PHILOSOPHY</span></div></section>
    <section className={styles.visit} id="visit"><div className="section-shell visitGrid"><div><span className="eyebrow">MAKE A LITTLE TIME</span><h2 className="serif">Come as you are.<br/><em>Leave restored.</em></h2><p className={styles.visitText}>Whether you know exactly what you need or would like a little guidance, we'd love to hear from you.</p><div className={styles.hours}><h3>STUDIO HOURS</h3>{hours.map(hour=><div className={styles.hourRow} key={hour.id}><span>{hour.day_label}</span><span>{hour.is_closed ? "Closed" : `${formatTime(hour.open_time)} – ${formatTime(hour.close_time)}`}</span></div>)}</div><div className={styles.contactMeta}><span>ABUJA, NIGERIA</span><a href="mailto:hello@verdantandveil.example">hello@verdantandveil.example</a></div></div><div className={styles.contactPanel} id="contact"><span className="eyebrow">GET IN TOUCH</span><h3>Let's begin with a note.</h3><p>Send us an enquiry and our studio team will get back to you.</p><ContactForm/></div></div></section>
  </main><footer className={styles.footer}><div className="section-shell"><Brand compact/><span>DEMO WEBSITE · CREATED FOR A DIGIFYGURU EDUCATIONAL PROJECT</span><a href="/admin/login">Studio admin ↗</a></div></footer></>;
}
