import numpy as np
import pandas as pd
from pathlib import Path
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.feature_selection import VarianceThreshold
from sksurv.linear_model import CoxPHSurvivalAnalysis
from sksurv.ensemble import ComponentwiseGradientBoostingSurvivalAnalysis


scaled_numeric_cols = ["Age", "PGS_Score", "M_Spike", "sFLC_Ratio", "Creatinine", "LP", "BMPC_Final", "Hgb_Final"]
categorical_cols = ["Ancestry", "Clinical_Risk"]
preprocessor = ColumnTransformer(
    transformers=[
        (
            "num_scaled",
            Pipeline([
                ("imputer", SimpleImputer(strategy="median")),
                ("variance", VarianceThreshold(threshold=1e-5)),  # remove low-variance features
                ("scaler", StandardScaler()),
            ]),
            scaled_numeric_cols
        ),
        (
            "cat",
            Pipeline([
                ("imputer", SimpleImputer(strategy="most_frequent")),
                ("encoder",
                    OneHotEncoder(
                        handle_unknown="ignore",
                        sparse_output=False,
                        drop="first"
                    ),
                )
            ]),
            categorical_cols
        ),
    ]
)

def load_data(data_dir: Path, file_name="myeloma_data.csv") -> pd.DataFrame:
    """Load dataset from the specified directory."""
    data_file = data_dir / file_name
    return pd.read_csv(data_file)


def init_model() -> None:
    """Initialize and return the survival analysis model."""
    raw_data = load_data(Path("../predictions/data"), "myeloma_data.csv")

    # drop rows with NaN in Status or Time_Months to keep X, y aligned
    raw_data = raw_data.dropna(subset=["Status", "Time_Months"])
    X = raw_data.drop(columns=["Status", "Time_Months"])
    y_event = raw_data["Status"]
    y_time = raw_data["Time_Months"]


    y_structured = np.array(
        [(bool(e), t) for e, t in zip(y_event, y_time)],
        dtype=[('event', bool), ('time', float)]
    )


    X_processed = preprocessor.fit_transform(X)

    # model = CoxPHSurvivalAnalysis()
    model = ComponentwiseGradientBoostingSurvivalAnalysis(
        learning_rate=0.1, n_estimators=130, random_state=1,
    )
    model.fit(X_processed, y_structured)

    return model

def predict_risk_function(model, input_data: pd.DataFrame):
    preprocessed_data = preprocessor.transform(input_data)
    print("Preprocessing complete. Processed data shape:", preprocessed_data.shape)
    print("Preprocessed data: ", pd.DataFrame(preprocessed_data).head())
    hazard_function = model.predict_cumulative_hazard_function(preprocessed_data)
    return hazard_function