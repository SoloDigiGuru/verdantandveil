"use client";
import { useState } from "react";
import styles from "./ContactForm.module.css";
export default function ContactForm() {
  const [status,setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [message,setMessage] = useState("");
  async function submit(formData: FormData) {
    setStatus("sending"); setMessage("");
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Your message could not be sent. Please try again.");
      setStatus("success"); setMessage(data.message || "Thank you. Your enquiry has been received.");
      (document.getElementById("vv-contact-form") as HTMLFormElement | null)?.reset();
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again."); }
  }
  return <form id="vv-contact-form" className={styles.form} action={submit}>
    <div className={styles.row}><label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Full name"/></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@example.com"/></label></div>
    <label>What would you like to enquire about?<select name="topic" defaultValue="A treatment"><option>A treatment</option><option>Opening hours</option><option>Salon information</option><option>Something else</option></select></label>
    <label>Your message<textarea name="message" rows={4} required minLength={10} maxLength={2000} placeholder="Tell us a little about what you have in mind…"/></label>
    <button className={styles.submit} type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send enquiry"}<span aria-hidden="true">↗</span></button>
    {message && <p className={`${styles.feedback} ${status === "error" ? styles.error : ""}`} role="status">{message}</p>}
    <p className={styles.privacy}>Your details are used only to respond to your enquiry.</p>
  </form>;
}
