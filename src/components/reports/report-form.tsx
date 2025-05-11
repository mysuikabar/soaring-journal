"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Student } from "@/lib/types";
import { useState } from "react";

type ReportFormProps = {
  students: Student[];
  onSubmit: (studentId: string, content: string) => void;
};

export function ReportForm({ students, onSubmit }: ReportFormProps) {
  const [studentId, setStudentId] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentId || !content) return;
    onSubmit(studentId, content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">練習生</label>
        <Select value={studentId} onValueChange={setStudentId}>
          <SelectTrigger>
            <SelectValue placeholder="練習生を選択" />
          </SelectTrigger>
          <SelectContent>
            {students.map((student) => (
              <SelectItem key={student.id} value={student.id}>
                {student.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">日報内容</label>
        <Textarea
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          placeholder="練習内容や感想を記入してください"
          rows={3}
        />
      </div>

      <Button type="submit" disabled={!studentId || !content}>
        記録する
      </Button>
    </form>
  );
}
