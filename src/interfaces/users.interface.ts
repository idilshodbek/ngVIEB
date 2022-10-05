export interface User {
    _id: string;
    tel: string;
    password?: string;
    name: string;
    isActive: boolean;
    role: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number
  }