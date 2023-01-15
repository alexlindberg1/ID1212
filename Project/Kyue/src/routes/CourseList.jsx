import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Searchbar, AsyncDataWrapper } from "../components";
import { useUserState, useCourseState, useQueueState } from "../hooks";
import "../index.css";
import "./CourseList.css";

const CourseList = () => {
    const { user } = useUserState();
    const { courses } = useCourseState();
    const { queue } = useQueueState();
    const [filteredList, setFilteredList] = useState([])

    useEffect(() => {
        if(courses?.courses)
            setFilteredList(courses?.courses)
    }, [courses?.courses])

    useEffect(() => {
        if (user.currentUser) {
            courses.fetchCourses(user)
            
        };
    }, [user.currentUser]);

    useEffect(() => {
        queue.setQueue([])
    }, [])

    return (
        <div style={{ position: "relative" }} className="root-page">
            <Navbar username={user?.currentUser?.username} />
            <AsyncDataWrapper data={courses?.courses} error={courses?.error}>
            <div className="list-header">
                <div>Courses</div>
                <Searchbar list={courses?.courses} setFilteredList={setFilteredList} />
            </div>
                <div id="course-list-wrapper">
                    {filteredList.map((course, i) => {
                        return (
                            <Link
                                key={i}
                                to={`${course.id}`}
                                className="course-item"
                            >
                                <div>
                                    <span>{course.id + " "}</span>
                                    <span>{course.title}</span>
                                </div>
                                <div>{course.status}</div>
                            </Link>
                        );
                    })}
                </div>
                <div className="footer-wrapper">
                    <footer className="page-footer">
                        <hr />
                    </footer>
                </div>
            </AsyncDataWrapper>
        </div>
    );
};

export default CourseList;
