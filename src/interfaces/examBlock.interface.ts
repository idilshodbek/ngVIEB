export interface ExamBlock {
    _id: string;
    point: number;
    data: string;
    name: string;
    text: string;
    type: string;
    parent: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number
  }