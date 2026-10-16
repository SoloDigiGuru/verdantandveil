import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const topic = typeof body.topic === "string" ? body.topic.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (name.length < 2 || name.length > 100) return NextResponse.json({ error: "Please enter a name between 2 and 100 characters." }, { status: 400 });
    if (!emailPattern.test(email) || email.length > 200) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (message.length < 10 || message.length > 2000) return NextResponse.json({ error: "Please enter a message between 10 and 2,000 characters." }, { status: 400 });
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return NextResponse.json({ error: "The contact service is not configured yet. Please follow the setup guide." }, { status: 503 });
    const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { error } = await supabase.from("contact_enquiries").insert({ name, email, topic: topic.slice(0, 100) || "General enquiry", message, status: "new" });
    if (error) { console.error("Contact enquiry insert failed:", error.message); return NextResponse.json({ error: "We couldn't save your enquiry. Please try again shortly." }, { status: 500 }); }

    let emailSent = false;
    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const recipient = process.env.SALON_NOTIFICATION_EMAIL;
    if (resendKey && from && recipient) {
      try {
        const mailResponse = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [recipient], reply_to: email, subject: `New Verdant & Veil enquiry: ${topic || "General enquiry"}`, text: `A new enquiry was submitted on the Verdant & Veil demo website.\n\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}` }) });
        emailSent = mailResponse.ok;
        if (!mailResponse.ok) console.error("Email notification could not be sent. The enquiry remains saved.");
      } catch { console.error("Email notification request failed. The enquiry remains saved."); }
    }
    return NextResponse.json({ ok: true, emailSent, message: emailSent ? "Thank you. Your enquiry has been received." : "Thank you. Your enquiry has been saved. The studio can review it in the admin inbox." });
  } catch { return NextResponse.json({ error: "We couldn't process that request. Please try again." }, { status: 400 }); }
}
