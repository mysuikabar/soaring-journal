"use client";

import { Button } from "@/components/ui/button";
import {
  createInstructor,
  createStudent,
  deleteInstructor,
  deleteStudent,
  getInstructors,
  getStudents,
} from "@/lib/db";
import { Instructor, Student } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [newStudentName, setNewStudentName] = useState("");
  const [newInstructorName, setNewInstructorName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

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

  async function handleCreateStudent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newStudentName) return;
    try {
      await createStudent(newStudentName);
      setNewStudentName("");
      await loadData();
    } catch (error) {
      console.error("練習生の追加に失敗しました:", error);
    }
  }

  async function handleDeleteStudent(id: string) {
    if (!confirm("この練習生を削除してもよろしいですか？")) return;
    try {
      await deleteStudent(id);
      await loadData();
    } catch (error) {
      console.error("練習生の削除に失敗しました:", error);
    }
  }

  async function handleCreateInstructor(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newInstructorName) return;
    try {
      await createInstructor(newInstructorName);
      setNewInstructorName("");
      await loadData();
    } catch (error) {
      console.error("教官の追加に失敗しました:", error);
    }
  }

  async function handleDeleteInstructor(id: string) {
    if (!confirm("この教官を削除してもよろしいですか？")) return;
    try {
      await deleteInstructor(id);
      await loadData();
    } catch (error) {
      console.error("教官の削除に失敗しました:", error);
    }
  }

  if (isLoading) {
    return (
      <main className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-8">管理</h1>
        <p>読み込み中...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">管理</h1>

      <div className="grid gap-8 md:grid-cols-2">
        {/* 練習生管理 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">練習生管理</h2>
          <form onSubmit={handleCreateStudent} className="flex gap-2">
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="練習生の名前"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <Button type="submit" disabled={!newStudentName}>
              追加
            </Button>
          </form>
          <div className="space-y-2">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{student.name}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  削除
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* 教官管理 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">教官管理</h2>
          <form onSubmit={handleCreateInstructor} className="flex gap-2">
            <input
              type="text"
              value={newInstructorName}
              onChange={(e) => setNewInstructorName(e.target.value)}
              placeholder="教官の名前"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <Button type="submit" disabled={!newInstructorName}>
              追加
            </Button>
          </form>
          <div className="space-y-2">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <p className="font-medium">{instructor.name}</p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteInstructor(instructor.id)}
                >
                  削除
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
