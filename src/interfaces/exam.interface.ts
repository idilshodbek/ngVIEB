export interface Exam {
    _id: string;
    timeLimit?: string;
    code: string;
    name: string;
    isActive: boolean;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number
  }