import React, { useState, useMemo } from "react";
import { useAuth } from "../lib/AuthContext";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle2,
  Circle,
  ChevronRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { ScrollArea } from "../components/ui/scroll-area";

const lessonIcon = { video: PlayCircle, reading: FileText, quiz: HelpCircle };

const dummyCourse = {
  id: "1",
  title: "React for Beginners",
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

const initialEnrollment = {
  id: "e1",
  course_id: "1",
  progress: 45,
  status: "active",
  completed_lessons: ["l1", "l2", "l3", "l4"],
};

export default function LessonView() {
  const courseId = window.location.pathname
    .split("/courses/")[1]
    ?.split("/")[0];
  const urlParams = new URLSearchParams(window.location.search);
  const lessonIdParam = urlParams.get("lessonId");
  const { user } = useAuth();

  const [enrollment, setEnrollment] = useState(initialEnrollment);
  const [marking, setMarking] = useState(false);

  const course = dummyCourse;

  const allLessons = useMemo(() => {
    if (!course?.modules) return [];
    return course.modules.flatMap((m) => m.lessons || []);
  }, []);

  const currentLesson =
    allLessons.find((l) => l.id === lessonIdParam) || allLessons[0];
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isCompleted = enrollment?.completed_lessons?.includes(
    currentLesson?.id
  );

  const handleMarkComplete = () => {
    setMarking(true);
    setTimeout(() => {
      const completedLessons = [...(enrollment.completed_lessons || [])];
      if (!completedLessons.includes(currentLesson.id)) {
        completedLessons.push(currentLesson.id);
      }
      const progress = Math.round(
        (completedLessons.length / allLessons.length) * 100
      );
      const status = progress >= 100 ? "completed" : "active";
      setEnrollment({
        ...enrollment,
        completed_lessons: completedLessons,
        progress,
        status,
      });
      setMarking(false);
      toast.success("Lesson marked as complete!");
    }, 500);
  };

  if (!currentLesson) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Lesson not found</p>
        <Link
          to={`/courses/${courseId}`}
          className="text-primary text-sm mt-2 inline-block"
        >
          ← Back to course
        </Link>
      </div>
    );
  }

  const completedCount = enrollment?.completed_lessons?.length || 0;
  const totalCount = allLessons.length;
  const progressVal =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to={`/courses/${courseId}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {course.title}
        </Link>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>
            {completedCount}/{totalCount} lessons
          </span>
          <Progress value={progressVal} className="w-24 h-2" />
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-6">
          <div className="aspect-video bg-foreground/5 rounded-2xl border border-border flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <PlayCircle className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">
                Video Player Placeholder
              </p>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {currentLesson.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentLesson.duration_minutes} minutes ·{" "}
                  {currentLesson.type}
                </p>
              </div>
              {enrollment && (
                <Button
                  onClick={handleMarkComplete}
                  disabled={isCompleted || marking}
                  variant={isCompleted ? "secondary" : "default"}
                  className="rounded-xl flex-shrink-0"
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Completed
                    </>
                  ) : (
                    "Mark as Complete"
                  )}
                </Button>
              )}
            </div>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                This lesson covers essential concepts that will help you build a
                strong foundation. Follow along with the video and take notes
                for the best learning experience.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {prevLesson ? (
              <Link
                to={`/courses/${courseId}/lesson?lessonId=${prevLesson.id}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous: {prevLesson.title}
              </Link>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Link
                to={`/courses/${courseId}/lesson?lessonId=${nextLesson.id}`}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Next: {nextLesson.title}
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="bg-card rounded-2xl border border-border sticky top-24 overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-sm text-foreground">
                Course Content
              </h3>
            </div>
            <ScrollArea className="h-[60vh]">
              <div className="p-2">
                {course.modules?.map((module, mIdx) => (
                  <div key={mIdx} className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground px-3 py-2 uppercase tracking-wider">
                      {module.title}
                    </p>
                    {module.lessons?.map((lesson, lIdx) => {
                      const Icon = lessonIcon[lesson.type] || PlayCircle;
                      const isActive = lesson.id === currentLesson.id;
                      const isDone = enrollment?.completed_lessons?.includes(
                        lesson.id
                      );
                      return (
                        <Link
                          key={lIdx}
                          to={`/courses/${courseId}/lesson?lessonId=${lesson.id}`}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                            isActive
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          ) : isActive ? (
                            <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 flex-shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
