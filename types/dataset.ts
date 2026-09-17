export type DatasetCategory = "경제" | "금융" | "부동산" | "인구·사회";
export type DatasetFrequency = "수시" | "일" | "월" | "분기" | "연";

export type DatasetField = {
  name: string;
  description: string;
};

export type DatasetRecord = {
  slug: string;
  title: string;
  summary: string;
  category: DatasetCategory;
  frequency: DatasetFrequency;
  geography: string;
  unit: string;
  provider: string;
  source: {
    label: string;
    url: string;
  };
  definition: string;
  useCases: readonly string[];
  fields: readonly DatasetField[];
  caveats: readonly string[];
  keywords: readonly string[];
};
