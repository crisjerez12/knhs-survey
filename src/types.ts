export interface ClientInfo {
  clientType: string | undefined;
  sex: string | undefined;
  age: number | undefined;
  region: string | undefined;
  serviceAvailed: string | undefined;
}

export interface CCAnswers {
  cc1: string;
  cc2: string;
  cc3: string;
}

export interface SatisfactionAnswers {
  [key: string]: string;
}

export interface SurveyProgress {
  currentSection: number;
  clientInfo: ClientInfo;
  ccAnswers: CCAnswers;
  satisfactionAnswers: SatisfactionAnswers;
  isComplete: boolean;
  responded: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  required?: boolean;
  type?: "radio" | "checkbox" | "text" | "number" | "select";
}

export const regions = [
  "Region 1",
  "Region 2",
  "Region 3",
  "Region 4A",
  "Region 4B",
  "Region 5",
  "Region 6",
  "Region 7",
  "Region 8",
  "Region 9",
  "Region 10",
  "Region 11",
  "Region 12",
  "Region 13",
];
