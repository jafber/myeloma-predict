import { Spinner } from "../../components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import requestPrediction from "../../api/requestPrediction";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
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
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { FullscreenIcon } from "lucide-react";

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
    risk: Array<{ date: Date; probability: number, low: number; high: number }>;
    riskScore: number;
    overallVerdict: string;
    detailedDescription: string;
}

const chartConfig = {
    risk: {
        label: "Risk",
        color: "var(--primary)",
    },
    low: {
        label: "Low estimate",
        color: "var(--primary-muted)",
    },
    high: {
        label: "High estimate",
        color: "var(--primary-light)",
    }
} satisfies ChartConfig

function PredictionResult(props: FormDataType) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['prediction', props],
        queryFn: () => requestPrediction(props),
    })
    const [isFullScreen, setIsFullScreen] = useState(false);

    if (isLoading) {
        return <Spinner className='w-full flex justify-center items-center h-8' />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log("Prediction data:", data);

    return (
        <Card className={isFullScreen ? "fixed top-0 left-0 w-screen h-screen z-50 overflow-auto" : ""}>
            <CardHeader className="relative">
                <CardTitle>Multiple myeloma risk</CardTitle>
                <CardDescription>January - June 2026</CardDescription>
                <Button variant="outline" onClick={() => setIsFullScreen(!isFullScreen)} className="absolute top-0 right-4 z-50">
                    <FullscreenIcon />
                </Button>
            </CardHeader>
            <div className={`overflow-x-auto ${isFullScreen ? "max-w-4/5 lg:max-w-3/5 m-auto w-full h-full" : ""}`}>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={data?.risk.map((entry: any) => ({
                                month: entry.date.toLocaleString('default', { month: 'long' }),
                                risk: entry.probability,
                                low: entry.low,
                                high: entry.high,
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
                                tickFormatter={(value: Date) => value.toString().slice(5, 7)}
                            />
                            <YAxis />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel>test</ChartTooltipContent>}
                            />
                            <Line
                                dataKey="risk"
                                type="natural"
                                stroke="var(--primary)"
                                strokeWidth={3}
                                dot={false}
                            />
                            <Line
                                dataKey="low"
                                type="natural"
                                stroke="var(--primary-muted)"
                                opacity={0.4}
                                dot={false}
                            />
                            <Line
                                dataKey="high"
                                type="natural"
                                stroke="var(--primary-muted)"
                                opacity={0.4}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm mt-4">
                    <h3>{data?.overallVerdict}</h3>
                    <div className="text-muted-foreground leading-none">
                        {data?.detailedDescription}
                    </div>
                </CardFooter>
            </div>
        </Card>
    )
}

export default PredictionResult