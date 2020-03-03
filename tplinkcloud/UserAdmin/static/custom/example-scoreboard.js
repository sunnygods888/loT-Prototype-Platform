// == Setup a Color Theme - Based on Bootstrap ==
Highcharts.theme = {
    colors: ['#007bff', '#6c757d', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#343a40', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    title: {
        style: {
            color: '#212529',
            font: '2rem -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
        }
    },
    subtitle: {
        style: {
            color: '#6c757d',
            font: '1rem -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
        }
    },
    xAxis: {
        gridLineWidth: 0,
        lineColor: '#999',
        tickColor: '#999',
        labels: {
            style: {
                color: '#212529',
                fontWeight: 'bold'
            }
        },
        title: {
            style: {
                color: '#212529',
                font: '1rem -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
            }
        }
    },
    yAxis: {
        alternateGridColor: null,
        minorTickInterval: null,
        gridLineColor: 'rgba(255, 255, 255, .1)',
        minorGridLineColor: 'rgba(255,255,255,0.07)',
        lineWidth: 0,
        tickWidth: 0,
        labels: {
            style: {
                color: '#999',
                fontWeight: 'bold'
            }
        },
        title: {
            style: {
                color: '#AAA',
                font: 'bold 12px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
            }
        }
    }

};
// Apply the theme
Highcharts.setOptions(Highcharts.theme);



// === Create the chart ===
Highcharts.chart('drilldown-demo', {
    chart: {
        //height: (9 / 16 * 100) + '%', // 16:9 ratio
		type: 'column'
    },
    credits: {
        enabled: false
    },
	title: {
        text: 'Company Score: <b>88.6%</b> (Avg)'
    },
    subtitle: {
        text: 'Click a column to drill down (and get inspired).'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Curved Score'
        }

    },
    responsive: {
        rules: [{
            condition: {
                minHeight: 650
            },
            // Make the labels less space demanding on mobile
            chartOptions: {
                xAxis: {
                    labels: {
                        formatter: function () {
                            return this.value.charAt(0);
                        }
                    }
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -2
                    },
                    title: {
                        text: ''
                    }
                }
            }
        }]
    },
	legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
    },

    "series": [
        {
            "name": "Company Scorecard",
            "colorByPoint": true,
            "data": [
                {
                    "name": "Assurance",
                    "y": 90.6,
                    "drilldown": "assurance"
                },
                {
                    "name": "Dispatch",
                    "y": 71.45,
                    "drilldown": "dispatch"
                },
                {
                    "name": "Safety",
                    "y": 90.36,
                    "drilldown": "safety"
                },
                {
                    "name": "Accounting",
                    "y": 93.01,
                    "drilldown": "accounting"
                },
                {
                    "name": "Managment",
                    "y": 97.81,
                    "drilldown": "managment"
                }
            ]
        }
    ],
    
	"drilldown": {
        "series": [
            {
                "name": "Assurance",
                "id": "assurance",
                data: [{
                    name: 'Top Performers',
                    y: 98,
                    drilldown: 'assuranceLG'
                },
				{
                    name: 'Median Performers',
                    y: 67.7,
                    drilldown: 'assuranceMD'
                },
				{
                    name: 'Bottom Performers',
                    y: 41.1,
                    drilldown: 'assuranceSM'
                }
                ]
            }, {
                "name": "Dispatch",
                "id": "dispatch",
                data: [{
                    name: 'Top Performers',
                    y: 96.5,
                    drilldown: 'dispatchLG'
                },
				{
                    name: 'Median Performers',
                    y: 74.4,
                    drilldown: 'dispatchMD'
                },
				{
                    name: 'Bottom Performers',
                    y: 56.65,
                    drilldown: 'dispatchSM'
                }
                ]
            },
			{
                "name": "Assurance Top Performers",
                "id": "assuranceLG",
                "data": [
                    ["Alexander Rick", 100],
                    ["Anthony Piccolo",100],
                    ["Apple  Matthew", 100],
					["Brian,  Yoder", 100],
                    ["Heaven,  Melton",100],
                    ["Richard  Andrew", 100],
					["Franco,  Lowe", 98],
                    ["Isla,  Hamilton",98],
                    ["Niko,  May", 97],
                    ["Desmond, Garner", 96],
                    ["Elaine,  Mccarthy", 93.9],
                    ["Ashanti,  Peterson", 89.9]
                ]
            },
			{
                "name": "Assurance Median Performers",
                "id": "assuranceMD",
                "data": [
                    ["Theodore Nash", 87.9],
                    ["Nelson Love",82.8],
                    ["Rowan, Massey", 76.8],
					["Ernet Gorss", 61.6],
                    ["Steve Pruitt", 53.5],
                    ["Annika Key", 50.5]
                ]
            },
			{
                "name": "Assurance Bottom Performers",
                "id": "assuranceSM",
                "data": [
					["Robert Frankelstien", 49.5],
                    ["Myla Ibarra",43.4],
					["Helena Rivera", 39.4],
                    ["Braylen Barrett",38.4],
                    ["Andrew Richard", 35.4],
					["Annabelle White", 24.2],
                    ["Sincere Ritter", 0]
                ]
            },
			{
                "name": "Dispatch Top Performers",
                "id": "dispatchLG",
                "data": [
                    ["Larry Ramirez", 100],
                    ["Tanner Wheeler",94.87],
                    ["Xiomara Watkins", 94.87]
                ]
            },
			{
                "name": "Dispatch Median Performers",
                "id": "dispatchMD",
                "data": [
                    ["Alexander Rick", 74.35],
                    ["Brian Yoder", 74.35],
					["Butler Jordan", 74.35],
					["Calderon Gordon", 74.35],
					["Carney Hallie", 74.35],
					["Cochran Lea", 74.35],
					["Desmond Garner", 74.35],
					["Dominic Jimenez", 74.35],
					["Doyle Gavin", 74.35],
					["Robert Frankelstien", 74.35],
					["Jessie Sanford", 74.35],
					["Key Annika", 74.35],
					["Lin Alexa", 74.35],
					["Niko May", 74.35],
					["Piccolo, Anthony", 74.35],
					["Larry Ramirez", 74.35],
					["Richard Andrew", 74.35],
					["Sanford Jessie", 74.35],
					["Williams Kathy", 74.35],
					["Brian Yoder", 74.35],
                ]
            },
			{
                "name": "Dispatch Bottom Performers",
                "id": "dispatchSM",
                "data": [
					["Jordan Butler", 71.79],
                    ["Grace Goodman",69.23],
					["Carney Hallie", 69.23],
                    ["Ashanti Peterson",66.6],
                    ["Helena Rivera", 66.6],
					["Ernet Gorss", 64.1],
                    ["Jonathan Nolan", 64.1],
					["Theodore Nash", 64.1],
					["Annika Key", 61.5],
                    ["Braylen Barrett", 61.5],
					["Erin Merritt", 58.97],
					["Sincere Ritter", 51.28],
                    ["Andrew Richard", 46.15],
					["Gordon Calderon", 38.46],
					["Abbigail Obrien", 33.33],
                    ["Rowan Massey", 0],
                ]
            },
			{
                "name": "Safety",
                "id": "safety",
                data: [{
                    name: 'Top Performers',
                    y: 96.5,
                    drilldown: 'safetyLG'
                },
				{
                    name: 'Median Performers',
                    y: 74.4,
                    drilldown: 'safetyMD'
                },
				{
                    name: 'Bottom Performers',
                    y: 56.65,
                    drilldown: 'safetySM'
                }
                ]
            },
			{
                "name": "Safety Top Performers",
                "id": "safetyLG",
                "data": [
                    ["Alexander Rick", 100],
					["Anthony Piccolo", 100],
                    ["Apple Matthew", 100],
                    ["Cochran Lea", 100],
					["Goodman Grace", 100],
					["Niko May", 100],
					["Amiah Rice", 95.45],
					["Annika Key", 95.45],
					["Theodore Nash", 95.45],
					["Annabelle White", 90.9],
                    ["Elaine Mccarthy", 90.9],
					["Kalmesh Kulkarni", 90.9],
					["Xiomara Watkins", 90.9],
					["Alexa Lin", 86.36],
					["Gavin Doyle", 86.36],
					["Robert Frankelstien", 86.36]
                ]
            },
			{
                "name": "Safety Median Performers",
                "id": "safetyMD",
                "data": [
					["Nelson Love", 84.09],
					["Jonathan Nolan", 81.18],
					["Ernet Gorss", 72.72],
					["Steve Pruitt", 68.18]
                ]
            },
			{
                "name": "Safety Bottom Performers",
                "id": "safetySM",
                "data": [
					["Braylen Barrett", 63.63],
					["Caitlyn Morton", 63.63],
					["Larry Ramirez", 63.63],
					["Jessie Sanford", 59],
					["Niko May", 50],
					["Andrew Richard", 47.72],
                    ["Tanner Wheeler", 45.45],
					["Rick Alexander", 27.27],
                    ["Grace Goodman",0]
                ]
            },
            {
                "name": "Accounting",
                "id": "accounting",
                data: [{
                    name: 'Top Performers',
                    y: 99.87,
                    drilldown: 'accountingLG'
                },
				{
                    name: 'Bottom Performers',
                    y: 44.44,
                    drilldown: 'accountingSM'
                }
                ]
            },
			{
                "name": "Accounting Top Performers",
                "id": "accountingLG",
                "data": [
                    ["Alexander Rick", 100],
					["Anthony Piccolo", 100],
                    ["Apple Matthew", 100],
                    ["Cochran Lea", 100],
					["Goodman Grace", 100],
					["Niko May", 100],
					["Amiah Rice", 100],
					["Annika Key", 100],
					["Theodore Nash", 100],
					["Annabelle White", 100],
                    ["Elaine Mccarthy", 100],
					["Kalmesh Kulkarni", 100],
					["Xiomara Watkins", 100],
					["Alexa Lin", 100],
					["Gavin Doyle", 100],
					["Yoder  Brian", 100],
					["Malloo Read", 88.88]
                ]
            },
			{
                "name": "Accounting Bottom Performers",
                "id": "accountingSM",
                "data": [
					["Annika Key", 66.66],
					["Elaine Mccarthy", 66.66],
					["Franco Lowe", 66.66],
					["Joaquin Hartman", 66.66],
					["Robert Frankelstien", 44.44],
					["Abbigail Obrien", 33.33],
                    ["Annabelle White", 33.33],
					["Helena Rivera", 33.33],
                    ["Myla Ibarra",33.33],
					["Nelson Love", 33.33],
                    ["Andrew Richard",0]
                ]
            },
            {
                "name": "Managment",
                "id": "managment",
                data: [{
                    name: 'Top Performers',
                    y: 100,
                    drilldown: 'managmentLG'
                },
				{
                    name: 'Median Performers',
                    y: 95.91,
                    drilldown: 'managmentMD'
                },
				{
                    name: 'Bottom Performers',
                    y: 67.16,
                    drilldown: 'managmentSM'
                }
                ]
            },
			{
                "name": "Managment Top Performers",
                "id": "managmentLG",
                "data": [
                    ["Abbigail Obrien", 100],
					["Alexa Lin", 100],
					["Alexander Rick", 100],
					["Anthony Piccolo", 100],
                    ["Apple Matthew", 100],
                    ["Cochran Lea", 100],
					["Goodman Grace", 100],
					["Niko May", 100],
					["Gavin Doyle", 100],
					["Robert Frankelstien", 100]
                ]
            },
			{
                "name": "Managment Median Performers",
                "id": "managmentMD",
                "data": [
					["Bruce Ross", 98.76],
					["Desmond Garner", 98.76],
					["Erin Merritt", 98.76],
					["Myla Ibarra", 98.76],
					["Theodore Nash", 98.76],
					["Nelson Love", 96.29],
					["Amiah Rice", 97.53],
					["Annabelle White", 95.06],
					["Gordon Calderon", 91.35],
					["Ronald Sosa", 90.12],
					["Tanner Wheeler", 90.12],
					["Ronald Sosa", 90.12],
                ]
            },
			{
                "name": "Managment Bottom Performers",
                "id": "managmentSM",
                "data": [
					["Andrew Richard", 88.88],
					["Larry Ramirez", 88.88],
					["Robert Frankelstien", 85.18],
					["Rick Alexander", 72.83],
					["Grace Goodman", 0]
                ]
            }
        ]
    }
});