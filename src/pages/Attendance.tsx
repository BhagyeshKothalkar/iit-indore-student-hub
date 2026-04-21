import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { StatusBadge, StatusTone } from "@/components/ui/status-badge";
import { attendanceData } from "@/data/mockData";

const tone = (p: number): StatusTone => (p >= 75 ? "green" : p >= 65 ? "yellow" : "red");

export default function Attendance() {
  const overall =
    (attendanceData.reduce((s, c) => s + c.attended, 0) /
      attendanceData.reduce((s, c) => s + c.total, 0)) *
    100;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <StatusBadge tone={tone(overall)} size={26}>
          Overall: {overall.toFixed(1)}%
        </StatusBadge>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="hidden sm:table-cell">Attended</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead className="w-40 hidden md:table-cell">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((c) => (
                <TableRow key={c.code}>
                  <TableCell className="font-mono text-xs">{c.code}</TableCell>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {c.attended}/{c.total}
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={tone(c.percentage)}>{c.percentage.toFixed(1)}%</StatusBadge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Progress value={c.percentage} className="h-2" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5">
          <StatusBadge tone="green" size={14}>&nbsp;</StatusBadge> ≥75% Eligible
        </span>
        <span className="inline-flex items-center gap-1.5">
          <StatusBadge tone="yellow" size={14}>&nbsp;</StatusBadge> 65–75% Warning
        </span>
        <span className="inline-flex items-center gap-1.5">
          <StatusBadge tone="red" size={14}>&nbsp;</StatusBadge> &lt;65% Short
        </span>
      </div>
    </div>
  );
}
