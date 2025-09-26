export interface VariantMetadata {
  time: string;
  user: string;
  version: number;
  environment: string;
  locale: string;
  alias: string;
  $: {
    time: {
      "data-cslp": string;
    };
    user: {
      "data-cslp": string;
    };
    version: {
      "data-cslp": string;
    };
    environment: {
      "data-cslp": string;
    };
    locale: {
      "data-cslp": string;
    };
    alias: {
      "data-cslp": string;
    };
  };
}

export interface Variants {
  [variantId: string]: VariantMetadata;
}

export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
  variants: Variants;
}

export interface File {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  ACL: any[];
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
  publish_details: PublishDetails;
  $: any;
}

export interface Block {
  _version?: number;
  _metadata: any;
  $: any;
  title?: string;
  copy?: string;
  image?: File | null;
  layout?: ("image_left" | "image_right") | null;
}

export interface Blocks {
  block: Block;
}

export interface NavLink {
  title: string;
  href: string;
}

export interface Navigation {
  nav_link: NavLink[];
}

export interface Header {
  _content_type_uid: string;
  uid: string;
  locale: string;
  _version: number;
  ACL: any;
  _in_progress: boolean;
  brand_name: string;
  created_at: string;
  created_by: string;
  navigation: Navigation;
  tags: any[];
  title: string;
  updated_at: string;
  updated_by: string;
  publish_details: PublishDetails;
}

export interface Banner {
  banner_image?: File;
  banner_text: string;
  cta_text: string;
}

export interface Product {
  _content_type_uid: string;
  uid: string;
  title: string;
  price: number;
  image: File;
  tags: any[];
  locale: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  ACL: any;
  _version: number;
  _in_progress: boolean;
  publish_details: PublishDetails;
}

export interface BestSellers {
  section_heading: string;
  best_selling_products: Product[];
}

export interface Page {
  uid: string;
  $?: any;
  _version?: number;
  locale?: string;
  ACL?: any;
  _in_progress?: boolean;
  banner?: Banner;
  best_sellers?: BestSellers;
  created_at?: string;
  created_by?: string;
  header?: Header[];
  tags?: any[];
  title: string;
  updated_at?: string;
  updated_by?: string;
  url?: string;
  publish_details?: PublishDetails;
}
