import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { products, formatPrice } from "../data/products";
import { saveCart } from "../utils/cart";
import Header from "../components/Header";
import { label } from "../ui/ui";

type CartItem = {
  productId: string;
  size: number;
  quantity: number;
};

const qtyBtn = "grid size-9 place-items-center transition hover:text-gold";

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("noire-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  function updateCart(updatedCart: CartItem[]) {
    setCart(updatedCart);
    saveCart(updatedCart);
  }

  function changeQuantity(productId: string, size: number, amount: number) {
    const updatedCart = cart
      .map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: item.quantity + amount }
          : item,
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  }

  function removeItem(productId: string, size: number) {
    updateCart(
      cart.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    );
  }

  const cartItems = cart.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.productId),
  }));

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0,
  );

  return (
    <>
      <Header />

      <main className="min-h-svh px-[5vw] pb-20 pt-32 md:px-[6vw]">
        <div className="mx-auto max-w-6xl">
          <p className={`${label} mb-5 text-gold`}>YOUR SELECTION</p>

          <h1 className="mb-12 text-4xl font-extralight md:text-6xl">
            سبد خرید
          </h1>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <ShoppingBag
                size={36}
                strokeWidth={1}
                className="mb-6 text-gold"
              />

              <h2 className="mb-4 text-xl font-light">سبد خرید شما خالی است</h2>

              <p className="mb-8 text-sm text-mute">
                انتخابی برای درخشش پیدا کن.
              </p>

              <Link
                to="/shop"
                className="rounded-full bg-gold px-8 py-4 text-sm font-medium text-bg transition hover:bg-ink"
              >
                مشاهده فروشگاه
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_350px]">
              <div className="space-y-6">
                {cartItems.map((item) => {
                  if (!item.product) return null;

                  return (
                    <article
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-5 border-b border-line pb-6"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="aspect-[3/4] w-28 rounded-t-full object-cover md:w-40"
                      />

                      <div className="flex flex-1 flex-col">
                        <p className="mb-2 text-xs text-mute">
                          {item.product.category}
                        </p>

                        <h2 className="mb-3 text-lg font-light">
                          {item.product.name}
                        </h2>

                        <p className="text-sm text-mute">سایز: {item.size}</p>

                        <p className="mt-3 text-gold">
                          {formatPrice(item.product.price)}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-5">
                          <div className="flex items-center rounded-full border border-line">
                            <button
                              onClick={() =>
                                changeQuantity(item.productId, item.size, -1)
                              }
                              className={qtyBtn}
                              aria-label="کاهش تعداد"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                changeQuantity(item.productId, item.size, 1)
                              }
                              className={qtyBtn}
                              aria-label="افزایش تعداد"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              removeItem(item.productId, item.size)
                            }
                            className="text-mute transition hover:text-red-400"
                            aria-label="حذف محصول"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <aside className="h-fit rounded-t-[40px] border border-line bg-[#141210] p-6 pt-9">
                <h2 className="mb-6 text-lg font-light">خلاصه سفارش</h2>

                <div className="mb-4 flex justify-between text-sm text-mute">
                  <span>تعداد محصولات</span>
                  <span>
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>

                <div className="mb-6 flex justify-between gap-4 text-sm text-mute">
                  <span>هزینه ارسال</span>
                  <span>در مرحله بعد محاسبه می‌شود</span>
                </div>

                <div className="flex justify-between gap-4 border-t border-line pt-5">
                  <span>مبلغ کل</span>
                  <span className="text-gold">{formatPrice(total)}</span>
                </div>

                <button
                  disabled
                  className="mt-8 w-full cursor-not-allowed rounded-full bg-gold py-4 text-bg opacity-50"
                >
                  ادامه فرایند خرید
                </button>

                <p className="mt-4 text-center text-xs text-mute">
                  پرداخت در مرحله بعد فعال خواهد شد.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
