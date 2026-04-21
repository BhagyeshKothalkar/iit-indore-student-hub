import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "@/hooks/use-toast";

// Dummy Google OAuth web client ID (placeholder — replace with a real one when wiring up real auth)
const GOOGLE_WEB_CLIENT_ID =
  "000000000000-dummyiitindoresisdemo.apps.googleusercontent.com";
const GOOGLE_SCOPES = ["openid", "email"] as const;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate("/dashboard");
  };

  const handleGoogle = () => {
    // Demo-mode simulated Google sign-in. In production this would call the
    // Google Identity Services SDK with client_id=GOOGLE_WEB_CLIENT_ID and
    // scope=GOOGLE_SCOPES.join(" ").
    toast({
      title: "Signing in with Google",
      description: `Demo • scopes: ${GOOGLE_SCOPES.join(", ")}`,
    });
    setTimeout(() => {
      login(role);
      navigate("/dashboard");
    }, 400);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>
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
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="userId">{role === "student" ? "Student ID" : "Employee ID"}</Label>
              <Input
                id="userId"
                placeholder={role === "student" ? "e.g. CSE2021045" : "e.g. FAC-CSE-017"}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full gap-2">
              <GraduationCap className="h-4 w-4" />
              Sign In
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full bg-muted h-px" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 bg-card"
              onClick={handleGoogle}
              aria-label="Sign in with Google"
            >
              <GoogleIcon />
              Sign in with Google
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Use any credentials to proceed in demo mode and switch roles with the dropdown.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.7 13-4.6l-6-5c-2 1.4-4.4 2.1-7 2.1-5.2 0-9.6-3.1-11.3-7.5l-6.5 5C9.6 39.1 16.3 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6 5C40.9 35.6 43.5 30.3 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}
