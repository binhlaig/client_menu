import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";
import { CartItem, CartItemUpdate } from "./CartItem";


interface CartStore {
    updatecartItem: CartItemUpdate[];
    addItem: (item: CartItemUpdate) => void;
    removeItem: (idToRemove: string) => void;
    increaseQuantity: (idToIncrease: string) => void;
    decreaseQuantity: (idToDecrease: string) => void;
    clearCart: () => void;
}

const CartUseUpdate = create(
    persist<CartStore>(
        (set, get) => ({
            updatecartItem: [],
            addItem: (data: CartItemUpdate) => {
                const { item, quantity, size } = data;
                const currentItems = get().updatecartItem; // all the items already in cart
                const isExisting = currentItems.find(
                    (cartItem) => cartItem.item._id === item._id,
                );
                if (isExisting) {
                    return toast("Item already in cart");
                }

                set({ updatecartItem: [ { item, quantity, size }] });
                toast.success("Item added to cart", { icon: "🛒" });

            },
            //remove item from cart
            removeItem: (idToRemove: String) => {
                const newCartItems = get().updatecartItem.filter(
                  (cartItem) => cartItem.item._id !== idToRemove
                );
                set({ updatecartItem: newCartItems });
                toast.success("Item removed from cart");
              },
              //increase quantity of item in cart
              increaseQuantity: (idToIncrease: String) => {
                const newCartItems = get().updatecartItem.map((cartItem) =>
                  cartItem.item._id === idToIncrease
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
                );
                set({ updatecartItem: newCartItems });
                toast.success("Item quantity increased");
              },
              //decrease quantity of item in cart
              decreaseQuantity: (idToDecrease: String) => {
                const newCartItems = get().updatecartItem.map((cartItem) =>
                  cartItem.item._id === idToDecrease
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
                );
                set({ updatecartItem: newCartItems });
                toast.success("Item quantity decreased");
              },
            //clear cart
            clearCart: () => {
                set({  updatecartItem: [] });
                toast.success("Cart cleared");
            },
        }),
        {
            name: "cart-storage", // unique name for the storage
            storage: createJSONStorage(() => localStorage), // use localStorage to persist the cart items
        }
    )
)

export default CartUseUpdate
