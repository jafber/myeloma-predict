import { useEffect, useState } from 'react';
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../../components/ui/field"
import { Calendar } from '../../components/ui/calendar';
import { useForm } from "react-hook-form";
import { FormField } from './FormField';
import PredictionResult, { type FormDataType } from './PredictionResult';


function Calculator() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useForm<FormDataType>({ mode: "all" });

  const onSubmit = (data: FormDataType) => {
    console.log("Form submitted:", data);
  };

  useEffect(() => {
    console.log("Validation errors:", errors);
    trigger()
  }, []);

  const formData = watch();

  return (
    <>
      <h1>Calculator</h1>
      <div className='flex flex-row relative'>
        <div className="flex-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Mandatory biomarker information</h2>
            <FieldSet>
              <FieldGroup>
                {/* Free Light Chain Ratio */}
                <FormField
                  id="serumFreeLightChainRatio"
                  label="Serum Free Light Chain Ratio (Involved Over Uninvolved)"
                  description="The Serum Free Light Chain Ratio (Involved Over Uninvolved) measures the imbalance between a specific abnormal (involved) and normal (uninvolved) free light chain in the blood, often used to monitor plasma cell disorders."
                  placeholder="e.g. 1.5"
                  step={0.01}
                  error={errors.serumFreeLightChainRatio?.message as string}
                  register={() => register("serumFreeLightChainRatio", {
                    required: "Serum Free Light Chain Ratio is required",
                    min: { value: 0.0, message: "Ratio is unreasonably low" },
                    max: { value: 1000, message: "Ratio is unreasonably high" },
                  }
                  )}
                />
                {/* M-Spike */}
                <FormField
                  id="mSpike"
                  label="M-Spike (g/dL)"
                  description="M-Spike (g/dL) measures the concentration of a monoclonal protein (M-protein) in the blood"
                  placeholder="e.g. 3.2"
                  step={0.01}
                  error={errors.mSpike?.message as string}
                  register={() => register("mSpike", {
                    required: "M-Spike is required",
                    min: { value: 0.0, message: "M-Spike is unreasonably low" },
                    max: { value: 10.0, message: "M-Spike is unreasonably high" },
                  })}
                />

                {/* Creatinine */}
                <FormField
                  id="creatinine"
                  label="Creatinine (mg/dL)"
                  description="Creatinine (mg/dL) measures the level of creatinine in the blood, which is an indicator of kidney function."
                  placeholder="e.g. 1.2"
                  step={0.01}
                  register={() => register("creatinine", {
                    required: "Creatinine is required",
                    min: { value: 0.0, message: "Creatinine is unreasonably low" },
                    max: { value: 2.0, message: "Creatinine is unreasonably high" },
                  })}
                  error={errors.creatinine?.message as string}
                />

                {/* Age */}
                <FormField
                  id="age"
                  label="Age (years)"
                  description="Age of the patient in years."
                  placeholder="e.g. 65"
                  step={1}
                  register={() => register("age", {
                    required: "Age is required",
                    min: { value: 18, message: "Minimum age is 18" },
                    max: { value: 99, message: "Maximum age is 99" },
                  })}
                  error={errors.age?.message as string}
                />
                {/* Optional: Bone Marrow Biopsy (% Plasma Cells) */}
                <FormField
                  id="boneMarrowPlasmaCells"
                  label="Bone Marrow Biopsy (% Plasma Cells)"
                  description="Percentage of plasma cells in the bone marrow biopsy."
                  placeholder="e.g. 15"
                  step={0.01}
                  register={() => register("boneMarrowPlasmaCells", {
                    min: { value: 0.0, message: "Percentage is unreasonably low" },
                    max: { value: 100.0, message: "Percentage is unreasonably high" },
                  })}
                  error={errors.boneMarrowPlasmaCells?.message as string}
                />
              </FieldGroup>
            </FieldSet>

            <h2>Optional patient history</h2>
            <FieldSet>
              <FieldGroup>
                {/* Labwork Date */}
                <FieldLabel htmlFor="labworkDate">Labwork Date</FieldLabel>
                <FieldDescription>
                  Select the date when the lab work was performed.
                </FieldDescription>
                <Calendar
                  mode="single"
                  id='labworkDate'
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow-sm"
                  captionLayout="dropdown"
                  required={false}
                />

                {/* Hemoglobin */}
                <FormField
                  id="hemoglobin"
                  label="Hemoglobin (g/dL)"
                  description="Hemoglobin (g/dL) measures the amount of hemoglobin in the blood, indicating oxygen-carrying capacity."
                  placeholder="e.g. 13.5"
                  step={0.01}
                  register={() => register("hemoglobin", {
                    min: { value: 0.0, message: "Hemoglobin is unreasonably low" },
                    max: { value: 20.0, message: "Hemoglobin is unreasonably high" },
                  })}
                  error={errors.hemoglobin?.message as string}
                />
              </FieldGroup>
            </FieldSet>


            {/* <div className='flex justify-end flex-row'>
          <button type="submit" className="cursor-pointer px-8 py-3 my-8 bg-primary/80 hover:bg-primary text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">Calculate</button>
        </div> */}
          </form>
        </div>
        {
          /* render only if there are no validation errors */
          Object.keys(errors).length === 0 &&
          <div className="flex-1 ml-8 ">
            <div className="sticky top-8">
              <PredictionResult {...formData}/>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Calculator


