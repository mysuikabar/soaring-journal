"use client";

import { ReportForm } from "@/components/reports/report-form";
import {
  createReport,
  getInstructors,
  getReports,
  getStudents,
} from "@/lib/db";
import { Instructor, Report, Student } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [studentsData, instructorsData, reportsData] = await Promise.all([
          getStudents(),
          getInstructors(),
          getReports(),
        ]);
        setStudents(studentsData);
        setInstructors(instructorsData);
        setReports(reportsData);
      } catch (error) {
        console.error("データの読み込みに失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (
    studentId: string,
    content: string,
    instructorId: string
  ) => {
    try {
      await createReport(studentId, instructorId, content);
      const updatedReports = await getReports();
      setReports(updatedReports);
    } catch (error) {
      console.error("日報の作成に失敗しました:", error);
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-8">グライダー練習日誌</h1>
        <p>読み込み中...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">グライダー練習日誌</h1>
      <div className="max-w-2xl">
        <ReportForm
          students={students}
          instructors={instructors}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
