import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { products, formatPrice } from "../data/products";
import { saveCart } from "../utils/cart";

type CartItem = {
  productId: string;
  size: number;
  quantity: number;
};

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
    <main className="min-h-screen bg-[#111110] text-[#f4f0e8] px-5 md:px-12 pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.25em] text-[#c6a87c] mb-5">
          YOUR SELECTION
        </p>

        <h1 className="text-4xl md:text-6xl font-light mb-12">سبد خرید</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center text-center py-20">
            <ShoppingBag size={36} className="text-[#c6a87c] mb-6" />

            <h2 className="text-xl mb-4">سبد خرید شما خالی است</h2>

            <p className="text-sm text-white/50 mb-8">
              انتخابی برای درخشش پیدا کن.
            </p>

            <Link
              to="/shop"
              className="bg-[#c6a87c] text-[#111110] px-8 py-4 text-sm hover:bg-[#d5b991] transition"
            >
              مشاهده فروشگاه
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
            <div className="space-y-6">
              {cartItems.map((item) => {
                if (!item.product) return null;

                return (
                  <article
                    key={`${item.productId}-${item.size}`}
                    className="flex gap-5 border-b border-white/10 pb-6"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-28 md:w-40 aspect-[3/4] object-cover"
                    />

                    <div className="flex-1 flex flex-col">
                      <p className="text-xs text-white/50 mb-2">
                        {item.product.category}
                      </p>

                      <h2 className="text-lg mb-3">{item.product.name}</h2>

                      <p className="text-sm text-white/60">سایز: {item.size}</p>

                      <p className="text-[#c6a87c] mt-3">
                        {formatPrice(item.product.price)}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-5">
                        <div className="flex items-center border border-white/15">
                          <button
                            onClick={() =>
                              changeQuantity(item.productId, item.size, -1)
                            }
                            className="p-2"
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
                            className="p-2"
                            aria-label="افزایش تعداد"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="text-white/40 hover:text-red-400 transition"
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

            <aside className="border border-white/10 p-6 h-fit">
              <h2 className="text-lg mb-6">خلاصه سفارش</h2>

              <div className="flex justify-between text-sm text-white/60 mb-4">
                <span>تعداد محصولات</span>
                <span>
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              <div className="flex justify-between text-sm text-white/60 mb-6">
                <span>هزینه ارسال</span>
                <span>در مرحله بعد محاسبه می‌شود</span>
              </div>

              <div className="border-t border-white/10 pt-5 flex justify-between gap-4">
                <span>مبلغ کل</span>
                <span className="text-[#c6a87c]">{formatPrice(total)}</span>
              </div>

              <button
                disabled
                className="w-full mt-8 py-4 bg-[#c6a87c] text-[#111110] opacity-50 cursor-not-allowed"
              >
                ادامه فرایند خرید
              </button>

              <p className="text-xs text-white/40 text-center mt-4">
                پرداخت در مرحله بعد فعال خواهد شد.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
