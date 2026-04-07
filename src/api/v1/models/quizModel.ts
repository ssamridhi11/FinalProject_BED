export interface Quiz {
  id?: string;        
  courseId: string;
  title: string;
  dueDate: Date | string; 
  attempts: number;
  score: number;
}
