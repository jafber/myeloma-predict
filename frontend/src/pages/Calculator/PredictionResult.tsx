import { Chart } from "./Chart";

export type FormDataType = {
    serumFreeLightChainRatio: number;
    involvedFreeLightChain: number;
    nonInvolvedFreeLightChain: number;
    serumMProtein: number;
    boneMarrowPlasmaCells: number;
    mSpike?: number;
    creatinine?: number;
    age?: number;
    hemoglobin?: number;
}

function PredictionResult(props: FormDataType) {
    if (Math.random() < 0.01) {
    console.log("PredictionResult props:", props);
    }
    return (
        <div>
            <h2>Prediction result</h2>
            <Chart />
        </div>
    )
}

export default PredictionResult