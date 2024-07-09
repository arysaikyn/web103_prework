import PropTypes from "prop-types";
import { FaInfoCircle } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";


export default function Card({ creator }) {
    return (
        <div style={{
            height: "15rem",
            width: "40rem",
            background: `${creator.imageURL ? `url(${creator.imageURL})` : "#ccc"}`,
            margin: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px"
        }}>
            <h1>{creator.name ? `${creator.name}` : ""}</h1>
            <div>
                <Link to={`/${creator.name}`}>
                    <FaInfoCircle style={{
                        fontSize: "2rem"
                    }}/>
                </Link>
                <Link to={`/${creator.name}/edit`}>
                    <MdModeEdit style={{
                        fontSize: "2rem"
                    }}/>
                </Link>
            </div>
        </div>
    );
}

Card.propTypes = {
    creator: PropTypes.object.isRequired
};