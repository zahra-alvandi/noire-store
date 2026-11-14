import { Link } from "react-router-dom";
import { label } from "../ui/ui";

const footLink = "text-[11px] text-mute transition hover:text-gold";
const footTitle = "mb-2 text-xs font-normal";

export default function Footer() {
  return (
    <footer className="bg-[#100e0c] px-[6vw] pb-6 pt-16 md:pt-[70px]">
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 pb-16 md:grid-cols-[1.6fr_repeat(3,1fr)] md:gap-11">
        <div className="col-span-2 md:col-span-1">
          <Link
            to="/"
            className="inline-block font-serif text-[32px] tracking-[.18em] [direction:ltr]"
          >
            NOIRÉ<span className="align-top font-label text-[9px]">®</span>
          </Link>
          <p className="mt-5 text-[11px] leading-10 text-mute">
            ظرافت، فراتر از زمان.
            <br />
            انتخابی برای لحظه‌های خاص.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4">
          <h3 className={footTitle}>دسترسی سریع</h3>
          <Link className={footLink} to="/shop">
            فروشگاه
          </Link>
          <Link className={footLink} to="/about">
            درباره ما
          </Link>
          <Link className={footLink} to="/stylist">
            استایلیست هوشمند
          </Link>
        </div>

        <div className="flex flex-col items-start gap-4">
          <h3 className={footTitle}>راهنمای خرید</h3>
          <Link className={footLink} to="/faq">
            سؤالات متداول
          </Link>
          <Link className={footLink} to="/shipping">
            ارسال و تحویل
          </Link>
          <Link className={footLink} to="/returns">
            شرایط بازگشت
          </Link>
        </div>

        <div className="flex flex-col items-start gap-4">
          <h3 className={footTitle}>ارتباط با ما</h3>
          <Link className={footLink} to="/contact">
            تماس با ما
          </Link>
          <a
            className={footLink}
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            اینستاگرام
          </a>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 border-t border-line pt-5 text-[10px] text-mute md:flex-row md:items-center md:justify-between">
        <span className={label}>© 2026 NOIRÉ. ALL RIGHTS RESERVED.</span>
        <span>ساخته‌شده برای لحظه‌های خاص</span>
      </div>
    </footer>
  );
}
