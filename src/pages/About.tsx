import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageShell, { Block } from "../components/PageShell";
import { linkLine } from "../ui/ui";

export default function About() {
  return (
    <PageShell
      eyebrow="THE NOIRÉ STORY"
      title={
        <>
          زیبایی در جزئیات است؛
          <br />
          <em>نه در اغراق.</em>
        </>
      }
      intro="NOIRÉ برای زنانی ساخته شده که لباس را برای دیده‌شدن نمی‌پوشند؛ برای حس‌کردن می‌پوشند."
    >
      <Block n={1} title="فلسفه ما">
        <p>
          ما به لباس‌هایی باور داریم که نیازی به توضیح ندارند. برش‌های ساده،
          خطوط روان و رنگ‌هایی که شب را کامل می‌کنند؛ بدون شلوغی و بدون اغراق.
        </p>
        <p>
          هر مدل در کالکشن NOIRÉ برای لحظه‌ای انتخاب شده که قرار است به خاطره
          تبدیل شود: یک عروسی، یک مهمانی شبانه یا یک شام رسمی.
        </p>
      </Block>

      <Block n={2} title="کیفیت و جزئیات">
        <p>
          پارچه، دوخت و پرداخت هر لباس را با دقت بررسی می‌کنیم. کالکشن ما عمداً
          کوچک و گزینشی است تا هر انتخاب، یک انتخاب درست باشد.
        </p>
      </Block>

      <Block n={3} title="انتخاب شخصی‌تر">
        <p>
          اگر مطمئن نیستید چه چیزی مناسب مناسبت شماست، استایلیست NOIRÉ با چند
          سؤال کوتاه، لباس‌هایی هماهنگ با سلیقه، بودجه و سایز شما پیشنهاد
          می‌دهد.
        </p>

        <div className="flex flex-wrap gap-6 pt-3">
          <Link to="/stylist" className={linkLine}>
            شروع استایلیست
            <ArrowLeft size={16} />
          </Link>

          <Link to="/shop" className={linkLine}>
            مشاهده کالکشن
            <ArrowLeft size={16} />
          </Link>
        </div>
      </Block>
    </PageShell>
  );
}
