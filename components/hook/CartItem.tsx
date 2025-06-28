export interface CartItem {
  id: string;
  item: MenuType;
  quantity: number;
  size?: string;
  table: string;
  note?: string;
}
export interface CartItemUpdate {
  id: string;
  item: MenuType;
  quantity: number;
  size?: string;
  note?: string;
}
