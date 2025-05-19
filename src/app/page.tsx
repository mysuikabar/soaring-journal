"use client";

import { ReportForm } from "@/components/reports/report-form";
import { instructors, reports, students } from "@/data/mock-data";
import { Report } from "@/lib/types";
import { useState } from "react";

export default function Home() {
  const [currentReports, setCurrentReports] = useState<Report[]>(reports);

  const handleSubmit = (
    studentId: string,
    content: string,
    instructorName: string
  ) => {
    const newReport: Report = {
      id: String(Date.now()),
      studentId,
      content,
      instructorName,
      createdAt: new Date(),
    };
    setCurrentReports([newReport, ...currentReports]);
  };

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
