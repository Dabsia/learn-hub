import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  PlayCircle,
  FileText,
  HelpCircle,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { toast } from "sonner";
import react2 from "../assets/react2.jpg";

const lessonIcon = { video: PlayCircle, reading: FileText, quiz: HelpCircle };

const dummyCourse = {
  id: "1",
  title: "React for Beginners",
  description:
    "Learn React from scratch with hands-on projects and real-world examples.",
  instructor_name: "Jane Smith",
  duration_hours: 10,
  thumbnail: react2,
  level: "beginner",
  category: "development",
  rating: 4.8,
  students_count: 1200,
  modules: [
    {
      title: "Getting Started",
      lessons: [
        {
          id: "l1",
          title: "Introduction to React",
          type: "video",
          duration_minutes: 12,
        },
        {
          id: "l2",
          title: "Setting Up Your Environment",
          type: "video",
          duration_minutes: 8,
        },
        {
          id: "l3",
          title: "Your First Component",
          type: "reading",
          duration_minutes: 10,
        },
      ],
    },
    {
      title: "Core Concepts",
      lessons: [
        {
          id: "l4",
          title: "Props and State",
          type: "video",
          duration_minutes: 20,
        },
        {
          id: "l5",
          title: "Event Handling",
          type: "video",
          duration_minutes: 15,
        },
        {
          id: "l6",
          title: "Knowledge Check",
          type: "quiz",
          duration_minutes: 10,
        },
      ],
    },
    {
      title: "Advanced Patterns",
      lessons: [
        {
          id: "l7",
          title: "useEffect Hook",
          type: "video",
          duration_minutes: 18,
        },
        {
          id: "l8",
          title: "Custom Hooks",
          type: "reading",
          duration_minutes: 12,
        },
        { id: "l9", title: "Final Quiz", type: "quiz", duration_minutes: 15 },
      ],
    },
  ],
};

const dummyEnrollment = {
  id: "e1",
  course_id: "1",
  progress: 45,
  status: "active",
  completed_lessons: ["l1", "l2", "l3", "l4"],
};

export default function CourseDetail() {
  const courseId = window.location.pathname.split("/courses/")[1];
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState(
    dummyEnrollment.course_id === courseId ? dummyEnrollment : null
  );
  const [enrolling, setEnrolling] = useState(false);

  const course = dummyCourse;

  const handleEnroll = () => {
    setEnrolling(true);
    setTimeout(() => {
      setEnrollment({
        id: "e_new",
        course_id: courseId,
        progress: 0,
        status: "active",
        completed_lessons: [],
      });
      setEnrolling(false);
      toast.success("Successfully enrolled!");
    }, 800);
  };

  const totalLessons =
    course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;
  const completedLessons = enrollment?.completed_lessons?.length || 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link
        to="/courses"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to courses
      </Link>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="aspect-[3/1] bg-gradient-to-br from-primary/20 via-primary/10 to-accent overflow-hidden">
          {course.thumbnail && (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {course.level && (
                  <Badge variant="secondary" className="rounded-lg text-xs">
                    {course.level}
                  </Badge>
                )}
                {course.category && (
                  <Badge variant="outline" className="rounded-lg text-xs">
                    {course.category.replace(/_/g, " ")}
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {course.title}
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                {course.description}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {course.instructor_name?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {course.instructor_name}
                  </p>
                  <p className="text-xs text-muted-foreground">Instructor</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {course.duration_hours} hours
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> {totalLessons} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> {course.students_count} students
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />{" "}
                  {course.rating}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              {enrollment ? (
                <div className="bg-secondary rounded-2xl p-5 w-56">
                  <p className="text-sm font-medium text-foreground">
                    Your Progress
                  </p>
                  <p className="text-3xl font-bold text-primary mt-1">
                    {Math.round(enrollment.progress || 0)}%
                  </p>
                  <Progress
                    value={enrollment.progress || 0}
                    className="mt-3 h-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {completedLessons} of {totalLessons} lessons
                  </p>
                  <Link to={`/courses/${courseId}/lesson`}>
                    <Button className="w-full mt-4 rounded-xl">
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  size="lg"
                  className="rounded-xl px-8"
                  onClick={handleEnroll}
                  disabled={enrolling}
                >
                  {enrolling ? "Enrolling..." : "Enroll Now"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {course.modules?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Course Curriculum
          </h2>
          <Accordion type="multiple" className="space-y-3">
            {course.modules.map((module, idx) => (
              <AccordionItem
                key={idx}
                value={`module-${idx}`}
                className="bg-card border border-border rounded-2xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-lg">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-foreground">
                      {module.title}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {module.lessons?.length || 0} lessons
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="space-y-1 ml-10">
                    {module.lessons?.map((lesson, lIdx) => {
                      const Icon = lessonIcon[lesson.type] || PlayCircle;
                      const isCompleted =
                        enrollment?.completed_lessons?.includes(lesson.id);
                      return (
                        <Link
                          key={lIdx}
                          to={
                            enrollment
                              ? `/courses/${courseId}/lesson?lessonId=${lesson.id}`
                              : "#"
                          }
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            )}
                            <span className="text-sm text-foreground">
                              {lesson.title}
                            </span>
                          </div>
                          {lesson.duration_minutes && (
                            <span className="text-xs text-muted-foreground">
                              {lesson.duration_minutes} min
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
