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
                <text><span className="italic">Course:</span> {courseName}</text>
                <text><span className="italic">Instructor:</span> {instructor}</text>
                <text><span className="italic">Course Rating:</span> {courseRating}</text>
                <text><span className="italic">Instructor Rating:</span> {instructorRating}</text>
            </div>
        </div>
    )
}
