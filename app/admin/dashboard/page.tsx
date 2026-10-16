import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Dashboard from "./Dashboard";
import styles from "../admin.module.css";
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  try {
    const { data: adminRow, error: adminError } = await supabase
      .from("site_admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError) {
      console.error("Admin allow-list lookup failed", adminError);
      redirect("/admin/login");
    }

    if (!adminRow) {
      redirect("/admin/login");
    }
  } catch (error) {
    console.error("Admin allow-list check crashed", error);
    redirect("/admin/login");
  }

  const [{ data: services }, { data: hours }, { data: enquiries }] = await Promise.all([
    supabase.from("services").select("*").order("sort_order"),
    supabase.from("opening_hours").select("*").order("sort_order"),
    supabase.from("contact_enquiries").select("id,name,email,topic,message,created_at,status").order("created_at", { ascending: false }).limit(30)
  ]);

  return <main className={styles.dashboardPage}><Dashboard initialServices={services||[]} initialHours={hours||[]} initialEnquiries={enquiries||[]} email={user.email||"Administrator"}/></main>;
}
