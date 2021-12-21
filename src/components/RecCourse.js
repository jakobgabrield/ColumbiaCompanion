import React from 'react'
import '../css/RecCourse.css'

export default function RecCourse({course}) {
    return (
        <div>
            <div className="RecCourse">
                <text><span className="italic">Course:</span> {course.CourseName}</text>
                <text><span className="italic">Course Rating:</span> {course.courseRating}</text>
                <text><span className="italic">Description:</span> {course.Description}</text>
                <text><span className="italic">Instructor:</span> {course.Instructor}</text>
                <text><span className="italic">Instructor Rating:</span> {course.instructorRating}</text>
                <text><span className="italic">Keywords:</span> {course.Keywords.join(", ")}</text>
                <text><span className="italic">Meeting Time:</span> {course.MeetingTime}</text>
                <text><span className="italic">Notes:</span> {course.Notes}</text>
                <text><span className="italic">CourseID:</span> {course.courseID}</text>
            </div>
        </div>
    )
}