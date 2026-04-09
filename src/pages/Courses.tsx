import React, { useState, useMemo } from "react";
import { useAuth } from "../lib/AuthContext";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import CourseCard from "../components/shared/CourseCard";
import business from "../assets/business.jpg";
import ui from "../assets/ui.jpg";
import typescript from "../assets/typescript.jpg";
import data from "../assets/data-science.jpg";
import react from "../assets/react.jpg";
import marketing from "../assets/marketing.jpg";

const categories = [
  { value: "all", label: "All" },
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "business", label: "Business" },
  { value: "marketing", label: "Marketing" },
  { value: "data_science", label: "Data Science" },
  { value: "photography", label: "Photography" },
];

const levels = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
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
  {
    id: "4",
    title: "Digital Marketing 101",
    instructor_name: "Mike Johnson",
    duration_hours: 5,
    thumbnail: marketing,
    level: "beginner",
    category: "marketing",
    rating: 4.5,
    students_count: 980,
    description: "Grow your brand with modern marketing strategies.",
  },
  {
    id: "5",
    title: "Data Science with Python",
    instructor_name: "Emily Chen",
    duration_hours: 12,
    thumbnail: data,
    level: "intermediate",
    category: "data_science",
    rating: 4.9,
    students_count: 1500,
    description: "Analyze data and build ML models with Python.",
  },
  {
    id: "6",
    title: "Business Strategy",
    instructor_name: "Robert Kim",
    duration_hours: 7,
    thumbnail: business,
    level: "advanced",
    category: "business",
    rating: 4.4,
    students_count: 430,
    description: "Build and execute winning business strategies.",
  },
];

const dummyEnrollments = [
  { id: "e1", course_id: "1", progress: 65, status: "active" },
  { id: "e2", course_id: "3", progress: 100, status: "completed" },
];

export default function Courses() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");

  const filtered = useMemo(() => {
    return dummyCourses.filter((c) => {
      const matchSearch =
        !search ||
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor_name?.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || c.category === category;
      const matchLevel = level === "all" || c.level === level;
      return matchSearch && matchCategory && matchLevel;
    });
  }, [search, category, level]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Explore Courses
        </h1>
        <p className="text-muted-foreground mt-1">
          Discover new skills and advance your career
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by title or instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 bg-card border-border rounded-2xl text-base"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button
              key={c.value}
              variant={category === c.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(c.value)}
              className="rounded-xl"
            >
              {c.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="flex gap-2">
            {levels.map((l) => (
              <Button
                key={l.value}
                variant={level === l.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLevel(l.value)}
                className="rounded-xl text-xs whitespace-nowrap"
              >
                {l.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              enrollment={dummyEnrollments.find(
                (e) => e.course_id === course.id
              )}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            No courses found matching your criteria
          </p>
          <Button
            variant="outline"
            className="mt-4 rounded-xl"
            onClick={() => {
              setSearch("");
              setCategory("all");
              setLevel("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
