import React, {useState, useEffect} from 'react'
import axios from 'axios';
import useUser from '../hooks/useUser'
import RecCourse from '../components/RecCourse'
import "../css/RecCourse.css"

export default function RecommendationsPage() {
    const { user } = useUser();
    const [message, setMessage] = useState("");
    const [courses, setCourses] = useState([]);
    const [tags, setTags] = useState([""]);
    const [numShow, setNumShow] = useState(3);
    const changeTag = (text, index) => {
        let values = [...tags];
        values[index] = text;
        setTags(values)
    }

    const search = async () => {
        let res = await axios.post(`https://amqotblo53.execute-api.us-east-1.amazonaws.com/alpha/recommendation/${user.user_id}`, {keywords: tags.join(", ")});
        setCourses(res.data.recommendations);
        setMessage(res.data.message);
        setNumShow(3);
        console.log(res.data);
        setTags([""])
    }

    return (
        <div className="RecommendationsPage">
            <div className="tags">
                Keywords:
                {tags.map((tag,index) => {
                    return (
                        <div>
                            <input class="tag" value={tag} onChange={e => {
                                changeTag(e.target.value, index);
                            }}/>
                            <button onClick={() => {
                                let values = [...tags];
                                values.splice(index,1);
                                setTags(values);
                            }}>-</button>
                        </div>
                    );
                })}
                <button onClick={() => {
                    setTags([...tags, ""])
                }}>+</button>
            </div>
            <button class="get-btn" onClick={() => search()}>Get Recommendations</button>
            <div className="RecCourses">
                {message != "" && <h4 className="message">{message == "core" ? "You have not taken all your core requirements yet. Here are the courses you should take." : "Here are your recommendations for which you have fulfilled the prerequisites."}</h4>}
                {courses.map((c,i) => {
                    return (i < numShow) && <RecCourse key={c.uuid} course={c} />
                })}
                {numShow < courses.length && <button className="showMore-btn" onClick={()=> setNumShow(numShow+3)}>Show More</button>}
                <p className="showing-label">Showing {Math.min(numShow, courses.length)} of {courses.length}</p>
            </div>
        </div>
    )
}
