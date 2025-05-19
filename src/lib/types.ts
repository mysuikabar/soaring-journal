export type Student = {
  id: string;
  name: string;
  createdAt: Date;
};

export type Instructor = {
  id: string;
  name: string;
};

export type Report = {
  id: string;
  studentId: string;
  content: string;
  instructorName: string;
  createdAt: Date;
};
