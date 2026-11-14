import { Plus } from "lucide-react";
import PageShell from "../components/PageShell";
import { siteInfo } from "../data/Siteinfo";
import { label } from "../ui/ui";

const groups = [
  {
    title: "سفارش و پرداخت",
    items: [
      {
        q: "چطور سفارش بدهم؟",
        a: "محصول و سایز را انتخاب کنید، آن را به سبد خرید اضافه کنید و مراحل آدرس، ارسال و پرداخت را کامل کنید. برای ثبت سفارش باید وارد حساب کاربری خود شده باشید.",
      },
      {
        q: "چه روش‌های پرداختی دارید؟",
        a: "پرداخت آنلاین و پرداخت در محل هنگام تحویل سفارش.",
      },
      {
        q: "می‌توانم سفارشم را بعد از ثبت تغییر بدهم؟",
        a: "تا قبل از ارسال، از طریق صفحه تماس با ما درخواست خود را همراه با شماره سفارش برایمان بفرستید تا بررسی کنیم.",
      },
    ],
  },
  {
    title: "سایز و موجودی",
    items: [
      {
        q: "چطور سایز مناسبم را پیدا کنم؟",
        a: "در صفحه هر محصول، «راهنمای سایز» را باز کنید و اندازه دور سینه، کمر و باسن خود را با جدول مقایسه کنید. همچنین استایلیست NOIRÉ فقط لباس‌هایی را پیشنهاد می‌دهد که سایز شما موجود است.",
      },
      {
        q: "چرا بعضی سایزها «ناموجود» هستند؟",
        a: "کالکشن ما محدود است و هر سایز تعداد مشخصی دارد. سایز ناموجود قابل انتخاب نیست.",
      },
    ],
  },
  {
    title: "ارسال و بازگشت",
    items: [
      {
        q: "سفارش من چقدر طول می‌کشد؟",
        a: `آماده‌سازی سفارش ${siteInfo.processing} است. پس از آن، ارسال عادی ۳ تا ۵ روز کاری و ارسال اکسپرس ۱ تا ۲ روز کاری طول می‌کشد.`,
      },
      {
        q: "امکان بازگشت یا تعویض دارم؟",
        a: `بله، تا ${siteInfo.returnDays} روز پس از دریافت سفارش، به شرط استفاده‌نشدن لباس. جزئیات در صفحه «شرایط بازگشت» آمده است.`,
      },
    ],
  },
  {
    title: "حساب کاربری",
    items: [
      {
        q: "رمز عبورم را فراموش کرده‌ام.",
        a: "در صفحه ورود روی «رمز عبور را فراموش کرده‌اید؟» بزنید و مراحل بازیابی را دنبال کنید.",
      },
    ],
  },
];

export default function Faq() {
  return (
    <PageShell
      eyebrow="FREQUENTLY ASKED"
      title={
        <>
          پاسخ به <em>پرسش‌های</em> شما
        </>
      }
      intro="اگر جواب سؤالتان را اینجا پیدا نکردید، از صفحه تماس با ما برایمان بنویسید."
    >
      <div className="space-y-12">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className={`${label} mb-4 text-gold`}>{group.title}</h2>

            <div className="divide-y divide-line border-y border-line">
              {group.items.map((item) => (
                <details key={item.q} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-sm transition hover:text-gold [&::-webkit-details-marker]:hidden">
                    {item.q}

                    <Plus
                      size={16}
                      className="flex-none text-gold transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>

                  <p className="pb-6 text-sm leading-8 text-mute">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
