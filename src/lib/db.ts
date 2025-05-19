import { supabase } from "./supabase";
import { Instructor, Report, Student } from "./types";

export async function getStudents(): Promise<Student[]> {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map((student) => ({
    id: student.id,
    name: student.name,
    createdAt: new Date(student.created_at),
  }));
}

export async function getInstructors(): Promise<Instructor[]> {
  const { data, error } = await supabase.from("instructors").select("*");

  if (error) throw error;
  return data.map((instructor) => ({
    id: instructor.id,
    name: instructor.name,
  }));
}

export async function getReports(): Promise<Report[]> {
  const { data, error } = await supabase
    .from("reports")
    .select(
      `
      *,
      students (name),
      instructors (name)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map((report) => ({
    id: report.id,
    studentId: report.student_id,
    content: report.content,
    instructorName: report.instructors.name,
    createdAt: new Date(report.created_at),
  }));
}

export async function createReport(
  studentId: string,
  instructorId: string,
  content: string
): Promise<void> {
  const { error } = await supabase.from("reports").insert({
    student_id: studentId,
    instructor_id: instructorId,
    content,
  });

  if (error) throw error;
}
