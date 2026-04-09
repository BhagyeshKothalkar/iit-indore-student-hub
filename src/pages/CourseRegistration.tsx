import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableCourses, registeredCourseIds, Course } from "@/data/mockData";
import { Plus, Minus, Search } from "lucide-react";

export default function CourseRegistration() {
  const [registered, setRegistered] = useState<Set<string>>(new Set(registeredCourseIds));
  const [search, setSearch] = useState("");
  const [semFilter, setSemFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");

  const filtered = useMemo(() => {
    return availableCourses.filter(c => {
      if (search && !`${c.code} ${c.name} ${c.instructor}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (semFilter !== "all" && c.semester !== Number(semFilter)) return false;
      if (deptFilter !== "all" && c.department !== deptFilter) return false;
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      if (modeFilter !== "all" && c.mode !== modeFilter) return false;
      return true;
    });
  }, [search, semFilter, deptFilter, typeFilter, modeFilter]);

  const regCourses = availableCourses.filter(c => registered.has(c.id));
  const totalCredits = regCourses.reduce((s, c) => s + (c.mode === "audit" ? 0 : c.credits), 0);

  const toggle = (id: string) => {
    setRegistered(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Course Registration</h1>

      {/* Registered summary */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span>Registered Courses</span>
            <Badge>{totalCredits} credits</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {regCourses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No courses registered yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {regCourses.map(c => (
                <Badge key={c.id} variant="secondary" className="gap-1 text-xs">
                  {c.code} – {c.name} ({c.mode === "audit" ? "Audit" : `${c.credits}cr`})
                  <button onClick={() => toggle(c.id)} className="ml-1 hover:text-destructive"><Minus className="h-3 w-3" /></button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search courses…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
              </div>
            </div>
            <Select value={semFilter} onValueChange={setSemFilter}>
              <SelectTrigger className="w-[130px]"><SelectValue placeholder="Semester" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="6">Sem 6</SelectItem>
                <SelectItem value="7">Sem 7</SelectItem>
              </SelectContent>
            </Select>
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="w-[110px]"><SelectValue placeholder="Dept" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Depts</SelectItem>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="EE">EE</SelectItem>
                <SelectItem value="MATH">MATH</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[110px]"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="core">Core</SelectItem>
                <SelectItem value="elective">Elective</SelectItem>
                <SelectItem value="lab">Lab</SelectItem>
              </SelectContent>
            </Select>
            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger className="w-[120px]"><SelectValue placeholder="Mode" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="graded">Graded</SelectItem>
                <SelectItem value="audit">Audit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Available courses table */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Available Courses ({filtered.length})</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="hidden md:table-cell">Instructor</TableHead>
                <TableHead className="hidden lg:table-cell">Schedule</TableHead>
                <TableHead>Cr</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead className="hidden sm:table-cell">Seats</TableHead>
                <TableHead className="w-20">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(c => {
                const isReg = registered.has(c.id);
                return (
                  <TableRow key={c.id} className={isReg ? "bg-primary/5" : ""}>
                    <TableCell className="font-mono text-xs">{c.code}</TableCell>
                    <TableCell className="font-medium text-sm">{c.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{c.instructor}</TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">{c.schedule}</TableCell>
                    <TableCell>{c.credits}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{c.type}</Badge></TableCell>
                    <TableCell>
                      <Badge variant={c.mode === "audit" ? "secondary" : "default"} className="text-[10px]">
                        {c.mode}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs">{c.registered}/{c.seats}</TableCell>
                    <TableCell>
                      <Button size="sm" variant={isReg ? "destructive" : "default"} className="h-7 text-xs" onClick={() => toggle(c.id)}>
                        {isReg ? <><Minus className="h-3 w-3" /> Drop</> : <><Plus className="h-3 w-3" /> Add</>}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
