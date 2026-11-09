import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const success = login(email.trim().toLowerCase(), password);

    if (success) {
      navigate("/account", { replace: true });
    } else {
      setError("ایمیل یا رمز عبور اشتباه است.");
    }
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
        to="/"
        className="absolute left-6 top-6 flex items-center gap-2 text-xs text-mute transition hover:text-gold"
      >
        <ArrowLeft size={16} />
        بازگشت به فروشگاه
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

        {/* Heading */}
        <div className="mb-9 text-center">
          <h1 className="text-3xl font-extralight">خوش آمدید</h1>
          <p className="mt-3 text-sm text-mute">
            برای ورود به حساب کاربری خود اطلاعات را وارد کنید.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="mb-2 block text-xs text-mute">
              ایمیل
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@email.com"
              dir="ltr"
              className="w-full border-b border-line bg-transparent px-1 py-3 text-sm outline-none transition placeholder:text-mute/50 focus:border-gold"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-xs text-mute">
              رمز عبور
            </label>

            <div className="flex items-center border-b border-line transition focus-within:border-gold">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="حداقل ۸ کاراکتر"
                className="w-full bg-transparent px-1 py-3 text-sm outline-none placeholder:text-mute/50"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
                className="px-2 text-mute transition hover:text-gold"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-xs text-red-400">
              {error}
            </p>
          )}

          <div className="flex justify-start">
            <Link
              to="/forgot-password"
              className="text-xs text-mute transition hover:text-gold"
            >
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gold py-4 text-sm font-medium text-bg transition hover:bg-ink"
          >
            ورود به حساب
          </button>
        </form>

        {/* Register link */}
        <div className="mt-9 text-center text-sm text-mute">
          هنوز عضو NOIRÉ نیستید؟
          <Link
            to="/register"
            className="ms-2 text-gold transition hover:text-ink"
          >
            ثبت‌نام کنید
          </Link>
        </div>

        <p className="mt-14 text-center font-label text-[9px] tracking-[.2em] text-mute/60 [direction:ltr]">
          NOIRÉ — ELEGANCE AFTER DARK
        </p>
      </section>
    </main>
  );
}
