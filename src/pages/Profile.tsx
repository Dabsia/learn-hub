import React from "react";
import { useAuth } from "../lib/AuthContext";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Mail, Calendar, BookOpen, Award, LogOut } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import ui from "../assets/ui.jpg";
import react from "../assets/react.jpg";
import typescript from "../assets/typescript.jpg";

const dummyCourses = [
  {
    id: "1",
    title: "React for Beginners",
    instructor_name: "Jane Smith",
    thumbnail: react,
  },
  {
    id: "2",
    title: "Advanced TypeScript",
    instructor_name: "John Doe",
    thumbnail: typescript,
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    instructor_name: "Sara Lee",
    thumbnail: ui,
  },
];

const dummyEnrollments = [
  { id: "e1", course_id: "1", progress: 65, status: "active" },
  { id: "e2", course_id: "2", progress: 100, status: "completed" },
  { id: "e3", course_id: "3", progress: 30, status: "active" },
];

export default function Profile() {
  const { user } = useAuth();

  const enrollments = dummyEnrollments;
  const courses = dummyCourses;

  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const completedCount = enrollments.filter(
    (e) => e.status === "completed"
  ).length;
  const activeCount = enrollments.filter((e) => e.status === "active").length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Card */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-accent" />
        <div className="px-6 sm:px-8 pb-8 -mt-12">
          <Avatar className="w-24 h-24  ring-4 ring-card shadow-lg">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {user?.full_name || "User"}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {user?.email || "user@example.com"}
                </span>
                {user?.created_date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Joined {format(new Date(user.created_date), "MMM yyyy")}
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={() => console.log("Logged Out")}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl border border-border p-6 text-center">
          <BookOpen className="w-6 h-6 text-primary mx-auto" />
          <p className="text-2xl font-bold text-foreground mt-2">
            {enrollments.length}
          </p>
          <p className="text-sm text-muted-foreground">Enrolled</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-6 text-center">
          <Award className="w-6 h-6 text-green-500 mx-auto" />
          <p className="text-2xl font-bold text-foreground mt-2">
            {completedCount}
          </p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-6 text-center">
          <BookOpen className="w-6 h-6 text-amber-500 mx-auto" />
          <p className="text-2xl font-bold text-foreground mt-2">
            {activeCount}
          </p>
          <p className="text-sm text-muted-foreground">In Progress</p>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">My Courses</h2>
        {enrollments.length > 0 ? (
          <div className="space-y-3">
            {enrollments.map((enrollment) => {
              const course = courses.find((c) => c.id === enrollment.course_id);
              if (!course) return null;
              return (
                <Link
                  key={enrollment.id}
                  to={`/courses/${course.id}`}
                  className="flex items-center gap-4 bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow group"
                >
                  <div className="w-16 h-16 rounded-xl bg-secondary overflow-hidden flex-shrink-0">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary/30">
                          {course.title?.[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {course.instructor_name}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <Progress
                        value={enrollment.progress || 0}
                        className="flex-1 h-1.5"
                      />
                      <span className="text-xs font-medium text-muted-foreground">
                        {Math.round(enrollment.progress || 0)}%
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border p-12 text-center">
            <p className="text-muted-foreground">No courses enrolled yet</p>
            <Link to="/courses">
              <Button variant="outline" className="mt-4 rounded-xl">
                Browse Courses
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
