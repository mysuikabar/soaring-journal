"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteReport, updateReport } from "@/lib/db";
import { Instructor, Report, Student } from "@/lib/types";
import { useState } from "react";
import { ReportForm } from "./report-form";

type ReportActionsProps = {
  report: Report;
  students: Student[];
  instructors: Instructor[];
  onUpdate: () => void;
};

export function ReportActions({
  report,
  students,
  instructors,
  onUpdate,
}: ReportActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = async (
    studentId: string,
    instructorId: string,
    content: string
  ) => {
    try {
      await updateReport(report.id, studentId, instructorId, content);
      setIsEditDialogOpen(false);
      onUpdate();
    } catch (error) {
      console.error("日報の更新に失敗しました:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("この日報を削除してもよろしいですか？")) return;

    try {
      setIsDeleting(true);
      await deleteReport(report.id);
      onUpdate();
    } catch (error) {
      console.error("日報の削除に失敗しました:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            編集
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>日報を編集</DialogTitle>
          </DialogHeader>
          <ReportForm
            students={students}
            instructors={instructors}
            onSubmit={handleEdit}
            initialValues={{
              studentId: report.studentId,
              content: report.content,
              instructorId:
                instructors.find((i) => i.name === report.instructorName)?.id ||
                "",
            }}
          />
        </DialogContent>
      </Dialog>

      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "削除中..." : "削除"}
      </Button>
    </div>
  );
}
