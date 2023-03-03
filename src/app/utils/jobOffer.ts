export type Salary = 'brutto' | 'netto';
export type Currency = 'zl' | '$';
export interface JobOffer {
  jobTitle: string;
  salary: number;
  currency: Currency;
  salaryType: Salary;
  jobDescription: string;
  location: string;
  authorUid: string;
}
