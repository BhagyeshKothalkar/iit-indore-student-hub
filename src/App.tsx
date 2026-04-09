import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound";

const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./components/AppLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const CourseRegistration = lazy(() => import("./pages/CourseRegistration"));
const Results = lazy(() => import("./pages/Results"));
const Gradesheets = lazy(() => import("./pages/Gradesheets"));
const Attendance = lazy(() => import("./pages/Attendance"));
const FeePayment = lazy(() => import("./pages/FeePayment"));
const Documents = lazy(() => import("./pages/Documents"));

const queryClient = new QueryClient();

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/registration" element={<CourseRegistration />} />
              <Route path="/results" element={<Results />} />
              <Route path="/gradesheets" element={<Gradesheets />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/fees" element={<FeePayment />} />
              <Route path="/documents" element={<Documents />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
