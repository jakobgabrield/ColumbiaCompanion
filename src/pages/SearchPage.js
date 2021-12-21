import React, {useState, useEffect} from 'react'
import "../css/SearchPage.css"
import axios from 'axios'
import RecCourse from '../components/RecCourse'
import "../css/RecCourse.css"

export default function SearchPage() {

    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        getCourses();
    }, [])

    const searchTerm = (val) => {
        setSearch(val);
        let c = allCourses.filter(co => {
            return co.CourseName.toLowerCase().includes(val.toLowerCase()) || co.Instructor.toLowerCase().includes(val.toLowerCase()) || co.Keywords.includes(val);
        });
        c.sort((c1, c2) => c1.CourseName > c2.CourseName ? 1 : -1);
        setCourses(c);
    }

    // CourseName: "INTRO-COMPUTATIONAL COMPLEXITY"
    // Description: "Develops a quantitative theory of the computational difficulty of problems in terms of the resources (e.g. time, space) needed to solve them. Classification of problems into complexity classes, reductions, and completeness. Power and limitations of different modes of computation such as nondeterminism, randomization, interaction, and parallelism."
    // Instructor: "Rocco Servedio"
    // Keywords: ['Theory']
    // MeetingTime: "T R 8:40AM-9:55AM"
    // Notes: "n/a"
    // Prereqs: ['W3261']
    // courseID: "W4236"
    // uuid: "36"

    const getCourses = async () => {
        let res = await axios.get(`https://amqotblo53.execute-api.us-east-1.amazonaws.com/alpha/course`);
        console.log(res.data);
        let c = res.data;
        c.sort((c1, c2) => c1.CourseName > c2.CourseName ? 1 : -1);
        setAllCourses(c);
        setCourses(c);
    }

    return (
        <div className="SearchPage">
            <div className="search-container">
                <div className="search-bar" >
                    <input className="search-input" value={search} onChange={e => searchTerm(e.target.value)} placeholder="Search Courses"></input>
                    <p>Search by course name, instructor, or keyword.</p>
                </div>
            </div>
            <div className="RecCourses">
                {courses.map((c,i) => {
                    return <RecCourse key={c.uuid} course={c} />
                })}
            </div>
        </div>
    )
}
