export type SalaryType = 'brutto' | 'netto';
export type Currency = 'zl' | '$';
export interface JobOffer {
  jobTitle: string;
  salary: number;
  // add currency type
  currency: Currency;
  salaryType: SalaryType;
  jobDescription: string;
  location: string;
}
