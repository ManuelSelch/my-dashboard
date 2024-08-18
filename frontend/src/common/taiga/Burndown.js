import React from "react";


const Burndown = ({project, milestones}) => {
    const total_story_points = project.total_story_points;
    const total_milestones = project.total_milestones;
    const milestoneValues = milestones.map(m => m.closed_points ?? 0).reverse();
    const milestoneValuesBurndown = []

    var lastValue = total_story_points;
    milestoneValuesBurndown.push(lastValue);
    for (let i = 0; i < milestoneValues.length; i++) {
        const value = lastValue - milestoneValues[i];
        lastValue = value;
        milestoneValuesBurndown.push(value);
    }

    const stepSize = total_story_points / total_milestones;

    // Generate optimal values
    const optimalValues = [];
    for (let i = 0; i < total_milestones+1; i++) {
        const optimalValue = total_story_points - stepSize * i;
        optimalValues.push(optimalValue);
    }

    const series = [
        {
            name: "optimal",
            data: optimalValues
        },
        {
            name: "real",
            data: milestoneValuesBurndown
        }
    ]

    return (
        <Chart
            options={burndownChartConfig}
            series={series}
            type="area"
            width="500"
        />
    );
};

export default Burndown;