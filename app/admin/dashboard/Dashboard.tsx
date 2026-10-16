"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatNaira } from "@/lib/format";
import type { OpeningHour, SalonService } from "@/lib/types";
import styles from "../admin.module.css";
type Enquiry = {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  created_at: string;
  status: string;
};

function describeSupabaseError(input: unknown): string {
  if (input instanceof Error) return input.message;

  if (typeof input === "object" && input !== null) {
    const error = input as Record<string, unknown>;
    const parts = [
      typeof error.message === "string" ? error.message : "",
      typeof error.code === "string" ? `Code: ${error.code}` : "",
      typeof error.details === "string" ? `Details: ${error.details}` : "",
      typeof error.hint === "string" ? `Hint: ${error.hint}` : "",
      typeof error.status === "number" ? `HTTP status: ${error.status}` : "",
    ].filter(Boolean);

    if (parts.length > 0) return parts.join(" | ");
  }

  return "Could not save the service.";
}

export default function Dashboard({
  initialServices,
  initialHours,
  initialEnquiries,
  email,
}: {
  initialServices: SalonService[];
  initialHours: OpeningHour[];
  initialEnquiries: Enquiry[];
  email: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"services" | "hours" | "enquiries">(
    "services",
  );
  const [services, setServices] = useState(initialServices);
  const [hours, setHours] = useState(initialHours);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<SalonService | null>(null);
  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }
  function newService() {
    setEditing({
      id: "",
      name: "",
      description: "",
      price: 0,
      duration_minutes: 60,
      image_key: "facial",
      sort_order: services.length + 1,
      is_published: true,
    });
    setError("");
    setNotice("");
  }
  async function saveService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const supabase = createClient();
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!session?.user?.id)
        throw new Error("No active Supabase session. Please sign in again.");
      const { data: adminRow, error: adminLookupError } = await supabase
        .from("site_admins")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (adminLookupError) throw adminLookupError;
      if (!adminRow)
        throw new Error("This account is not on the admin allow-list.");
      const payload = {
        name: editing.name.trim(),
        description: editing.description.trim(),
        price: Number(editing.price),
        duration_minutes: Number(editing.duration_minutes),
        image_key: editing.image_key,
        sort_order: Number(editing.sort_order),
        is_published: editing.is_published,
      };
      if (!payload.name || !payload.description || payload.price < 0)
        throw new Error("Enter a service name, description and valid price.");
      const result = editing.id
        ? await supabase
            .from("services")
            .update(payload)
            .eq("id", editing.id)
            .select()
            .single()
        : await supabase.from("services").insert(payload).select().single();
      if (result.error) {
        const postgrestError = result.error as typeof result.error & {
          status?: number;
        };
        console.error("Supabase service save failed", {
          code: postgrestError.code,
          message: postgrestError.message,
          details: postgrestError.details,
          hint: postgrestError.hint,
          status: postgrestError.status,
        });
        throw result.error;
      }
      setServices((old) =>
        editing.id
          ? old.map((s) =>
              s.id === editing.id ? (result.data as SalonService) : s,
            )
          : [...old, result.data as SalonService].sort(
              (a, b) => a.sort_order - b.sort_order,
            ),
      );
      setEditing(null);
      setNotice(
        "Service saved. Refresh the public website to verify the change.",
      );
    } catch (e) {
      setError(describeSupabaseError(e));
    } finally {
      setBusy(false);
    }
  }
  async function deleteService(id: string) {
    if (!window.confirm("Delete this service? This cannot be undone.")) return;
    setError("");
    setNotice("");
    const supabase = createClient();
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      setError(describeSupabaseError(error));
      return;
    }
    setServices((old) => old.filter((s) => s.id !== id));
    setNotice("Service deleted.");
  }
  async function saveHours(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const supabase = createClient();
      for (const hour of hours) {
        const { error } = await supabase
          .from("opening_hours")
          .update({
            open_time: hour.is_closed ? null : hour.open_time,
            close_time: hour.is_closed ? null : hour.close_time,
            is_closed: hour.is_closed,
          })
          .eq("id", hour.id);
        if (error) throw error;
      }
      setNotice("Opening hours saved.");
    } catch (e) {
      setError(describeSupabaseError(e));
    } finally {
      setBusy(false);
    }
  }
  async function updateEnquiry(id: string, status: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from("contact_enquiries")
      .update({ status })
      .eq("id", id);
    if (error) {
      setError(describeSupabaseError(error));
      return;
    }
    router.refresh();
    setNotice("Enquiry status updated.");
  }
  return (
    <>
      <header className={styles.dashHeader}>
        <div>
          <a href="/" className={styles.dashBrand}>
            v. <span>Verdant &amp; Veil</span>
          </a>
          <p>STUDIO CONTENT MANAGEMENT</p>
        </div>
        <div className={styles.account}>
          <span>{email}</span>
          <button onClick={signOut}>Sign out</button>
        </div>
      </header>
      <div className={styles.dashWrap}>
        <aside className={styles.sidebar}>
          <span className={styles.sideLabel}>WORKSPACE</span>
          <button
            className={tab === "services" ? styles.activeTab : ""}
            onClick={() => {
              setTab("services");
              setEditing(null);
            }}
          >
            ◫ &nbsp; Services
          </button>
          <button
            className={tab === "hours" ? styles.activeTab : ""}
            onClick={() => {
              setTab("hours");
              setEditing(null);
            }}
          >
            ◷ &nbsp; Opening hours
          </button>
          <button
            className={tab === "enquiries" ? styles.activeTab : ""}
            onClick={() => {
              setTab("enquiries");
              setEditing(null);
            }}
          >
            ✉ &nbsp; Enquiries{" "}
            <span className={styles.count}>{initialEnquiries.length}</span>
          </button>
          <a href="/" target="_blank" rel="noreferrer">
            ↗ &nbsp; View public site
          </a>
          <div className={styles.sidebarFoot}>
            VERDANT &amp; VEIL
            <br />
            CONTENT STUDIO · 01
          </div>
        </aside>
        <section className={styles.dashMain}>
          <div className={styles.dashIntro}>
            <div>
              <span className="eyebrow">GOOD TO SEE YOU</span>
              <h1>
                {tab === "services"
                  ? "Your services."
                  : tab === "hours"
                    ? "Studio hours."
                    : "Client enquiries."}
              </h1>
              <p>
                {tab === "services"
                  ? "Keep your service menu accurate and up to date."
                  : tab === "hours"
                    ? "Let visitors know when the studio is open."
                    : "Review and manage messages sent from the public website."}
              </p>
            </div>
            {tab === "services" && !editing && (
              <button className={styles.primary} onClick={newService}>
                + Add service
              </button>
            )}
          </div>
          {notice && (
            <p className={styles.notice} role="status">
              {notice}
            </p>
          )}
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          {tab === "services" &&
            (editing ? (
              <form className={styles.editor} onSubmit={saveService}>
                <div className={styles.editorTop}>
                  <h2>{editing.id ? "Edit service" : "Add a service"}</h2>
                  <button
                    type="button"
                    className={styles.textButton}
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </button>
                </div>
                <label>
                  Service name
                  <input
                    value={editing.name}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  Description
                  <textarea
                    value={editing.description}
                    onChange={(e) =>
                      setEditing({ ...editing, description: e.target.value })
                    }
                    required
                    maxLength={500}
                    rows={3}
                  />
                </label>
                <div className={styles.editorGrid}>
                  <label>
                    Price in naira
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={editing.price}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          price: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </label>
                  <label>
                    Duration in minutes
                    <input
                      type="number"
                      min="5"
                      max="600"
                      step="5"
                      value={editing.duration_minutes}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          duration_minutes: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </label>
                  <label>
                    Image category
                    <select
                      value={editing.image_key}
                      onChange={(e) =>
                        setEditing({ ...editing, image_key: e.target.value })
                      }
                    >
                      <option value="facial">Facial</option>
                      <option value="silk-press">Hair</option>
                      <option value="manicure">Nails</option>
                      <option value="brows">Brows</option>
                    </select>
                  </label>
                  <label>
                    Display order
                    <input
                      type="number"
                      min="1"
                      value={editing.sort_order}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          sort_order: Number(e.target.value),
                        })
                      }
                    />
                  </label>
                </div>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={editing.is_published}
                    onChange={(e) =>
                      setEditing({ ...editing, is_published: e.target.checked })
                    }
                  />{" "}
                  Show this service on the public website
                </label>
                <button className={styles.primary} disabled={busy}>
                  {busy ? "Saving…" : "Save service"}
                </button>
              </form>
            ) : (
              <div className={styles.serviceList}>
                {services.map((service) => (
                  <article className={styles.serviceRow} key={service.id}>
                    <div className={styles.serviceGlyph}>
                      {service.image_key === "manicure"
                        ? "✳"
                        : service.image_key === "brows"
                          ? "◌"
                          : "✧"}
                    </div>
                    <div className={styles.serviceName}>
                      <h3>{service.name}</h3>
                      <p>
                        {service.duration_minutes} minutes ·{" "}
                        {service.is_published
                          ? "Published"
                          : "Hidden from public"}
                      </p>
                    </div>
                    <strong>{formatNaira(service.price)}</strong>
                    <div className={styles.rowActions}>
                      <button onClick={() => setEditing(service)}>Edit</button>
                      <button
                        onClick={() => deleteService(service.id)}
                        aria-label={`Delete ${service.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
                {services.length === 0 && (
                  <div className={styles.empty}>
                    No services yet. Select “Add service” to create the first
                    one.
                  </div>
                )}
              </div>
            ))}
          {tab === "hours" && (
            <form className={styles.hoursEditor} onSubmit={saveHours}>
              {hours.map((hour, index) => (
                <div className={styles.hourEditRow} key={hour.id}>
                  <strong>{hour.day_label}</strong>
                  <label className={styles.timeField}>
                    Opens
                    <input
                      type="time"
                      value={hour.open_time || "09:00"}
                      disabled={hour.is_closed}
                      onChange={(e) =>
                        setHours((old) =>
                          old.map((h, i) =>
                            i === index
                              ? { ...h, open_time: e.target.value }
                              : h,
                          ),
                        )
                      }
                    />
                  </label>
                  <label className={styles.timeField}>
                    Closes
                    <input
                      type="time"
                      value={hour.close_time || "18:00"}
                      disabled={hour.is_closed}
                      onChange={(e) =>
                        setHours((old) =>
                          old.map((h, i) =>
                            i === index
                              ? { ...h, close_time: e.target.value }
                              : h,
                          ),
                        )
                      }
                    />
                  </label>
                  <label className={styles.closedToggle}>
                    <input
                      type="checkbox"
                      checked={hour.is_closed}
                      onChange={(e) =>
                        setHours((old) =>
                          old.map((h, i) =>
                            i === index
                              ? { ...h, is_closed: e.target.checked }
                              : h,
                          ),
                        )
                      }
                    />{" "}
                    Closed
                  </label>
                </div>
              ))}
              <button className={styles.primary} disabled={busy}>
                {busy ? "Saving…" : "Save opening hours"}
              </button>
            </form>
          )}
          {tab === "enquiries" && (
            <div className={styles.enquiryList}>
              {initialEnquiries.map((item) => (
                <article className={styles.enquiry} key={item.id}>
                  <div className={styles.enquiryHead}>
                    <div>
                      <h3>{item.name}</h3>
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                    </div>
                    <span>
                      {new Date(item.created_at).toLocaleString("en-NG")}
                    </span>
                  </div>
                  <p className={styles.topic}>{item.topic}</p>
                  <p>{item.message}</p>
                  <label>
                    Status
                    <select
                      value={item.status}
                      onChange={(e) => updateEnquiry(item.id, e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </label>
                </article>
              ))}
              {initialEnquiries.length === 0 && (
                <div className={styles.empty}>
                  No enquiries yet. Test the public contact form to see a
                  message here.
                </div>
              )}
            </div>
          )}
          <p className={styles.dashFootnote}>
            Changes are saved to Supabase. Visit the public website in a new tab
            and refresh to verify published content.
          </p>
        </section>
      </div>
    </>
  );
}
