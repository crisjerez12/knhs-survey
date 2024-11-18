export interface FormData {
  clientType: string;
  gender: string;
  age: string;
  region: string;
  serviceAvailed: string;
}

export interface CCAnswers {
  awareness: string;
  quality: string;
  helpfulness: string;
}

export interface Errors {
  [key: string]: string;
}
