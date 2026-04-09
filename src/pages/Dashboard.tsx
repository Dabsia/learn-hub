import React from "react";
import { useAuth } from "../lib/AuthContext";
import { BookOpen, GraduationCap, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/shared/StatCard";
import CourseCard from "../components/shared/CourseCard";
import ActivityItem from "../components/shared/ActivityItem";
import ui from "../assets/ui.jpg";
import react from "../assets/react.jpg";
import typescript from "../assets/typescript.jpg";

const dummyCourses = [
  {
    id: "1",
    title: "React for Beginners",
    instructor_name: "Jane Smith",
    duration_hours: 10,
    thumbnail: react,
    level: "beginner",
    category: "development",
    rating: 4.8,
    students_count: 1200,
  },
  {
    id: "2",
    title: "Advanced TypeScript",
    instructor_name: "John Doe",
    duration_hours: 8,
    thumbnail: typescript,
    level: "advanced",
    category: "development",
    rating: 4.6,
    students_count: 850,
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    instructor_name: "Sara Lee",
    duration_hours: 6,
    thumbnail: ui,
    level: "intermediate",
    category: "design",
    rating: 4.7,
    students_count: 640,
  },
];

const dummyEnrollments = [
  {
    id: "e1",
    course_id: "1",
    user_email: "user@example.com",
    progress: 65,
    status: "active",
    completed_lessons: ["l1", "l2", "l3"],
    last_accessed: "2024-03-10T10:00:00Z",
    created_date: "2024-02-01T10:00:00Z",
  },
  {
    id: "e2",
    course_id: "2",
    user_email: "user@example.com",
    progress: 100,
    status: "completed",
    completed_lessons: ["l4", "l5"],
    last_accessed: "2024-03-08T10:00:00Z",
    created_date: "2024-01-15T10:00:00Z",
  },
  {
    id: "e3",
    course_id: "3",
    user_email: "user@example.com",
    progress: 30,
    status: "active",
    completed_lessons: ["l6"],
    last_accessed: "2024-03-09T10:00:00Z",
    created_date: "2024-02-20T10:00:00Z",
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const enrollments = dummyEnrollments;
  const courses = dummyCourses;

  const enrolledCourses = courses.filter((c) =>
    enrollments.some((e) => e.course_id === c.id)
  );
  const activeCourses = enrollments.filter((e) => e.status === "active");
  const completedCount = enrollments.filter(
    (e) => e.status === "completed"
  ).length;
  const avgProgress =
    activeCourses.length > 0
      ? Math.round(
          activeCourses.reduce((sum, e) => sum + (e.progress || 0), 0) /
            activeCourses.length
        )
      : 0;
  const totalHours = enrolledCourses.reduce(
    (sum, c) => sum + (c.duration_hours || 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome back, {user?.full_name?.split(" ")[0] || "Learner"}
        </h1>
        <p className="text-muted-foreground mt-1">
          Continue where you left off
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Enrolled Courses"
          value={enrollments.length}
          icon={BookOpen}
        />
        <StatCard
          title="Completed"
          value={completedCount}
          icon={GraduationCap}
          iconColor="bg-green-100 text-green-600"
        />
        <StatCard
          title="Avg. Progress"
          value={`${avgProgress}%`}
          icon={TrendingUp}
          iconColor="bg-amber-100 text-amber-600"
        />
        <StatCard
          title="Learning Hours"
          value={totalHours}
          subtitle="total hours"
          icon={Clock}
          iconColor="bg-blue-100 text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Continue Learning
            </h2>
            <Link
              to="/my-learning"
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {enrolledCourses.slice(0, 4).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                enrollment={enrollments.find((e) => e.course_id === course.id)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Activity
          </h2>
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="divide-y divide-border">
              {enrollments.slice(0, 5).map((enrollment) => {
                const course = courses.find(
                  (c) => c.id === enrollment.course_id
                );
                return (
                  <ActivityItem
                    key={enrollment.id}
                    type={
                      enrollment.status === "completed"
                        ? "completed"
                        : "enrolled"
                    }
                    title={course?.title || "Unknown Course"}
                    subtitle={`${Math.round(
                      enrollment.progress || 0
                    )}% complete`}
                    date={enrollment.last_accessed || enrollment.created_date}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
