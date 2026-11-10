import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

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

const occasionCategories: Record<string, string[]> = {
  wedding: ["formal", "satin"],
  party: ["evening", "satin"],
  formal: ["formal"],
};

export default function Stylist() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isEditingAnswer, setIsEditingAnswer] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");

  const currentQuestion = questions[step];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const occasion = answers[0];
    const color = answers[1];
    const budget = answers[3];
    const size = answers[4];

    if (occasion && occasion !== "special") {
      const categories = occasionCategories[occasion];

      if (categories) {
        result = result.filter((product) =>
          categories.includes(product.categoryKey),
        );
      }
    }

    if (color && color !== "any") {
      if (color === "light") {
        result = result.filter((product) =>
          product.colors?.some((item) =>
            ["ivory", "lavender", "lightblue"].includes(item),
          ),
        );
      } else {
        result = result.filter((product) => product.colors?.includes(color));
      }
    }

    const style = answers[2];

    if (style && style !== "any") {
      result = result.filter((product) => product.styleTags?.includes(style));
    }

    if (budget && budget !== "any") {
      const maxBudget = Number(budget);

      if (budget === "5000000") {
        result = result.filter((product) => product.price <= maxBudget);
      } else if (budget === "7000000") {
        result = result.filter(
          (product) => product.price > 5000000 && product.price <= maxBudget,
        );
      } else {
        result = result.filter((product) => product.price > 7000000);
      }
    }

    if (size && size !== "any") {
      result = result.filter((product) =>
        product.sizes?.includes(Number(size)),
      );
    }

    return result;
  }, [answers]);

  const fallbackProducts = useMemo(() => {
    const occasion = answers[0];
    const color = answers[1];
    const style = answers[2];
    const budget = answers[3];
    const size = answers[4];

    const occasionMatches =
      occasion && occasion !== "special"
        ? products.filter((product) =>
            occasionCategories[occasion]?.includes(product.categoryKey),
          )
        : [...products];

    const candidates = occasionMatches.length ? occasionMatches : [...products];

    function getScore(product: (typeof products)[number]) {
      let score = 0;

      if (color && color !== "any") {
        const matchesColor =
          color === "light"
            ? product.colors?.some((item) =>
                ["ivory", "lavender", "lightblue"].includes(item),
              )
            : product.colors?.includes(color);

        if (matchesColor) score += 3;
      }

      if (style && style !== "any" && product.styleTags?.includes(style)) {
        score += 3;
      }

      if (budget && budget !== "any") {
        const priceMatches =
          budget === "5000000"
            ? product.price <= 5000000
            : budget === "7000000"
              ? product.price > 5000000 && product.price <= 7000000
              : product.price > 7000000;

        if (priceMatches) score += 2;
      }

      if (size && size !== "any" && product.sizes?.includes(Number(size))) {
        score += 2;
      }

      return score;
    }

    return [...candidates]
      .sort((a, b) => getScore(b) - getScore(a))
      .slice(0, 4);
  }, [answers]);

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
    if (step === questions.length - 1) {
      setShowResults(true);
    } else {
      setStep((current) => current + 1);
    }
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
        className="min-h-svh px-4 pb-20 pt-28 sm:px-6 md:px-[8vw] md:pt-36"
      >
        <div className="mx-auto max-w-3xl">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs text-mute transition hover:text-gold"
          >
            <ArrowRight size={14} />
            بازگشت به فروشگاه
          </Link>

          <section className="py-12 text-center sm:py-16">
            <span className="inline-flex items-center gap-2 text-xs tracking-widest text-gold">
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
            <section className="mx-auto max-w-xl">
              <div className="mb-8 flex items-center justify-between text-xs text-mute">
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

              <div className="mb-10 h-px bg-line">
                <div
                  className="h-px bg-gold transition-all duration-500"
                  style={{
                    width: `${((step + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>

              <div className="mb-8 text-center">
                <h2 className="text-xl font-light sm:text-2xl">
                  {currentQuestion.title}
                </h2>

                <p className="mt-3 text-xs text-mute">
                  {currentQuestion.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {currentQuestion.options.map((option) => {
                  const selected = answers[step] === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => selectOption(option.value)}
                      className={`min-h-16 border px-4 py-4 text-sm transition ${
                        selected
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-line text-ink hover:border-gold/60"
                      }`}
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
                  onClick={() => setStep((current) => current - 1)}
                  className="inline-flex items-center gap-2 text-xs text-mute transition hover:text-gold disabled:opacity-30"
                >
                  <ArrowRight size={14} />
                  مرحله قبل
                </button>

                <button
                  type="button"
                  disabled={!answers[step]}
                  onClick={nextStep}
                  className="inline-flex items-center gap-3 bg-gold px-6 py-3.5 text-xs text-bg transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40"
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
                <span className="text-xs tracking-widest text-gold">
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
                <div className="mb-6 flex items-center justify-between gap-4">
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
                <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
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
                      اما این مدل‌ها به سلیقه‌ات نزدیک هستن. شاید یکی از این
                      انتخاب‌ها رو دوست داشته باشی.
                    </p>
                  </div>

                  {fallbackProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
                      {fallbackProducts.map((product, index) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          index={index + 1}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="py-8 text-center text-sm text-mute">
                      فعلاً محصولی برای پیشنهاد وجود نداره.
                    </p>
                  )}
                </div>
              )}

              <div className="mt-12">
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
                          className="shrink-0 text-xs text-gold transition hover:text-ink"
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
