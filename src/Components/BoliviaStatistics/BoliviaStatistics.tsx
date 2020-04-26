import * as React from 'react';
import ReactTooltip from "react-tooltip";
import {StatisticsContext} from '../../utils/Constants';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import MapChart from "../MapChart/MapChart";

// STYLES
import "./BoliviaStatistics.css";

import { v4 as uuidv4 } from 'uuid';
import { Grid, Paper } from '@material-ui/core';
interface IStat {
    data: any
}

class BoliviaStatistics extends React.Component<any, any> {
    static contextType = StatisticsContext;
    mounted = false;

    state = {
        chartSize: 200,
        bottomChartSize: 600,
        tooltipContent: ""
    };

    constructor(props: any) {
        super(props);
        // eslint-disable-next-line
        this.handleWindowResize();
    }

    componentWillMount() { this.mounted = true; }
    componentWillUnmount() { this.mounted = false; }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
        this.convertDataToJson();
    }

    convertDataToJson = () => {
        if(this.context) {
            //let obj: MyObj = JSON.parse(data.toString());
            //decodeURIComponent(escape(atob(this.context)))
            let jsonData: IStat = JSON.parse(decodeURIComponent(escape(atob(this.context))));
            return jsonData;
        }
        return null;
    }

    editTooltip = (department) => {
        const jsonData = this.convertDataToJson();
        if(jsonData){
            const {data: { byDepartment }} = jsonData;
            if(department) {
                const depInfo = byDepartment.find(dep => dep.name == department);
                if(depInfo) {
                    this.setState({
                        tooltipContent: department
                        + "<br /> Confirmados: "
                        + depInfo.casosConfirmados
                        + "<br /> Recuperados "
                        + depInfo.personasRecuperadas
                        + "<br /> Muertes "
                        + depInfo.muertes
                    });
                }
            } else {
                this.setState({
                    tooltipContent: ""
                });
            }
        }
    }

    handleWindowResize = () => {
        console.log("resize", window.innerWidth);
        let width = window.innerWidth;

        if(width >= 1920)
            width = 450;
        else if (width >= 1600)
            width = width * 25 / 100;
        else if (width >= 1300)
            width = width * 29 / 100;
        else if (width >= 1000)
            width = width * 35 / 100;
        else
            width = width * 36 / 100;
        if(this.mounted) {
            this.setState({
                chartSize: width,
                bottomChartSize:  window.innerWidth * 90 / 100
            });
        }
    }


    render() {
        const jsonData = this.convertDataToJson();
        if(jsonData) {
            const {data: {generalInfo, byDepartment, hystoricByDay, graphicCoordinates}} = jsonData;

            return (
                <React.Fragment>
                    <Grid container spacing={3} className="gridBox">
                        <Grid item xs>
                        <Paper className="current">Confirmados<br/>{generalInfo.casosConfirmados}</Paper>
                        </Grid>
                        <Grid item xs>
                        <Paper className="good">Recuperados<br/>{generalInfo.personasRecuperadas}</Paper>
                        </Grid>
                        <Grid item xs>
                        <Paper className="bad">Fallecidos<br/>{generalInfo.muertes}</Paper>
                        </Grid>
                    </Grid>
                    <div className="bolivia-statistics" >
                        <div className="bolivia-statistics map">
                            <MapChart
                                dataTip={this.state.tooltipContent}
                                dataTipFn={this.editTooltip}
                            />
                            <ReactTooltip html={true} style={{padding: "0" }} />
                        </div>

                        <div className="bolivia-statistics general-data">

                            <div className="wrapper-department">
                                <table>
                                    <thead>
                                    <tr>
                                        <th key={uuidv4()}>Departmento</th>
                                        <th key={uuidv4()}>Confirmados</th>
                                        <th key={uuidv4()}>Recuperad@s</th>
                                        <th key={uuidv4()}>Muertes</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        byDepartment.map(department => (
                                            <tr key={uuidv4()}>
                                                <td key={uuidv4()}>{department.name}</td>
                                                <td key={uuidv4()}>{department.casosConfirmados}</td>
                                                <td key={uuidv4()}>{department.personasRecuperadas}</td>
                                                <td key={uuidv4()}>{department.muertes}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                    <tfoot key={uuidv4()}>
                                        <th key={uuidv4()}>Total Bolivia</th>
                                        <th key={uuidv4()}>{generalInfo.casosConfirmados}</th>
                                        <th key={uuidv4()}>{generalInfo.personasRecuperadas}</th>
                                        <th key={uuidv4()}>{generalInfo.muertes}</th>
                                    </tfoot>
                                </table>
                                <div className="wrapper-sinple-chart">
                                    <LineChart width={this.state.chartSize} height={500} data={hystoricByDay}
                                               margin={{top: 20, right: 5, left: -25, bottom: 5}}>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip />
                                        <Legend />
                                        <CartesianGrid strokeDasharray="1 1"/>
                                        <Line type="monotone" dataKey="casos" stroke="orange" dot={{ stroke: 'orange', strokeWidth: 1 }} activeDot={{r: 1}}/>
                                        <Line type="monotone" dataKey="muertes" stroke="purple" dot={{ stroke: 'purple', strokeWidth: 1 }} activeDot={{r: 1}}/>
                                        <Line type="monotone" dataKey="recuperados" stroke="green" dot={{ stroke: 'green', strokeWidth: 1 }} activeDot={{r: 1}}/>
                                    </LineChart>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-chart">
                        <LineChart width={this.state.bottomChartSize} height={500} data={hystoricByDay}
                                   margin={{top: 20, right: 5, left: 5, bottom: 5}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip />
                            <Legend />
                            <CartesianGrid strokeDasharray="1 1"/>
                            <Line type="monotone" dataKey="casos" stroke="orange" dot={{ stroke: 'orange', strokeWidth: 1 }} activeDot={{r: 1}}/>
                            <Line type="monotone" dataKey="muertes" stroke="purple" dot={{ stroke: 'purple', strokeWidth: 1 }} activeDot={{r: 1}}/>
                            <Line type="monotone" dataKey="recuperados" stroke="green" dot={{ stroke: 'green', strokeWidth: 1 }} activeDot={{r: 1}}/>
                        </LineChart>
                    </div>
                </React.Fragment>
            );

        } else {
            return (<div>--</div>)
        }

    }
}

export default BoliviaStatistics;