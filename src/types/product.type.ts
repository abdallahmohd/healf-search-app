export interface Product {
  ID: string;
  TITLE: string;
  VENDOR: string;
  TAGS: string;
  PRICE_RANGE: string;
  TOTAL_INVENTORY: string;
  FEATURED_IMAGE: string;
  BODY_HTML: string;
  HANDLE: string;
  HAS_OUT_OF_STOCK_VARIANTS: string;
  SEO: string;
  CREATED_AT: string;
  UPDATED_AT: string;
  METADATA: string;
  // This would be tightened in a real application, just using `any` for flexibility
  [key: string]: any;
}
