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

export async function createStudent(name: string): Promise<void> {
  const { error } = await supabase.from("students").insert({ name });
  if (error) throw error;
}

export async function getStudentReports(studentId: string): Promise<Report[]> {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("student_id", studentId);

  if (error) throw error;
  return data;
}

export async function getInstructorReports(
  instructorId: string
): Promise<Report[]> {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("instructor_id", instructorId);

  if (error) throw error;
  return data;
}

export async function deleteStudent(id: string): Promise<void> {
  const reports = await getStudentReports(id);
  if (reports.length > 0) {
    throw new Error(
      `この練習生には${reports.length}件の日報が存在するため削除できません。`
    );
  }
  const { error } = await supabase.from("students").delete().eq("id", id);
  if (error) throw error;
}

export async function createInstructor(name: string): Promise<void> {
  const { error } = await supabase.from("instructors").insert({ name });
  if (error) throw error;
}

export async function deleteInstructor(id: string): Promise<void> {
  const reports = await getInstructorReports(id);
  if (reports.length > 0) {
    throw new Error(
      `この教官には${reports.length}件の日報が存在するため削除できません。`
    );
  }
  const { error } = await supabase.from("instructors").delete().eq("id", id);
  if (error) throw error;
}

export async function updateReport(
  id: string,
  studentId: string,
  instructorId: string,
  content: string
): Promise<void> {
  const { error } = await supabase
    .from("reports")
    .update({
      student_id: studentId,
      instructor_id: instructorId,
      content,
      created_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteReport(id: string): Promise<void> {
  const { error } = await supabase.from("reports").delete().eq("id", id);
  if (error) throw error;
}
