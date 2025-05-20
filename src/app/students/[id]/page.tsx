"use client";

import { ReportActions } from "@/components/reports/report-actions";
import { getInstructors, getReports, getStudents } from "@/lib/db";
import { Instructor, Report, Student } from "@/lib/types";
import Link from "next/link";
import { use, useEffect, useState } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function StudentReportsPage({ params }: Props) {
  const { id } = use(params);
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

  const handleUpdate = async () => {
    try {
      const updatedReports = await getReports();
      setReports(updatedReports);
    } catch (error) {
      console.error("日報の更新に失敗しました:", error);
    }
  };

  const student = students.find((s) => s.id === id);
  const studentReports = reports
    .filter((r) => r.studentId === id)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  if (isLoading) {
    return (
      <main className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-8">読み込み中...</h1>
      </main>
    );
  }

  if (!student) {
    return (
      <main className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-8">練習生が見つかりません</h1>
        <Link href="/students" className="text-blue-500 hover:underline">
          練習生一覧に戻る
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8">
        <Link href="/students" className="text-blue-500 hover:underline">
          ← 練習生一覧に戻る
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-8">{student.name}</h1>
      <div className="space-y-4">
        {studentReports.map((report) => (
          <div key={report.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <p className="whitespace-pre-wrap">{report.content}</p>
              <ReportActions
                report={report}
                students={students}
                instructors={instructors}
                onUpdate={handleUpdate}
              />
            </div>
            <div className="text-sm text-gray-500 mt-2">
              <p>教官: {report.instructorName}</p>
              <p>{report.createdAt.toLocaleDateString()}</p>
            </div>
          </div>
        ))}
        {studentReports.length === 0 && (
          <p className="text-gray-500">日報がありません</p>
        )}
      </div>
    </main>
  );
}
