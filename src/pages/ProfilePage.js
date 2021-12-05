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
    }, [editableClass]);

    const getReviews = async () => {
        let res = await axios.get(`https://amqotblo53.execute-api.us-east-1.amazonaws.com/alpha/review/${user.user_id}`);
        setCourses(res.data);
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
            <div className="info">
                <div>Student Name: {user.name}</div>
                <div>Major: {user.major}</div>
                <div>Minor: {user.minor}</div>
                <div>Track: {user.track}</div>
            </div>
            <h3>Past Enrollment</h3>
            <div className="courses">
                {courses.map((c,i) => {
                    return <Course key={c.review_id} setEditClass={setEditClass} deleteClass={() => deleteClass(c.review_id)} index={i} courseName={c.name} instructor={c.instructor} courseRating={c.courseRating} instructorRating={c.instructorRating} />
                })}
                <button className="addBtn" onClick={addCourse}>+</button>
            </div>
            <Modal 
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
            >
                <div>
                    <input className="element" placeholder="Course Name" value={editableClass.name} onChange={e => editClass("name", e.target.value)}></input>
                    <input className="element" placeholder="Instructor" value={editableClass.instructor} onChange={e => editClass("instructor", e.target.value)}></input>
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
