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

                // const groupedActivities = _.groupBy(formattedActivities, 'label');
                // const summedDurations = _.sumBy(formattedActivities, 'value');

                setActivities(formattedActivities);
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