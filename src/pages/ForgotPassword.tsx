import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-5 py-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 size-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />

      <Link
        to="/login"
        className="absolute left-6 top-6 flex items-center gap-2 text-xs text-mute transition hover:text-gold"
      >
        <ArrowLeft size={16} />
        بازگشت به ورود
      </Link>

      <section className="relative w-full max-w-md animate-rise">
        {/* Brand */}
        <div className="mb-12 text-center">
          <Link
            to="/"
            className="font-serif text-4xl tracking-[.2em] [direction:ltr]"
          >
            NOIRÉ
            <span className="ms-1 align-top font-label text-[10px]">®</span>
          </Link>

          <p className="mt-5 font-label text-[10px] uppercase tracking-[.3em] text-gold">
            Elegance After Dark
          </p>
        </div>

        {!submitted ? (
          <>
            {/* Heading */}
            <div className="mb-9 text-center">
              <h1 className="text-3xl font-extralight">
                بازیابی <em>رمز عبور</em>
              </h1>

              <p className="mt-4 text-sm leading-7 text-mute">
                ایمیلی که با آن ثبت‌نام کرده‌اید وارد کنید. راهنمای بازیابی رمز
                برای شما ارسال خواهد شد.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs text-mute">
                  ایمیل
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  dir="ltr"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@email.com"
                  className="w-full border-b border-line bg-transparent px-1 py-3 text-sm outline-none transition placeholder:text-mute/50 focus:border-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gold py-4 text-sm font-medium text-bg transition hover:bg-ink"
              >
                ارسال درخواست بازیابی
              </button>
            </form>
          </>
        ) : (
          /* Confirmation */
          <div className="py-6 text-center animate-rise">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-gold/30 text-gold">
              <CheckCircle2 size={28} strokeWidth={1.3} />
            </div>

            <h1 className="mt-7 text-2xl font-extralight">
              درخواست شما ثبت شد
            </h1>

            <p className="mt-4 text-sm leading-8 text-mute">
              در نسخه فعلی، درخواست بازیابی فقط به‌صورت نمایشی ثبت می‌شود. ارسال
              ایمیل پس از اتصال بک‌اند فعال خواهد شد.
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setEmail("");
              }}
              className="mt-7 text-xs text-gold transition hover:text-ink"
            >
              ارسال مجدد
            </button>
          </div>
        )}

        <div className="mt-10 text-center text-sm text-mute">
          رمز عبورتان را به یاد آوردید؟
          <Link
            to="/login"
            className="ms-2 text-gold transition hover:text-ink"
          >
            وارد شوید
          </Link>
        </div>

        <p className="mt-14 text-center font-label text-[9px] tracking-[.2em] text-mute/60 [direction:ltr]">
          NOIRÉ — ELEGANCE AFTER DARK
        </p>
      </section>
    </main>
  );
}
