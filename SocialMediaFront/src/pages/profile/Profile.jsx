import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile(){
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const params = useParams();

    useEffect(()=>{
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:5000/api/users?username=${params.username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [params.username])

    return (
        <>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img 
                                className="profileCoverImg" 
                                src={user.coverPicture
                                ?  PF+user.coverPicture
                                : PF+"cover/noCover.png"} 
                                alt="" 
                            />
                            <img 
                                className="profileUserImg" 
                                src={user.profilePicture 
                                ? PF+user.profilePicture
                                : PF+"person/noAvatar.png"} 
                                alt="" 
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={params.username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    );
}