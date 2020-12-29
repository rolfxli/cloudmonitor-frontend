import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils/src'

const brandInfo = getStyle('info') || '#20a8d8'
const brandWarning = "#e39f22"


const MainChartExample = ({apidata, apidata_token2, total_max, past_dates, style}) => {

  const defaultDatasets = (()=>{
    
    return [
      {
        label: 'API Token 1',
        backgroundColor: hexToRgba(brandInfo, 0),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 3,
        data: apidata,
      },
      {
        label: 'API Token 2',
        backgroundColor: hexToRgba(brandWarning, 0),
        borderColor: brandWarning,
        pointHoverBackgroundColor: brandWarning,
        borderWidth: 3,
        data: apidata_token2,
      }
    ]
  })()

  const defaultOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: total_max + Math.max(Math.ceil(total_max/3), 5)
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          line: { tension: 0.00001 },
          point: {
            radius: 0,
            hitRadius: 20,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()


  // render
  return (
    <CChartLine
      
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={past_dates}
    />
  )
}


export default MainChartExample
