import { useEffect, useReducer, useState } from "react";
import MessagesBanner from "../../components/MessagesBanner"
import NavBar from "../../components/NavBar"
import { bannerMessages, bannerMessagesReducer } from "../../reducers";
import SideBar from "../../components/SideBar";
import AddResearchButton from "../../components/research/AddResearchButton";
import UserProfileUpdates from "../../components/UserProfileUpdates";
import ResearchPosts from "../../components/posts/ResearchPosts";
import { User } from "../../types/types";
import { getUserProfile } from "../../actions/user";
import { useCookies } from "react-cookie";
import { UserContext } from "../../contexts";
import { RegisterType } from "../../types/enums";
import ScreenUpdateDisplay from "../../components/ScreenUpdateDisplay";



function Feed() {
    const [messages, dispatch] = useReducer(bannerMessagesReducer, bannerMessages);
    const [cookies] = useCookies(['access'])
    const [user, setUser] = useState<User>()
    const [clickMode, setClickMode] = useState<RegisterType | null>(null); // Controls the options on screen when 'share a finding' button is clicked
    const [displayMode, setDisplayMode] = useState(false)

    useEffect(() => {
        const getUserData = async () => {
            try {
                const user = await getUserProfile(cookies.access);
                setUser(user);
            } catch (err) {
                console.error(err);
            }
        }

        getUserData();

    }, [])

    const handleScreenState = () => {
        setClickMode(user?.role!)
        setDisplayMode(true);
    }

    return (
        <UserContext.Provider value={user!}>
            <MessagesBanner messages={messages} onUpdate={dispatch} />
            <NavBar onMessagesUpdate={dispatch} />
            <div className="flex px-4 py-2">
                <SideBar />
                <main className="flex justify-between w-full">
                    <ResearchPosts />
                    <div className="min-w-56">
                        <AddResearchButton onSetScreenState={handleScreenState} />
                        <UserProfileUpdates />
                    </div>
                </main>
                {displayMode && <ScreenUpdateDisplay mode={clickMode} toggleDisplay={setDisplayMode} />}
            </div>
        </UserContext.Provider>
    )

}

export default Feed