import { useState, type FormEvent } from "react";
import { Check, Clock, Mail, MapPin, Phone, AtSign } from "lucide-react";
import PageShell from "../components/PageShell";
import { siteInfo } from "../data/Siteinfo";

const subjects = [
  "سفارش و پیگیری",
  "سایز و مشاوره",
  "ارسال و بازگشت",
  "سایر موارد",
];

const input =
  "w-full rounded-full border border-line bg-transparent px-5 py-3.5 text-sm outline-none transition placeholder:text-mute/60 focus:border-gold aria-invalid:border-red-400/70";

const contacts = [
  {
    icon: Mail,
    title: "ایمیل",
    value: siteInfo.email,
    href: `mailto:${siteInfo.email}`,
    ltr: true,
  },
  {
    icon: Phone,
    title: "تلفن",
    value: siteInfo.phone,
    href: undefined,
    ltr: false,
  },
  {
    icon: AtSign,
    title: "اینستاگرام",
    value: siteInfo.instagramHandle,
    href: siteInfo.instagram,
    ltr: true,
  },
  {
    icon: MapPin,
    title: "آدرس",
    value: siteInfo.address,
    href: undefined,
    ltr: false,
  },
  {
    icon: Clock,
    title: "ساعت پاسخگویی",
    value: siteInfo.hours,
    href: undefined,
    ltr: false,
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
  });
  const [showErrors, setShowErrors] = useState(false);
  const [sent, setSent] = useState(false);

  const errors = {
    name: form.name.trim().length < 2 ? "نام خود را وارد کنید." : "",
    email: /^\S+@\S+\.\S+$/.test(form.email.trim())
      ? ""
      : "ایمیل معتبر وارد کنید.",
    message:
      form.message.trim().length < 10 ? "پیام باید حداقل ۱۰ کاراکتر باشد." : "",
  };

  const set = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowErrors(true);

    if (errors.name || errors.email || errors.message) return;

    // No backend yet: messages are only stored in this browser
    const saved = JSON.parse(localStorage.getItem("noire-messages") || "[]");
    saved.push({ ...form, createdAt: new Date().toISOString() });
    localStorage.setItem("noire-messages", JSON.stringify(saved));

    setSent(true);
  }

  return (
    <PageShell
      eyebrow="GET IN TOUCH"
      title={
        <>
          ما <em>اینجا هستیم.</em>
        </>
      }
      intro="سؤال، مشاوره سایز یا پیگیری سفارش؛ هر چه دارید برایمان بنویسید."
    >
      <div className="grid gap-10 md:grid-cols-[1fr_1.25fr]">
        <ul className="space-y-6">
          {contacts.map(({ icon: Icon, title, value, href, ltr }) => (
            <li key={title} className="flex items-start gap-4">
              <Icon
                size={18}
                strokeWidth={1.4}
                className="mt-1 flex-none text-gold"
              />

              <div className="text-sm">
                <p className="mb-1 text-xs text-mute">{title}</p>

                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    dir={ltr ? "ltr" : undefined}
                    className="transition hover:text-gold"
                  >
                    {value}
                  </a>
                ) : (
                  <p>{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="rounded-t-[48px] border border-line bg-[#141210] px-5 pb-8 pt-10 sm:px-8">
          {sent ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-5 grid h-20 w-16 place-items-center rounded-t-full border border-gold text-gold">
                <Check size={24} strokeWidth={1.2} />
              </div>

              <h2 className="mb-3 text-xl font-light">پیام شما ثبت شد</h2>
              <p className="mb-6 text-sm leading-8 text-mute">
                به‌زودی با شما تماس می‌گیریم.
              </p>

              <button
                type="button"
                onClick={() => {
                  setForm({
                    name: "",
                    email: "",
                    subject: subjects[0],
                    message: "",
                  });
                  setShowErrors(false);
                  setSent(false);
                }}
                className="text-xs text-gold transition hover:text-ink"
              >
                ارسال پیام دیگر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="c-name"
                  className="mb-2 block text-xs text-mute"
                >
                  نام
                </label>
                <input
                  id="c-name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={showErrors && !!errors.name}
                  className={input}
                />
                {showErrors && errors.name && (
                  <p role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="c-email"
                  className="mb-2 block text-xs text-mute"
                >
                  ایمیل
                </label>
                <input
                  id="c-email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={showErrors && !!errors.email}
                  className={`${input} text-end`}
                />
                {showErrors && errors.email && (
                  <p role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="c-subject"
                  className="mb-2 block text-xs text-mute"
                >
                  موضوع
                </label>
                <select
                  id="c-subject"
                  value={form.subject}
                  onChange={(e) => set("subject", e.target.value)}
                  className={input}
                >
                  {subjects.map((s) => (
                    <option key={s} value={s} className="bg-bg">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="c-message"
                  className="mb-2 block text-xs text-mute"
                >
                  پیام
                </label>
                <textarea
                  id="c-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  aria-invalid={showErrors && !!errors.message}
                  className={`${input} rounded-3xl`}
                />
                {showErrors && errors.message && (
                  <p role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gold py-4 text-sm font-medium text-bg transition hover:bg-ink"
              >
                ارسال پیام
              </button>
            </form>
          )}
        </div>
      </div>
    </PageShell>
  );
}
