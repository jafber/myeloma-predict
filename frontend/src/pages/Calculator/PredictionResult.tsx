import { Spinner } from "../../components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import requestPrediction from "../../api/requestPrediction";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "../../components/ui/chart"

export type FormDataType = {
    serumFreeLightChainRatio: number;
    mSpike: number;
    creatinine: number;
    age: number;
    hemoglobin?: number;
    boneMarrowPlasmaCells?: number;
    labworkDate?: Date;
}

type PredictionResult = {
    risk: Array<{ date: Date; probability: number }>;
    riskScore: number;
    overallVerdict: string;
    detailedDescription: string;
}

const chartConfig = {
    risk: {
        label: "Risk",
        color: "var(--primary)",
    },
} satisfies ChartConfig

function PredictionResult(props: FormDataType) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['prediction', props],
        queryFn: () => requestPrediction(props),
    })

    if (isLoading) {
        return <Spinner className='w-full flex justify-center items-center h-8' />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log("Prediction data:", data);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Multiple myeloma risk</CardTitle>
                <CardDescription>January - June 2026</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data?.risk.map((entry: any) => ({
                            month: entry.date.toLocaleString('default', { month: 'long' }),
                            risk: entry.probability,
                        }))}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="risk"
                            type="natural"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <h3>{data?.overallVerdict}</h3>
                <div className="text-muted-foreground leading-none">
                    {data?.detailedDescription}
                </div>
            </CardFooter>
        </Card>
    )
}

export default PredictionResult