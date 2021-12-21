import React, {useState, useEffect} from 'react'
import '../css/ProfilePage.css'
import Course from '../components/Course'
import Modal from 'react-modal'
import useUser from '../hooks/useUser'
import axios from 'axios'

export default function ProfilePage() {
    const { user } = useUser();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editableClass, setEditableClass] = useState({});
    const [courses, setCourses] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [allCourses, setAllCourses] = useState([]);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        }
      };

    useEffect(() => {
        getReviews();
        getCourses();
    }, [editableClass]);

    const getReviews = async () => {
        let res = await axios.get(`https://amqotblo53.execute-api.us-east-1.amazonaws.com/alpha/review/${user.user_id}`);
        let c = res.data;
        c.sort((c1, c2) => c1.CourseName > c2.CourseName ? 1 : -1);
        setCourses(c);
    }

    const getCourses = async () => {
        let res = await axios.get(`https://amqotblo53.execute-api.us-east-1.amazonaws.com/alpha/course`);
        console.log(res.data);
        let c = res.data;
        c.sort((c1, c2) => c1.CourseName > c2.CourseName ? 1 : -1);
        setAllCourses(c);
    }

    const deleteClass = async review_id => {
        // Delete class from DB using ID instead of index
        let res = await axios.delete(`https://amqotblo53.execute-api.us-east-1.amazonaws.com/alpha/review?q=${review_id}`);
        getReviews();
    }

    const setEditClass = (index) => {
        setModalIsOpen(true);
        setIsEdit(true);
        setEditableClass({...courses[index]});
    }

    const editClass = (field, value) => {
        if (field == "name") {
            setEditableClass({...editableClass, name: value});
        } else if (field == "instructor") {
            setEditableClass({...editableClass, instructor: value});
        } else if (field == "courseRating") {
            setEditableClass({...editableClass, courseRating: value});
        } else if (field == "instructorRating") {
            setEditableClass({...editableClass, instructorRating: value});
        }
    }

    const addCourse = () => {
        // When add button is clicked
        setEditableClass({name: "", instructor: "", courseRating: "", instructorRating: ""});
        setModalIsOpen(true);
        setIsEdit(false);
    }

    const postCourse = async () => {
        let res = await axios.post('https://amqotblo53.execute-api.us-east-1.amazonaws.com/alpha/review', {...editableClass, user_id: user.user_id});
        setEditableClass({name: "", instructor: "", courseRating: "", instructorRating: ""});
        setModalIsOpen(false);
        setIsEdit(true);
    }

    const updateEditableClass = async () => {
        // Update review put request
        let res = axios.put('https://amqotblo53.execute-api.us-east-1.amazonaws.com/alpha/review', editableClass);
        setIsEdit(false);
        setModalIsOpen(false);
        getReviews();
    }

    return (
        <div className="ProfilePage">
            {/* <div className="info">
                <div className="head-labels"><span className="italic">Student Name:</span> {user.name}</div>
                <div className="head-labels"><span className="italic">Major:</span> {user.major}</div>
                <div className="head-labels"><span className="italic">Minor:</span> {user.minor}</div>
                <div className="head-labels"><span className="italic">Track:</span> {user.track}</div>
            </div> */}
            <h3>Past Enrollment</h3>
            <div className="courses">
                {courses.map((c,i) => {
                    return <Course key={c.review_id} setEditClass={setEditClass} deleteClass={() => deleteClass(c.review_id)} index={i} courseName={c.name} instructor={c.instructor} courseRating={c.courseRating} instructorRating={c.instructorRating} />
                })}
                <button className="addBtn" onClick={addCourse}>Add Course</button>
            </div>
            <Modal 
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
            >
                <div>
                    {/* <input className="element" placeholder="Course Name" value={editableClass.name} onChange={e => editClass("name", e.target.value)}></input> */}
                    <select onChange={e => editClass("name", e.target.value)} value={editableClass.name}>
                        <option value="select">Select</option>
                        {allCourses.map(course => {
                            return <option value={course.CourseName}>{course.CourseName}</option>
                        })}
                    </select>
                    {/* <input className="element" placeholder="Instructor" value={editableClass.instructor} onChange={e => editClass("instructor", e.target.value)}></input> */}
                    <select onChange={e => editClass("instructor", e.target.value)} value={editableClass.instructor}>
                        <option value="select">Select</option>
                        {allCourses.map(course => {
                            return <option value={course.Instructor}>{course.Instructor}</option>
                        })}
                    </select>
                    <div className="element">
                        <label>Course Rating</label>
                        <select id="courseRating" onChange={e => editClass("courseRating", e.target.value)} value={editableClass.courseRating}>
                            <option value="select">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="element">
                        <label>Instructor Rating</label>
                        <select id="instructorRating" onChange={e => editClass("instructorRating", e.target.value)} value={editableClass.instructorRating}>
                            <option value="select">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    {isEdit ? <button onClick={updateEditableClass}>Save</button> : <button onClick={postCourse}>Add</button>}
                    <button onClick={() => setModalIsOpen(false)}>Cancel</button>
                </div>
            </Modal>
        </div>
    )
}
