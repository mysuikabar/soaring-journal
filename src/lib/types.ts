export type Student = {
  id: string;
  name: string;
  createdAt: Date;
};

export type Report = {
  id: string;
  studentId: string;
  content: string;
  createdAt: Date;
};
