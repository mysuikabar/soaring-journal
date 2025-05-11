import { reports, students } from "@/data/mock-data";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StudentReportsPage({ params }: Props) {
  const { id } = await params;
  const student = students.find((s) => s.id === id);
  const studentReports = reports
    .filter((r) => r.studentId === id)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

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
      <h1 className="text-2xl font-bold mb-8">{student.name}の練習日誌</h1>
      <div className="space-y-4">
        {studentReports.map((report) => (
          <div key={report.id} className="p-4 border rounded-lg">
            <p className="whitespace-pre-wrap">{report.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              {report.createdAt.toLocaleDateString()}
            </p>
          </div>
        ))}
        {studentReports.length === 0 && (
          <p className="text-gray-500">まだ日報がありません</p>
        )}
      </div>
    </main>
  );
}
