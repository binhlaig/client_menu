import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";
import { CartItem } from "./CartItem";


interface CartStore {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (idToRemove: string) => void;
    increaseQuantity: (idToIncrease: string) => void;
    decreaseQuantity: (idToDecrease: string) => void;
    clearCart: () => void;
}

const CartUse = create(
    persist<CartStore>(
        (set, get) => ({
            cartItems: [],
            addItem: (data: CartItem) => {
                const { item, quantity, size, table } = data;
                const currentItems = get().cartItems; // all the items already in cart
                const isExisting = currentItems.find(
                    (cartItem) => cartItem.item._id === item._id,
                );
                if (isExisting) {
                    return toast("Item already in cart");
                }

                set({ cartItems: [...currentItems, { item, quantity, size,table }] });
                toast.success("Item added to cart", { icon: "🛒" });

            },
            //remove item from cart
            removeItem: (idToRemove: String) => {
                const newCartItems = get().cartItems.filter(
                  (cartItem) => cartItem.item._id !== idToRemove
                );
                set({ cartItems: newCartItems });
                toast.success("Item removed from cart");
              },
              //increase quantity of item in cart
              increaseQuantity: (idToIncrease: String) => {
                const newCartItems = get().cartItems.map((cartItem) =>
                  cartItem.item._id === idToIncrease
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
                );
                set({ cartItems: newCartItems });
                toast.success("Item quantity increased");
              },
              //decrease quantity of item in cart
              decreaseQuantity: (idToDecrease: String) => {
                const newCartItems = get().cartItems.map((cartItem) =>
                  cartItem.item._id === idToDecrease
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
                );
                set({ cartItems: newCartItems });
                toast.success("Item quantity decreased");
              },
            //clear cart
            clearCart: () => {
                set({ cartItems: [] });
                toast.success("Cart cleared");
            },
        }),
        {
            name: "cart-storage", // unique name for the storage
            storage: createJSONStorage(() => localStorage), // use localStorage to persist the cart items
        }
    )
)

export default CartUse
