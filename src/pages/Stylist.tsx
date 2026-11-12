import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { occasionCategories } from "../utils/occasions";
import { label, productGrid } from "../ui/ui";

const questions = [
  {
    title: "برای چه مناسبتی دنبال لباس می‌گردی؟",
    description: "مناسبتت رو انتخاب کن تا پیشنهادها دقیق‌تر بشن.",
    options: [
      { label: "عروسی", value: "wedding" },
      { label: "مهمانی", value: "party" },
      { label: "مراسم رسمی", value: "formal" },
      { label: "یک موقعیت خاص", value: "special" },
    ],
  },
  {
    title: "چه رنگی رو بیشتر می‌پسندی؟",
    description: "رنگی که با سلیقه‌ات هماهنگه.",
    options: [
      { label: "مشکی", value: "black" },
      { label: "زرشکی", value: "burgundy" },
      { label: "عاجی", value: "ivory" },
      { label: "رنگ‌های روشن", value: "light" },
      { label: "فرقی نمی‌کنه", value: "any" },
    ],
  },
  {
    title: "چه سبکی رو ترجیح می‌دی؟",
    description: "استایل موردعلاقه‌ات رو انتخاب کن.",
    options: [
      { label: "کلاسیک و شیک", value: "classic" },
      { label: "مینیمال و ساده", value: "minimal" },
      { label: "جذاب و جسورانه", value: "bold" },
      { label: "لطیف و ظریف", value: "delicate" },
      { label: "پیشنهاد خودت رو بده", value: "any" },
    ],
  },
  {
    title: "چه محدوده قیمتی مدنظرت هست؟",
    description: "تا پیشنهادها با بودجه‌ات هماهنگ باشن.",
    options: [
      { label: "تا ۵ میلیون تومان", value: "5000000" },
      { label: "۵ تا ۷ میلیون تومان", value: "7000000" },
      { label: "بیشتر از ۷ میلیون", value: "999999999" },
      { label: "محدودیتی ندارم", value: "any" },
    ],
  },
  {
    title: "سایز لباس رو انتخاب کن.",
    description: "برای نمایش لباس‌هایی که سایز مناسب تو رو دارن.",
    options: [
      { label: "۳۶", value: "36" },
      { label: "۳۸", value: "38" },
      { label: "۴۰", value: "40" },
      { label: "۴۲", value: "42" },
      { label: "۴۴", value: "44" },
      { label: "۴۶", value: "46" },
      { label: "هنوز مطمئن نیستم", value: "any" },
    ],
  },
];

type Product = (typeof products)[number];

const lightColors = ["ivory", "lavender", "lightblue"];

// One rule per question. Used for BOTH exact results and the "closest matches" fallback.
const matchers: ((p: Product, value: string) => boolean)[] = [
  (p, v) =>
    v === "special" || (occasionCategories[v]?.includes(p.categoryKey) ?? true),
  (p, v) =>
    v === "light"
      ? !!p.colors?.some((c) => lightColors.includes(c))
      : !!p.colors?.includes(v),
  (p, v) => !!p.styleTags?.includes(v),
  (p, v) =>
    v === "5000000"
      ? p.price <= 5000000
      : v === "7000000"
        ? p.price > 5000000 && p.price <= 7000000
        : p.price > 7000000,
  // only sizes that are actually in stock
  (p, v) => (p.sizeStock?.[Number(v)] ?? 0) > 0,
];

/* ---- Keep progress when the user opens a product and comes back ---- */
const STORAGE_KEY = "noire-stylist";

type Saved = { answers: string[]; step: number; showResults: boolean };

function loadSaved(): Saved {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "");

    if (Array.isArray(saved.answers)) {
      return {
        answers: saved.answers.map((a: unknown) =>
          typeof a === "string" ? a : "",
        ),
        step: Math.min(
          Math.max(0, Number(saved.step) || 0),
          questions.length - 1,
        ),
        showResults: !!saved.showResults,
      };
    }
  } catch {
    /* nothing saved yet */
  }

  return { answers: [], step: 0, showResults: false };
}

// Coming from the home page chips (/stylist?occasion=wedding) pre-answers question 1
function getInitialState(occasion: string | null): Saved {
  if (occasion && questions[0].options.some((o) => o.value === occasion)) {
    return { answers: [occasion], step: 1, showResults: false };
  }

  return loadSaved();
}

export default function Stylist() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initial] = useState(() =>
    getInitialState(searchParams.get("occasion")),
  );

  const [step, setStep] = useState(initial.step);
  const [answers, setAnswers] = useState<string[]>(initial.answers);
  const [showResults, setShowResults] = useState(initial.showResults);
  const [isEditingAnswer, setIsEditingAnswer] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");

  const currentQuestion = questions[step];

  useEffect(() => {
    if (searchParams.has("occasion")) setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ answers, step, showResults }),
    );
  }, [answers, step, showResults]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [showResults]);

  // Questions that actually narrow things down ("any" and "special occasion" don't)
  const activeIndexes = useMemo(
    () =>
      questions
        .map((_, i) => i)
        .filter(
          (i) =>
            answers[i] &&
            answers[i] !== "any" &&
            !(i === 0 && answers[i] === "special"),
        ),
    [answers],
  );

  const scored = useMemo(
    () =>
      products.map((product) => ({
        product,
        score: activeIndexes.filter((i) => matchers[i](product, answers[i]))
          .length,
      })),
    [answers, activeIndexes],
  );

  const total = activeIndexes.length;

  const filteredProducts = useMemo(
    () =>
      scored.filter((item) => item.score === total).map((item) => item.product),
    [scored, total],
  );

  const fallbackProducts = useMemo(
    () =>
      scored
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4),
    [scored],
  );

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [filteredProducts, sortOrder]);

  function selectOption(value: string) {
    const updatedAnswers = [...answers];
    updatedAnswers[step] = value;

    setAnswers(updatedAnswers);

    if (isEditingAnswer) {
      setIsEditingAnswer(false);
      setShowResults(true);
    }
  }

  function nextStep() {
    setIsEditingAnswer(false);

    if (step === questions.length - 1) {
      setShowResults(true);
    } else {
      setStep((current) => current + 1);
    }
  }

  function previousStep() {
    setIsEditingAnswer(false);
    setStep((current) => current - 1);
  }

  function resetStylist() {
    setStep(0);
    setAnswers([]);
    setShowResults(false);
    setIsEditingAnswer(false);
    setSortOrder("default");
  }

  return (
    <>
      <Header />

      <main
        dir="rtl"
        className="min-h-svh px-4 pb-20 pt-28 sm:px-6 md:px-[6vw] md:pt-36"
      >
        <div className="mx-auto max-w-6xl">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs text-mute transition hover:text-gold"
          >
            <ArrowRight size={14} />
            بازگشت به فروشگاه
          </Link>

          <section className="py-12 text-center sm:py-16">
            <span
              className={`${label} inline-flex items-center gap-2 text-gold`}
            >
              <Sparkles size={14} />
              NOIRÉ PERSONAL STYLIST
            </span>

            <h1 className="my-5 text-4xl font-extralight leading-relaxed sm:text-6xl">
              استایل تو،
              <br />
              <em>انتخاب تو.</em>
            </h1>

            <p className="mx-auto max-w-md text-sm leading-8 text-mute">
              به چند سؤال کوتاه پاسخ بده تا لباس‌هایی متناسب با سلیقه‌ات از
              کالکشن NOIRÉ پیدا کنیم.
            </p>
          </section>

          {!showResults ? (
            <section className="mx-auto max-w-xl rounded-t-[56px] border border-line bg-[#141210] px-5 pb-8 pt-10 sm:px-10 sm:pt-12">
              <div className="mb-6 flex items-center justify-between text-xs text-mute">
                <span>
                  مرحله {step + 1} از {questions.length}
                </span>

                <button
                  type="button"
                  onClick={resetStylist}
                  className="inline-flex items-center gap-2 transition hover:text-gold"
                >
                  <RotateCcw size={13} />
                  شروع دوباره
                </button>
              </div>

              <div
                role="progressbar"
                aria-label="پیشرفت"
                aria-valuemin={1}
                aria-valuemax={questions.length}
                aria-valuenow={step + 1}
                className="mb-10 h-px bg-line"
              >
                <div
                  className="h-px bg-gold transition-all duration-500"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>

              <div className="mb-8 text-center">
                <h2
                  id="question-title"
                  className="text-xl font-light sm:text-2xl"
                >
                  {currentQuestion.title}
                </h2>

                <p className="mt-3 text-xs text-mute">
                  {currentQuestion.description}
                </p>
              </div>

              <div
                role="radiogroup"
                aria-labelledby="question-title"
                className="grid grid-cols-2 gap-3"
              >
                {currentQuestion.options.map((option) => {
                  const selected = answers[step] === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => selectOption(option.value)}
                      className="min-h-14 rounded-full border border-line px-4 py-3.5 text-sm transition last:odd:col-span-2 hover:border-gold/60 aria-checked:border-gold aria-checked:bg-gold aria-checked:text-bg"
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={previousStep}
                  className="inline-flex items-center gap-2 text-xs text-mute transition hover:text-gold disabled:opacity-30"
                >
                  <ArrowRight size={14} />
                  مرحله قبل
                </button>

                <button
                  type="button"
                  disabled={!answers[step]}
                  onClick={nextStep}
                  className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-xs font-medium text-bg transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {step === questions.length - 1
                    ? "مشاهده پیشنهادها"
                    : "مرحله بعد"}

                  <ArrowLeft size={14} />
                </button>
              </div>
            </section>
          ) : (
            <section>
              <div className="mb-10 text-center">
                <span className={`${label} text-gold`}>
                  YOUR PERSONAL SELECTION
                </span>

                <h2 className="my-4 text-3xl font-extralight sm:text-4xl">
                  انتخاب‌هایی برای تو
                </h2>

                <p className="text-sm text-mute">
                  بر اساس پاسخ‌هایی که دادی، این لباس‌ها رو پیدا کردیم.
                </p>
              </div>

              {filteredProducts.length > 0 && (
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="text-xs text-mute">
                    {filteredProducts.length} محصول پیدا شد
                  </span>

                  <select
                    value={sortOrder}
                    onChange={(event) => setSortOrder(event.target.value)}
                    className="border-b border-line bg-transparent px-2 py-2 text-xs text-ink outline-none transition focus:border-gold"
                    aria-label="مرتب‌سازی محصولات"
                  >
                    <option value="default" className="bg-bg">
                      ترتیب پیش‌فرض
                    </option>
                    <option value="price-asc" className="bg-bg">
                      ارزان‌ترین
                    </option>
                    <option value="price-desc" className="bg-bg">
                      گران‌ترین
                    </option>
                  </select>
                </div>
              )}

              {filteredProducts.length > 0 ? (
                <div className={productGrid}>
                  {sortedProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index + 1}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <div className="py-10 text-center">
                    <Sparkles className="mx-auto mb-4 text-gold" size={22} />

                    <h3 className="text-lg font-light">
                      انتخاب دقیقی پیدا نکردیم.
                    </h3>

                    <p className="mt-3 text-sm leading-8 text-mute">
                      {fallbackProducts.length > 0
                        ? "اما این مدل‌ها بخشی از پاسخ‌هات رو دارن. شاید یکی از این انتخاب‌ها رو دوست داشته باشی."
                        : "فعلاً محصولی که با پاسخ‌هات هماهنگ باشه نداریم. می‌تونی یکی از جواب‌ها رو تغییر بدی."}
                    </p>
                  </div>

                  {fallbackProducts.length > 0 && (
                    <div className={productGrid}>
                      {fallbackProducts.map(({ product, score }, index) => (
                        <div key={product.id}>
                          <ProductCard product={product} index={index + 1} />

                          <p className="mt-2 text-[11px] text-gold">
                            هماهنگ با {score} از {total} پاسخ
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-16">
                <div className="mb-5 text-center">
                  <h3 className="text-sm font-light">پاسخ‌های شما</h3>
                  <p className="mt-2 text-xs text-mute">
                    می‌تونی هر کدوم از انتخاب‌هات رو جداگانه تغییر بدی.
                  </p>
                </div>

                <div className="mx-auto max-w-xl divide-y divide-line border-y border-line">
                  {questions.map((question, index) => {
                    const selectedOption = question.options.find(
                      (option) => option.value === answers[index],
                    );

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-4 py-4"
                      >
                        <div>
                          <p className="text-xs text-mute">{question.title}</p>

                          <p className="mt-2 text-sm text-ink">
                            {selectedOption?.label ?? "انتخاب نشده"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setStep(index);
                            setIsEditingAnswer(true);
                            setShowResults(false);
                          }}
                          className="shrink-0 rounded-full border border-gold/50 px-4 py-1.5 text-xs text-gold transition hover:bg-gold hover:text-bg"
                        >
                          ویرایش
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10 flex flex-col items-center gap-4">
                  <button
                    type="button"
                    onClick={resetStylist}
                    className="inline-flex items-center gap-2 border-b border-line pb-2 text-xs text-mute transition hover:text-gold"
                  >
                    <RotateCcw size={13} />
                    شروع مجدد از ابتدا
                  </button>

                  <Link
                    to="/shop"
                    className="text-xs text-mute transition hover:text-gold"
                  >
                    مشاهده همه محصولات
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
