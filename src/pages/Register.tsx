import { useState, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const location = useLocation();
  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? "/account";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    try {
      register({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      navigate(redirectTo, { replace: true });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "ثبت‌نام انجام نشد. دوباره تلاش کنید.",
      );
    }
  }

  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-5 py-16"
    >
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
        <div className="mb-10 text-center">
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
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extralight">به NOIRÉ بپیوندید</h1>
          <p className="mt-3 text-sm text-mute">
            حساب کاربری خود را ایجاد کنید.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-xs text-mute">
              نام و نام خانوادگی
            </label>

            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="نام شما"
              className="w-full border-b border-line bg-transparent px-1 py-3 text-sm outline-none transition placeholder:text-mute/50 focus:border-gold"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="mb-2 block text-xs text-mute">
              شماره موبایل
            </label>

            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              required
              dir="ltr"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="09xxxxxxxxx"
              className="w-full border-b border-line bg-transparent px-1 py-3 text-sm outline-none transition placeholder:text-mute/50 focus:border-gold"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-2 block text-xs text-mute">
              رمز عبور
            </label>

            <div className="flex items-center border-b border-line transition focus-within:border-gold">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
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

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-xs text-mute"
            >
              تکرار رمز عبور
            </label>

            <div className="flex items-center border-b border-line transition focus-within:border-gold">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="رمز عبور را دوباره وارد کنید"
                className="w-full bg-transparent px-1 py-3 text-sm outline-none placeholder:text-mute/50"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                aria-label={showConfirmPassword ? "مخفی کردن رمز" : "نمایش رمز"}
                className="px-2 text-mute transition hover:text-gold"
              >
                {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-xs text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-gold py-4 text-sm font-medium text-bg transition hover:bg-ink"
          >
            ایجاد حساب کاربری
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-mute">
          قبلاً عضو NOIRÉ شده‌اید؟
          <Link
            to="/login"
            className="ms-2 text-gold transition hover:text-ink"
          >
            وارد شوید
          </Link>
        </div>

        <p className="mt-12 text-center font-label text-[9px] tracking-[.2em] text-mute/60 [direction:ltr]">
          NOIRÉ — ELEGANCE AFTER DARK
        </p>
      </section>
    </main>
  );
}
