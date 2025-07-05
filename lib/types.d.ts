

type TableType = {
  _id: string;
  tableNumber: string;
  tableName: string;
  status: "available" | "occupied" | "reserved";
  createdAt: Date;
  updatedAt: Date
};

type MenuType = {
  getFilteredSelectedRowModel(): unknown;
  _id: string;
  productname: string;
  barcode: string;
  producttype: string;
  description: string;
  image: string;
  tags: [string];
  size: [string];
  price: string;
  createdAt: Date;
  updatedAt: Date;
  // REMOVE or make optional:
  getFilteredSelectedRowModel?: () => void;

}
type ProductDetailsType = {
  _id: string;
  productname: string;
  barcode: string;
  producttype: string;
  description: string;
  image: string;
  tags: [string];
  size: [string];
  price: string;
  table: TableType;
  createdAt: Date;
  updatedAt: Date;

}