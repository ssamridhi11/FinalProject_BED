export interface Assignment {
  id?: string;         
  courseId: string;
  title: string;
  dueDate: Date | string;
  status: 'pending' | 'completed' | 'overdue';
  grade?: 'A' | 'B' | 'C' | 'D' | 'F';      
}
