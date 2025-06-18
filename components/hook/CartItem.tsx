export interface CartItem {
  item: MenuType;
  quantity: number;
  size?: string;
  table: string;
}
export interface CartItemUpdate {
  item: MenuType;
  quantity: number;
  size?: string;
  
  
}