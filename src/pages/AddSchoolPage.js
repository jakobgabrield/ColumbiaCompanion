import React, {useState} from 'react';

export default function AddSchoolPage() {

    const [school, setSchool] = useState("");
    const [file, setFile] = useState([]);

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
          console.log("e.target.result", e.target.result);
          setFile(JSON.parse(e.target.result));
        };
    };

    const uploadCourses = () => {
        //Make API PUT call to add courses and school throu lambda function into DB.
        alert({schoolName: school, courses: file});
    }

    return (
        <div className="AddSchoolPage">
            <input type="text" placeholder="School" onChange={e => setSchool(e.target.value)} />
            <br></br>
            <input type="file" onChange={handleChange} />
            <br></br>
            <button onClick={() => uploadCourses()}>Upload</button>
            <div>
                {
                    file.map(course => {
                        return (
                            <div>
                                {course.courseIdentifier}: {course.courseName.toUpperCase()}
                                <br></br>
                                {course.Instructor}
                                <br></br>
                                <br></br>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}
