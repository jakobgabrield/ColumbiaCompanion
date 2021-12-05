import React, {useState, useEffect} from 'react'
import axios from 'axios';
import useUser from '../hooks/useUser'
import RecCourse from '../components/RecCourse'
import "../css/RecCourse.css"

export default function RecommendationsPage() {
    const { user } = useUser();
    const [courses, setCourses] = useState([]);
    const [tags, setTags] = useState([""]);
    const changeTag = (text, index) => {
        let values = [...tags];
        values[index] = text;
        setTags(values)
    }

    const search = async () => {
        let res = await axios.post(`https://amqotblo53.execute-api.us-east-1.amazonaws.com/alpha/recommendation/${user.user_id}`, {keywords: tags.join(", ")});
        setCourses(res.data);
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
                {courses.map((c,i) => {
                    return <RecCourse key={c.uuid} course={c} />
                })}
            </div>
        </div>
    )
}
