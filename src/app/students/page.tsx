import { getStudents } from "@/lib/db";
import Link from "next/link";

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <main className="container mx-auto py-8">
      <div className="grid gap-4">
        {students.map((student) => (
          <Link
            key={student.id}
            href={`/students/${student.id}`}
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <h2 className="text-lg font-medium">{student.name}</h2>
            <p className="text-sm text-gray-500">
              登録日: {student.createdAt.toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
