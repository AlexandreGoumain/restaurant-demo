export type EnterpriseFormData = {
  company: string;
  email: string;
  message: string;
};

export type EnterpriseFormErrors = Partial<Record<keyof EnterpriseFormData, string>>;

