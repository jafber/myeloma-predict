import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            <h1>SMM Risk Model</h1>
            <div>
                The PANGEA-SMM Model predicts your risk of progression from SMM to multiple myeloma. It uses clinical data and cytogenetic abnormalities to provide personalized risk assessments at 2 and 5 years.
            </div>
            <div>
                Navigate to <Link to="/calculator">the Calculator</Link> to input your data and receive your risk evaluation.
            </div>
        </>
    )
}

export default Home