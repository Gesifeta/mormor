import { ThreeCircles } from "react-loader-spinner"

const Loader = () => {
    return (
        <div className="app__spinner-container">
            <div className="app__spinner"><ThreeCircles /></div>
        </div>
    )
}

export default Loader