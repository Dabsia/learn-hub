import React, { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { Button } from "../components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import CourseCard from "../components/shared/CourseCard";
import ui from "../assets/ui.jpg";
import react from "../assets/react.jpg";
import typescript from "../assets/typescript.jpg";

const tabs = [
  { value: "all", label: "All" },
  { value: "active", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

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
    description: "Learn React from scratch with hands-on projects.",
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
    description: "Master TypeScript for large-scale applications.",
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
    description: "Design beautiful and usable interfaces.",
  },
];

const dummyEnrollments = [
  {
    id: "e1",
    course_id: "1",
    progress: 65,
    status: "active",
    completed_lessons: ["l1", "l2", "l3"],
    last_accessed: "2024-03-10T10:00:00Z",
  },
  {
    id: "e2",
    course_id: "2",
    progress: 100,
    status: "completed",
    completed_lessons: ["l4", "l5"],
    last_accessed: "2024-03-08T10:00:00Z",
  },
  {
    id: "e3",
    course_id: "3",
    progress: 30,
    status: "active",
    completed_lessons: ["l6"],
    last_accessed: "2024-03-09T10:00:00Z",
  },
];

export default function MyLearning() {
  const { user } = useAuth();
  const [tab, setTab] = useState("all");

  const filtered = dummyEnrollments.filter((e) => {
    if (tab === "all") return true;
    return e.status === tab;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          My Learning
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your enrolled courses and progress
        </p>
      </div>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <Button
            key={t.value}
            variant={tab === t.value ? "default" : "outline"}
            size="sm"
            onClick={() => setTab(t.value)}
            className="rounded-xl"
          >
            {t.label}
          </Button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((enrollment) => {
            const course = dummyCourses.find(
              (c) => c.id === enrollment.course_id
            );
            if (!course) return null;
            return (
              <CourseCard
                key={enrollment.id}
                course={course}
                enrollment={enrollment}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border p-16 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground mt-4">
            {tab === "all" ? "No enrolled courses yet" : `No ${tab} courses`}
          </p>
          <Link to="/courses">
            <Button variant="outline" className="mt-4 rounded-xl">
              Browse Courses
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
