interface PricingFormData {
  websiteType: 'portfolio' | 'business' | 'store' | 'blog' | 'custom';
  pagesCount: number;
  cms: 'wordpress' | 'custom' | 'none';
  customDesign: boolean;
  integrations: 'none' | 'payments' | 'social' | 'analytics' | 'newsletter' | 'crm' | 'multiple';
  deadline: string;
  email: string;
  budget: string;
  requirements: string;
  seo: boolean;
  maintenance: boolean;
  hosting: boolean;
  domain: boolean;
}

export { type PricingFormData };