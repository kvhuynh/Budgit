import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react"

export const PieChart = (props: any) => {

    const [chartData, setChartData] = useState<Array<Object>>([])

    // TODO GROUP INCOME SOURCES BY NAME - POP UP ASKING FOR NAME OF GROUP
    useEffect(() => {
        let newArr = []
        for (let i = 0; i < props.data.length; i++) {
            for (let j = 0; j < props.data[i].length; j++) {
                const add = props.data[i][j].balances ? props.data[i][j].balances.current : null
                newArr.push({name: props.data[i][j].name, value: add})
            }

        
        }
        
        // TODO use spread operator to spread in old values before adding new one use filter
        setChartData(newArr)
        // console.log([...chartData, newArr]);
        
        // setChartData([...chartData, newArr])
            
        
    }, [props])

	const options = {
		title: {
			text: 
			`Income: \n$${props.totalWorth}`,
			left: "center",
			top: "center",
		},
		tooltip: {
			trigger: "item",
			formatter: "{b} : ${c} ({d}%)",
		},

		series: [
			{
				type: "pie",
                data: chartData,
				// data: props.data,
                // data: [
                //     { value: 1048, name: 'Search Engine' },
                //     { value: 735, name: 'Direct' },
                //     { value: 580, name: 'Email' },
                //     { value: 484, name: 'Union Ads' },
                //     { value: 300, name: 'Video Ads' }
                //   ],
				radius: ["40%", "70%"],
			},
		],
	};


    return (
        <div>
            <ReactECharts option={options} />
        </div>
    )


}

export default PieChart;