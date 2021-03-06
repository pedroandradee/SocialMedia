import "./rightbar.css";
import { Users } from "../../dummyData"
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const {user: currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id));
    }, [currentUser, user]);

    useEffect(() => {
        const getFriends = async () => {
            try{
                const friendList = await axios.get("http://localhost:5000/api/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch(err){
                console.log(err);
            }
        }
        getFriends();
    }, [user]);

    const handleClick = async(e) => {
        e.preventDefault();
        try{
            if(followed){
                await axios.put("http://localhost:5000/api/users/" + user._id + "/unfollow", {
                    userId:currentUser._id
                });
                dispatch({type: "UNFOLLOW", payload:user._id})
            } else {
                await axios.put("http://localhost:5000/api/users/" + user._id + "/follow", {userId:currentUser._id})
                dispatch({type: "FOLLOW", payload:user._id})
            }
        } catch(err){
            console.log(err);
        }
        setFollowed(!followed)
    }

    const HomeRightBar = () => {
        return(
            <>
            <div className="birthdayContainer">
                <img className="birthdayImg" src="/assets/gift.png" alt="" />
                <span className="birthdayText"> <b> Maisy Wiliams </b> está fazendo aniversário hoje!</span>
            </div>
            <img className="rightbarAd" src="/assets/advertising/1.jpg" alt="" />
            <h4 className="rightbarTitle">Amigos online</h4>
            <ul className="rightbarFriendList">
                {Users.map(u=>(
                    <Online key={u.id} user={u} />
                ))}
            </ul>
            </>
        );
    }

    const ProfileRightBar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                        {followed ? "Deixar de seguir" : "Seguir"}
                        {followed ? <Remove /> : <Add/>}
                    </button>
                )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Cidade:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">De:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relacionamento:</span>
                        <span className="rightbarInfoValue">{
                            user.relationship === 1 ? "Solteiro(a)" 
                            : user.relationship === 2 ? "Casado(a)" 
                            : "Outro"
                        }</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">Seguidores</h4>
                <div className="rightbarFollowings">
                    {friends.map(friend=> (
                        <Link key={friend._id} to={"/profile/" + friend.username} style={{textDecoration:"none"}}>
                            <div className="rightbarFollowing">
                                <img src={friend.profilePicture
                                    ? PF+friend.profilePicture
                                    : PF+"person/noAvatar.png"} 
                                    alt="" 
                                    className="rightbarFollowingImg" 
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar /> : <HomeRightBar /> }
            </div>
        </div>
    );
}