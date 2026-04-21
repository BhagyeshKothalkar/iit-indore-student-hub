import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { professorCourses, researchStudents } from "@/data/mockData";
import { Upload, FileText, FileSpreadsheet, CheckCircle2, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UploadItem {
  name: string;
  uploadedOn: string;
  status: string;
}

const todayLabel = () =>
  new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

function statusTone(status: string): "green" | "yellow" | "white" {
  const s = status.toLowerCase();
  if (s.includes("verified") || s.includes("published")) return "green";
  if (s.includes("pending") || s.includes("review")) return "yellow";
  return "white";
}

function StatusPill({ status }: { status: string }) {
  const tone = statusTone(status);
  const Icon = tone === "green" ? CheckCircle2 : Clock;
  return (
    <StatusBadge tone={tone}>
      <Icon className="h-3 w-3 mr-1" />
      {status}
    </StatusBadge>
  );
}

function UploadList({ items, emptyLabel }: { items: UploadItem[]; emptyLabel: string }) {
  if (!items.length) return <p className="text-sm text-muted-foreground">{emptyLabel}</p>;
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={`${item.name}-${item.uploadedOn}`}
          className="flex flex-col gap-2 rounded-md bg-muted/60 p-3 text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <p className="font-medium truncate">{item.name}</p>
            <p className="text-xs text-muted-foreground">Uploaded on {item.uploadedOn}</p>
          </div>
          <StatusPill status={item.status} />
        </div>
      ))}
    </div>
  );
}

interface DropzoneProps {
  label: string;
  hint: string;
  accept: string;
  icon: React.ReactNode;
  onFiles: (files: File[]) => void;
}

function Dropzone({ label, hint, accept, icon, onFiles }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    onFiles(Array.from(list));
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`group w-full cursor-pointer rounded-lg p-6 text-center transition-colors ${
        dragging ? "bg-accent" : "bg-muted/50 hover:bg-accent/60"
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background text-muted-foreground">
        {icon}
      </div>
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      <Button
        type="button"
        size="sm"
        variant="default"
        className="mt-4 gap-1.5"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        <Upload className="h-3.5 w-3.5" /> Choose file
      </Button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

interface CourseUploads {
  attendance: UploadItem[];
  marks: UploadItem[];
}

export default function ProfessorPortal() {
  const [uploads, setUploads] = useState<Record<string, CourseUploads>>(() => {
    const init: Record<string, CourseUploads> = {};
    for (const c of professorCourses) {
      init[c.id] = { attendance: [...c.attendanceUploads], marks: [...c.markUploads] };
    }
    return init;
  });

  const addFiles = (courseId: string, kind: "attendance" | "marks", files: File[]) => {
    setUploads((prev) => {
      const next = { ...prev };
      const list = [
        ...files.map<UploadItem>((f) => ({
          name: f.name,
          uploadedOn: todayLabel(),
          status: kind === "attendance" ? "Pending Review" : "Draft",
        })),
        ...next[courseId][kind],
      ];
      next[courseId] = { ...next[courseId], [kind]: list };
      return next;
    });
    toast({
      title: kind === "attendance" ? "Attendance uploaded" : "Marks uploaded",
      description: `${files.length} file${files.length > 1 ? "s" : ""} added.`,
    });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Teaching</h1>
        <p className="text-sm text-muted-foreground">
          Manage attendance, marks, and research students for the courses you teach.
        </p>
      </div>

      <Tabs defaultValue={professorCourses[0]?.code} className="space-y-6">
        <TabsList className="h-auto flex w-full flex-wrap justify-start gap-2 bg-transparent p-0">
          {professorCourses.map((course) => (
            <TabsTrigger
              key={course.id}
              value={course.code}
              className="bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {course.code}
            </TabsTrigger>
          ))}
          <TabsTrigger
            value="research"
            className="bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Research Students
          </TabsTrigger>
        </TabsList>

        {professorCourses.map((course) => (
          <TabsContent key={course.id} value={course.code} className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <CardTitle>
                      {course.code} {course.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {course.semester} | Section {course.section} | {course.schedule}
                    </p>
                  </div>
                  <StatusBadge tone="white">{course.students} students</StatusBadge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Upload Attendance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Dropzone
                      label="Drop signed attendance sheet here"
                      hint="PDF / scanned image • drag & drop or click to browse"
                      accept="application/pdf,image/*"
                      icon={<FileText className="h-5 w-5" />}
                      onFiles={(files) => addFiles(course.id, "attendance", files)}
                    />
                    <UploadList
                      items={uploads[course.id].attendance}
                      emptyLabel="No attendance sheets uploaded yet."
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Upload Marks & Grades</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Dropzone
                      label="Drop XLSX marks sheet here"
                      hint="Excel / CSV • drag & drop or click to browse"
                      accept=".xlsx,.xls,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      icon={<FileSpreadsheet className="h-5 w-5" />}
                      onFiles={(files) => addFiles(course.id, "marks", files)}
                    />
                    <UploadList items={uploads[course.id].marks} emptyLabel="No marksheets uploaded yet." />
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="research">
          <div className="grid gap-4 lg:grid-cols-2">
            {researchStudents.map((student) => (
              <Card key={student.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-base">{student.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {student.scholarId} | {student.programme}
                      </p>
                    </div>
                    <StatusBadge tone="white">{student.year}</StatusBadge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><span className="font-medium">Email:</span> {student.email}</p>
                  <p><span className="font-medium">Phone:</span> {student.phone}</p>
                  <p><span className="font-medium">Research Topic:</span> {student.topic}</p>
                  <p><span className="font-medium">Domain:</span> {student.domain}</p>
                  <p><span className="font-medium">Status:</span> {student.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
