import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.webp" alt="IIT Indore" className="h-20 w-20 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Indian Institute of Technology Indore</h1>
              <p className="text-sm text-muted-foreground mt-1">Student Information System</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input id="studentId" placeholder="e.g. CSE2021045" value={studentId} onChange={e => setStudentId(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full gap-2">
              <GraduationCap className="h-4 w-4" />
              Sign In
            </Button>
            <p className="text-xs text-center text-muted-foreground">Use any credentials to proceed (demo mode)</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
