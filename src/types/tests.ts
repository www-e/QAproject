export interface Test {
  id: string;
  name: string;
  type: string;
  status: "مكتمل" | "قيد التنفيذ" | "فشل" | "معلق";
  priority: "عالية جداً" | "عالية" | "متوسطة" | "منخفضة";
  duration: string;
  lastRun: string;
  success: number;
  assignee: string;
  environment: string;
  description?: string; // This line is added
}

export interface TestFilters {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
}