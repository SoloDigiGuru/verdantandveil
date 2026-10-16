"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Brand from "@/components/Brand";
import { createClient } from "@/lib/supabase/client";
import styles from "../admin.module.css";
export default function AdminLoginPage() {
  const router = useRouter(); const [email,setEmail] = useState(""); const [password,setPassword] = useState(""); const [busy,setBusy] = useState(false); const [error,setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setBusy(true); setError(""); try { const supabase = createClient(); const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) throw error; router.replace("/admin/dashboard"); router.refresh(); } catch (e) { setError(e instanceof Error ? e.message : "Unable to sign in. Check your details and try again."); } finally { setBusy(false); } }
  return <main className={styles.loginPage}><div className={styles.loginCard}><Brand/><span className="eyebrow">PRIVATE STUDIO ACCESS</span><h1>Welcome back.</h1><p>Sign in to manage the Verdant &amp; Veil website.</p><form onSubmit={submit} className={styles.loginForm}><label>Email address<input type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button disabled={busy}>{busy?"Signing in…":"Sign in to the studio"}</button>{error&&<p className={styles.error} role="alert">{error}</p>}</form><a href="/" className={styles.backLink}>← Return to the public website</a></div><p className={styles.demoNote}>Demonstration project. Create the administrator account in Supabase as described in the README.</p></main>;
}
