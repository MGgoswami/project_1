import react, { useState, useEffect } from 'react';
import './style.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import CloseIcon from '@mui/icons-material/Close';
import { getReq } from 'src/helpers/request';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/actions';

export default function ActivityChart({ isOpen, setIsOpen, index, owner, repo }) {

    //States
    const [data, setData] = useState([]);
    const [contributorsData, setContributorsData] = useState([]);

    //Hooks
    const dispatch = useDispatch();
    useEffect(() => {
        if (isOpen.index === index) {
            if (isOpen.flag === 'commit') {
                getActivityData(`https://api.github.com/repos/${owner}/stats/commit_activity`);
            }
            else {
                getActivityData(`https://api.github.com/repos/${owner}/stats/code_frequency`);
            }

            getContributorsActivity(`https://api.github.com/repos/${owner}/stats/contributors`);
        }
    }, [isOpen])

    const getActivityData = async (url) => {
        dispatch(setIsLoading(true));
        await getReq(url)
            .then((res) => {
                if (res.status === true) {
                    formatData(res.data);
                    dispatch(setIsLoading(false));
                } else {
                    dispatch(setIsLoading(false));
                }
            });
    }

    const getContributorsActivity = async (url) => {
        dispatch(setIsLoading(true));
        await getReq(url)
            .then((res) => {
                if (res.status === true) {
                    formatContributorsData(res.data);
                    dispatch(setIsLoading(false));
                } else {
                    dispatch(setIsLoading(false));
                }
            });
    }

    const formatData = (data) => {
        let series = [];
        data.map((item) => {
            series.push(item.total)
        })
        setData([...series]);
    }

    const formatContributorsData = (data) => {
        let arr = [];
        data.map((item, index) => {
            arr.push({ data: [item.total] });
        });
        setContributorsData([...arr])
    };

    const activityOptions = {
        title: {
            text: `Total ${isOpen.flag} chart`
        },
        series: [
            { data: [...data] },
        ],
    }

    const contributorsOptions = {
        title: {
            text: `Contributors Chart`
        },
        series: [...contributorsData],
    }


    return (
        <div className={isOpen.index === index ? 'activity_holder' : 'd_none'}>
            <span className='header'><CloseIcon onClick={() => setIsOpen({ index: false, flag: 'commit' })} /> </span>
            <div className='chart_holder'>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={activityOptions}
                    width='100%'
                />
                <HighchartsReact
                    highcharts={Highcharts}
                    options={contributorsOptions}
                    width='100%'
                />
            </div>
        </div>
    );
}