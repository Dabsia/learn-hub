import React from "react";
import { Link } from "react-router-dom";
import { Clock, Users, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

const levelColors = {
  beginner: "bg-green-50 text-green-700 border-green-200",
  intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  advanced: "bg-red-50 text-red-700 border-red-200",
};

export default function CourseCard({ course, enrollment }) {
  const progress = enrollment?.progress || 0;

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-secondary overflow-hidden relative">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/30">
              {course.title?.[0]}
            </span>
          </div>
        )}
        {course.level && (
          <Badge
            className={`absolute top-3 left-3 ${
              levelColors[course.level]
            } border text-xs`}
          >
            {course.level}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {course.instructor_name}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          {course.duration_hours && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration_hours}h
            </span>
          )}
          {course.students_count && (
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {course.students_count}
            </span>
          )}
          {course.rating && (
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {course.rating}
            </span>
          )}
        </div>

        {/* Progress */}
        {enrollment && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
      </div>
    </Link>
  );
}
