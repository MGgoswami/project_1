import React, { useEffect, useState } from 'react';
import './style.css';
import {
    Container,
    Box,
    Typography,
    Button,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';
import ActivityChart from 'src/Components/ActivityChart/ActivityChart';
import { useDispatch, useSelector } from 'react-redux';
import { setApiResponse } from '../../redux/actions';

export default function Home() {

    const today = new Date();
    const currentDate = moment(today).format('YYYY-MM-DD');
    const requiredDate = moment(currentDate).subtract(30, "days").format("YYYY-MM-DD");

    //States   
    const [page, setPage] = useState(1);
    const [date, setDate] = useState(requiredDate);
    const [isDropdown, setIsDropdown] = useState(false);
    const [isOpen, setIsOpen] = useState({ index: false, flag: false });

    //Hooks    
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.apiResponseReducer);
    
    useEffect(() => {
        dispatch(setApiResponse({ page: 1, date: date }));
    }, [])

    //functions
    const handleActivity = (index, flag) => {
        setIsDropdown(false);
        setIsOpen({
            index: index,
            flag: flag
        });
    }

    const handleDays = (days) => {
        setDate(moment(currentDate).subtract(days, "days").format("YYYY-MM-DD"))
        dispatch(setApiResponse({ page: 1, date: date }));
    }   

    const getMoreList = () => {
        setPage(page + 1);
        dispatch(setApiResponse({ page: page + 1, date: date }));
    };

    const toggleDropdown = (value) => {
        setIsDropdown(value);
    }

    return (
        <Container>
            <Box
                sx={{
                    width: '100%',
                    height: 'max-content',
                    minHeight: '90vh',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    margin: '40px 0px'
                }}
            >
                <header>
                    <Typography variant="h2">
                        Most Starred Repos
                    </Typography>
                </header>
                <hr />
                <div className='filter_section'>
                    <Button onClick={() => handleDays(7)} variant={moment(currentDate).subtract(7, "days").format("YYYY-MM-DD") === date ? "contained" : "outlined"} sx={{ borderColor: 'black', color: 'black', marginRight: '10px' }}>1 Week</Button>
                    <Button onClick={() => handleDays(14)} variant={moment(currentDate).subtract(14, "days").format("YYYY-MM-DD") === date ? "contained" : "outlined"} sx={{ borderColor: 'black', color: 'black', marginRight: '10px' }}>2 Week</Button>
                    <Button onClick={() => handleDays(30)} variant={moment(currentDate).subtract(30, "days").format("YYYY-MM-DD") === date ? "contained" : "outlined"} sx={{ borderColor: 'black', color: 'black', marginRight: '10px' }}>1 Month</Button>
                </div>
                <hr />
                {/* <div className='row_holder'> */}
                <InfiniteScroll
                    dataLength={data.length}
                    next={getMoreList}
                    hasMore={true}
                    style={{ overflow: 'none' }}
                    className='row_holder'
                >
                    {data?.length > 0 && data.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className='row'>
                                    <div className='row_left'>
                                        <div className='avatar_holder'>
                                            <img src={item.owner.avatar_url} alt='avatar' height={100} width={100}></img>
                                        </div>
                                        <div className='metadata'>
                                            <Typography variant="h4">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="h6">
                                                {item.description}
                                            </Typography>
                                            <div className='stats_holder'>
                                                <p className='stars'>{item.stargazers_count}&nbsp;Stars</p> <p className='stars'>{item.open_issues_count}&nbsp;Issues</p><p className='stats'>Last pushed&nbsp;{item.pushed_at}&nbsp; by&nbsp;{item.full_name}</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='dropdown'>
                                        <span onClick={() => { isDropdown === index ? toggleDropdown(false) : toggleDropdown(index) }} className="dropbtn">
                                            <KeyboardArrowDownIcon />
                                        </span>
                                        <div id="myDropdown" className={isDropdown === index ? "dropdown-content" : "hide"}>
                                            <a onClick={() => handleActivity(index, 'commit')}>Commits</a>
                                            <a onClick={() => handleActivity(index, 'addition')}>Additions</a>
                                            <a onClick={() => handleActivity(index, 'deletion')}>Deletions</a>
                                        </div>
                                    </div>
                                </div>
                                <ActivityChart isOpen={isOpen} setIsOpen={setIsOpen} index={index} owner={item.full_name} repo={item.name} />
                            </React.Fragment>
                        );
                    })}
                </InfiniteScroll>
            </Box>
        </Container>
    );
};