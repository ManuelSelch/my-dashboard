import { useParams } from 'react-router-dom'
import Chart from "react-apexcharts";

import useFetchProject from '../hooks/useFetchProject';
import useFetchMilestones from '../hooks/useFetchMilestones';
import useFetchIssues from '../hooks/useFetchIssues';


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

const TaigaProjectDetails = () => {
    const { slug } = useParams();
    const project = useFetchProject(slug);

    const milestones = useFetchMilestones();

    const projectMilestones = milestones.filter(m => m.project === project.id);
    const milestoneValues = projectMilestones.reverse().map(m => m.total_points ?? 0);
    const milestoneValuesBurndown = []

    const total_milestones = project.total_milestones ?? 10;
    const total_story_points = project.total_story_points ?? 100;

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
    for (let i = 0; i < total_milestones; i++) {
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
    const date = new Date(project.created_date);
    const formattedDate = date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });


    const issues = useFetchIssues();
    const projectIssues = issues.filter(i => i.project === project.id);

    return (
        <div className="p-10">
            <p className="text-4xl font-bold">{project.name}</p>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 pt-10">
                
                <div className="grid grid-cols-1 justify-items-center p-10">
                    <Chart
                        options={options}
                        series={series}
                        type="area"
                        width="500"
                    />
                </div>

                <div className="">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Project information</h2>
                            <hr/>

                            <p><strong>Category:</strong> App</p>
                            
                            <p><strong>Date:</strong> {formattedDate}</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl mt-10">
                        <div className="card-body">
                            <h2 className="card-title">Project description</h2>
                            <hr/>

                            <p>{project.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p className='text-4xl font-bold pt-10'>Issues Tracker</p>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Priority</th>
                            <th>Issue</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectIssues.map((issue) => (
                            <tr>
                                <th>{issue.type}</th>
                                <th>{issue.priority}</th>
                                <th>{issue.subject}</th>
                                <th>{issue.status}</th>
                            </tr>
                        ))}

                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TaigaProjectDetails;