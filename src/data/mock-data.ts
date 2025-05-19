import { Instructor, Report, Student } from "@/lib/types";

export const students: Student[] = [
  {
    id: "1",
    name: "山田太郎",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "鈴木花子",
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    name: "佐藤次郎",
    createdAt: new Date("2024-01-03"),
  },
];

export const instructors: Instructor[] = [
  {
    id: "1",
    name: "田中一郎",
  },
  {
    id: "2",
    name: "中村花子",
  },
  {
    id: "3",
    name: "木村健太",
  },
];

export const reports: Report[] = [
  {
    id: "1",
    studentId: "1",
    content: "初めてのソロフライト。緊張したが、無事に着陸できた。",
    instructorName: "田中一郎",
    createdAt: new Date("2024-03-01"),
  },
  {
    id: "2",
    studentId: "1",
    content: "2回目のソロフライト。前回より落ち着いて操縦できた。",
    instructorName: "中村花子",
    createdAt: new Date("2024-03-02"),
  },
  {
    id: "3",
    studentId: "2",
    content: "初めてのソロフライト。天候が良く、快適な飛行だった。",
    instructorName: "木村健太",
    createdAt: new Date("2024-03-01"),
  },
];
