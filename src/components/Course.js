import React from 'react'
import '../css/Course.css'

export default function Course({ setEditClass, deleteClass, index, courseName, instructor, courseRating, instructorRating }) {
    return (
        <div>
            <div className="course">
                <div>
                    <button onClick={() => {
                    if (window.confirm('Are you sure you want to delete this class?')) {
                        deleteClass(index)
                    }
                }}>-</button>
            <button onClick={() =>
                setEditClass(index)
            }>Edit</button>
                </div>
                <text>Course: {courseName}</text>
                <text>Instructor: {instructor}</text>
                <text>Course Rating: {courseRating}</text>
                <text>Instructor Rating: {instructorRating}</text>
            </div>
        </div>
    )
}
