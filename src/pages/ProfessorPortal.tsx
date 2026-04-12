import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { professorCourses, researchStudents } from "@/data/mockData";

const UploadList = ({ items, emptyLabel }: { items: { name: string; uploadedOn: string; status: string }[]; emptyLabel: string }) => (
  <div className="space-y-3">
    {items.length ? (
      items.map((item) => (
        <div key={`${item.name}-${item.uploadedOn}`} className="rounded-lg border p-3 text-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-muted-foreground">Uploaded on {item.uploadedOn}</p>
            </div>
            <Badge variant="secondary">{item.status}</Badge>
          </div>
        </div>
      ))
    ) : (
      <p className="text-sm text-muted-foreground">{emptyLabel}</p>
    )}
  </div>
);

export default function ProfessorPortal() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Professor Workspace</h1>
        <p className="text-sm text-muted-foreground">
          Single-page course management with separate sections for attendance, marks, grades, and research students.
        </p>
      </div>

      <Tabs defaultValue={professorCourses[0]?.code} className="space-y-6">
        <TabsList className="h-auto flex w-full flex-wrap justify-start gap-2 bg-transparent p-0">
          {professorCourses.map((course) => (
            <TabsTrigger key={course.id} value={course.code} className="border bg-background data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {course.code}
            </TabsTrigger>
          ))}
          <TabsTrigger value="research" className="border bg-background data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Research Students
          </TabsTrigger>
        </TabsList>

        {professorCourses.map((course) => (
          <TabsContent key={course.id} value={course.code} className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <CardTitle>{course.code} {course.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{course.semester} | Section {course.section} | {course.schedule}</p>
                  </div>
                  <Badge variant="outline">{course.students} students</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Upload Attendance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                      Signed attendance sheet upload area (dummy)
                    </div>
                    <UploadList items={course.attendanceUploads} emptyLabel="No attendance sheets uploaded yet." />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Upload Marks & Grades</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                      XLSX marks and grades upload area (dummy)
                    </div>
                    <UploadList items={course.markUploads} emptyLabel="No marksheets uploaded yet." />
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
                      <p className="text-sm text-muted-foreground">{student.scholarId} | {student.programme}</p>
                    </div>
                    <Badge>{student.year}</Badge>
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
