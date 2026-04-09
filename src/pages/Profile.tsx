import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { studentProfile } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const Field = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

export default function Profile() {
  const s = studentProfile;
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Student Profile</h1>

      <Card>
        <CardContent className="p-6 flex flex-col sm:flex-row gap-6">
          <div className="h-24 w-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold flex-shrink-0 mx-auto sm:mx-0">
            {s.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-bold">{s.name}</h2>
            <p className="text-sm text-muted-foreground">{s.rollNo}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
              <Badge>{s.programme}</Badge>
              <Badge variant="secondary">{s.department}</Badge>
              <Badge variant="outline">Batch {s.batch}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Academic Info</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Field label="Programme" value={s.programme} />
            <Field label="Department" value={s.department} />
            <Field label="Semester" value={s.semester} />
            <Field label="CGPA" value={s.cgpa} />
            <Field label="Batch" value={s.batch} />
            <Field label="Email" value={s.email} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Personal Info</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Field label="Date of Birth" value={s.dob} />
            <Field label="Blood Group" value={s.bloodGroup} />
            <Field label="Phone" value={s.phone} />
            <Field label="Guardian" value={s.guardian} />
            <Field label="Guardian Phone" value={s.guardianPhone} />
            <Field label="Address" value={s.address} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
