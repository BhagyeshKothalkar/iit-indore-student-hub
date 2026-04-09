import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { studentProfile } from "@/data/mockData";
import {
  User, BookOpen, ClipboardList, ScrollText,
  CalendarCheck, CreditCard, FileUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const quickLinks = [
  { title: "Profile", url: "/profile", icon: User, desc: "View & edit your info" },
  { title: "Registration", url: "/registration", icon: BookOpen, desc: "Register for courses" },
  { title: "Results", url: "/results", icon: ClipboardList, desc: "View semester results" },
  { title: "Gradesheets", url: "/gradesheets", icon: ScrollText, desc: "Download gradesheets" },
  { title: "Attendance", url: "/attendance", icon: CalendarCheck, desc: "Track attendance" },
  { title: "Fee Payment", url: "/fees", icon: CreditCard, desc: "Pay & view fees" },
  { title: "Documents", url: "/documents", icon: FileUp, desc: "Upload documents" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-5xl">
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0">
            {studentProfile.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">Welcome, {studentProfile.name}</h1>
            <p className="text-sm text-muted-foreground">{studentProfile.department} · {studentProfile.programme}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">Semester {studentProfile.semester}</Badge>
              <Badge variant="secondary">CGPA: {studentProfile.cgpa}</Badge>
              <Badge variant="outline">{studentProfile.rollNo}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {quickLinks.map(link => (
          <Link to={link.url} key={link.url}>
            <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer h-full">
              <CardContent className="p-5 flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <link.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">{link.title}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{link.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
