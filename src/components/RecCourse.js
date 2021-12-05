import React from 'react'
import '../css/RecCourse.css'

export default function RecCourse({course}) {
    return (
        <div>
            <div className="RecCourse">
                <text>Course: {course.CourseName}</text>
                <text>Description: {course.Description}</text>
                <text>Instructor: {course.Instructor}</text>
                <text>Keywords: {course.Keywords.join(", ")}</text>
                <text>Meeting Time: {course.MeetingTime}</text>
                <text>Notes: {course.Notes}</text>
                <text>CourseID: {course.courseID}</text>
            </div>
        </div>
    )
}