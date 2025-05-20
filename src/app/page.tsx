"use client";

import { ReportForm } from "@/components/reports/report-form";
import { createReport, getInstructors, getStudents } from "@/lib/db";
import { Instructor, Student } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [studentsData, instructorsData] = await Promise.all([
          getStudents(),
          getInstructors(),
        ]);
        setStudents(studentsData);
        setInstructors(instructorsData);
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
    instructorId: string,
    content: string
  ) => {
    try {
      await createReport(studentId, instructorId, content);
    } catch (error) {
      console.error("日報の作成に失敗しました:", error);
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto py-8">
        <p>読み込み中...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8">
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
