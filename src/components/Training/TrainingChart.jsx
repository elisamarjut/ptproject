import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import _ from "lodash";


export default function TrainingChart() {
    // States
    const [activities, setActivities] = useState([]);

    // Functions
    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings';

    // Getting the activities
    const getActivities = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData" + responseData);
                const formattedActivities = responseData.map(training => ({
                    id: training.id,
                    value: training.duration,
                    label: training.activity
                }));

                // Grouping activities with the same label
                const groupedActivities = _.groupBy(formattedActivities, 'label');

                // Using the _.map lodash function to iterate though each activity
                // and summing up the durations of activities that have the same label
                const activitiesWithSummedDurations = _.map(groupedActivities, (activities, label) => ({
                    label,
                    value: _.sumBy(activities, 'value')
                }));

                setActivities(activitiesWithSummedDurations);
            })
            // Error handling
            .catch(err => console.error('Error getting activities:', err))
    };

    // Getting the activities only after the first render
    useEffect(() => getActivities(), []);

    // return
    return (
        <>
            <div>
                <PieChart
                    series={[
                        { data: activities }
                    ]}
                    width={800}
                    height={400}
                ></PieChart>
            </div>
        </>
    );
}