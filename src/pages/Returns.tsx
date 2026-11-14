import PageShell, { Block } from "../components/PageShell";
import { siteInfo } from "../data/Siteinfo";

const steps = [
  "از صفحه تماس با ما، شماره سفارش و دلیل بازگشت را برایمان بفرستید.",
  "پس از تأیید، شیوه ارسال لباس به شما اطلاع داده می‌شود.",
  "لباس را در بسته‌بندی اصلی و همراه برچسب‌ها برگردانید.",
  "پس از بررسی، تعویض یا بازگشت وجه انجام می‌شود.",
];

export default function Returns() {
  return (
    <PageShell
      eyebrow="RETURNS & EXCHANGES"
      title={
        <>
          خیالت <em>راحت باشه.</em>
        </>
      }
      intro="اگر لباس آن‌طور که انتظار داشتید نبود، راه برگشت ساده است."
    >
      <Block n={1} title="مهلت بازگشت">
        <p>
          تا <span className="text-gold">{siteInfo.returnDays} روز</span> پس از
          دریافت سفارش می‌توانید درخواست بازگشت یا تعویض سایز بدهید.
        </p>
      </Block>

      <Block n={2} title="شرایط بازگشت">
        <ul className="list-disc space-y-2 ps-5 marker:text-gold">
          <li>لباس استفاده نشده و شسته نشده باشد.</li>
          <li>برچسب‌ها و بسته‌بندی اصلی سالم باشند.</li>
          <li>در مهلت اعلام‌شده درخواست ثبت شود.</li>
        </ul>
      </Block>

      <Block n={3} title="مراحل بازگشت">
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-4">
              <span className="grid size-7 flex-none place-items-center rounded-full border border-gold/50 text-[11px] text-gold">
                {(i + 1).toLocaleString("fa-IR")}
              </span>

              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Block>

      <Block n={4} title="تعویض سایز">
        <p>
          اگر سایز مناسب نبود، در صورت موجود بودن سایز دیگر، آن را برایتان تعویض
          می‌کنیم. موجودی هر سایز را در صفحه محصول می‌بینید.
        </p>
      </Block>
    </PageShell>
  );
}
