import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./App.css"
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";


export default function App() {
    return(
        <div>
            <header className="banner">
                <h1 className="headerText">
                    Creatorverse
                </h1>
                <div className="buttons">
                    <Link to="/">View All Creators</Link>
                    <Link to="new">Add a Creator</Link>
                </div>
            </header>
            <Outlet/>
        </div>
    )
}

// embed - cards show
// spa - card information, card editing
// non-spa - add new creator