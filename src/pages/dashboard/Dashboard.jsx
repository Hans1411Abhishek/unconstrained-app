import React, { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./dashboard.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { images } from "../../components/images";
import CurrentCourseProgressCard from './CurrentCourseProgressCard';
import UpcomingAssignments from './UpcomingAssignments';
import { setUserdata } from '../../redux/userSlice'
import { useSelector, useDispatch } from 'react-redux'

const Dashboard = () => {
  const [currentCardId, setCurrentCardId] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    const profileData = {
      name: searchParams.get("name"),
      email: searchParams.get("email"),
      image: searchParams.get("image"),
      token: searchParams.get("token")
    }
    if (profileData?.token) {
      dispatch(setUserdata(profileData));

      setSearchParams('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashoboard-container">
      <div className="dashboard-controller">
        <img className="tree-logo" src={images['tree.svg']} loading="lazy" alt="avatarLogo" />
        {/* <img className="dashboard-avatar" src={images['dashboardAvatar.png']} loading="lazy" alt="avatar logo" /> */}
        <img className="dashboard-avatar" referrerPolicy="no-referrer" src={userData?.image} loading="lazy" alt="avatar logo" />
        <div className="welcome-text"> <span>Welcome, {userData?.name}!</span></div>
        <div className="university-logo-block">
          <img className="university-logo" src={images['university.svg']} loading="lazy" alt="university logo" />
          <img className="university-campus-logo" src={images['universityCampus.svg']} loading="lazy" alt="avatarLogo" />
          <img className="university-star-logo" src={images['universityStar.svg']} loading="lazy" alt="avatarLogo" />
        </div>
      </div>
      <Tabs
        defaultActiveKey="dashboard"
        variant='underline'
        id="uncontrolled-tab-example"
        className="tabs-controller"
      >
        <Tab eventKey="dashboard" title="DASHBOARD" tabClassName="tab-content">
          <div className="dashboard-layout">
            <CurrentCourseProgressCard setCurrentCardId={setCurrentCardId} />
            <UpcomingAssignments currentCardId={currentCardId} />
          </div>
        </Tab>
        <Tab eventKey="Dashboard" title="COURSES" tabClassName="tab-content">
          Tab content for SAVED COURSES
        </Tab>
        <Tab eventKey="savedCourses" title="SAVED COURSES" tabClassName="tab-content">
          Tab content for SAVED COURSES
        </Tab>
      </Tabs>
    </div>
  );
};

export default memo(Dashboard);
