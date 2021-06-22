import "./sidebar.css";
import {RssFeed, Group, Bookmark, WorkOutline, Event, School} from "@material-ui/icons";
import Friend from "../friend/Friend";

import { Users } from "../../dummyData";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                            <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon"/>
                            <span className="sidebarListItemText">Grupos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon"/>
                            <span className="sidebarListItemText">Salvos</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon"/>
                            <span className="sidebarListItemText">Trabalhos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon"/>
                            <span className="sidebarListItemText">Eventos</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon"/>
                            <span className="sidebarListItemText">Cursos</span>
                    </li>
                </ul>
                <button className="sidebarBottom">Mostrar mais</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    {Users.map(u=>(
                        <Friend key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    );
}