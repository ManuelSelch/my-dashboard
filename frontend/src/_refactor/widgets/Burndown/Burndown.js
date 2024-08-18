import React from "react";
import Chart from "react-apexcharts";

import useFetchMilestones from '../../hooks/useFetchMilestones';

const options = {
    colors : ['#758694', '#9CDBA6', '#E90074'],
    chart: {
        type: 'area',
        id: "backlog"
    },

    stroke: {
        curve: 'straight'
    },

    dataLabels: {
        enabled: false,
    },

    xaxis: {
       
    },

    
}

const Burndown = ({project, total_milestones, total_story_points}) => {
    const milestones = useFetchMilestones(project);

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
            options={options}
            series={series}
            type="area"
            width="500"
        />
    );
};

export default Burndown;