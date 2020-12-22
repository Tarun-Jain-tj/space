import React, { useState, useEffect } from 'react';
import PaginationTableComponent from '../paginationTable/pagination.table';
import './home.css'

function HomeComponent() {
    const defaultUrl = `https://api.spacexdata.com/v3/launches?limit=100`
    const launchUrl = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=true'
    const launchLandUrl = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true'
    const allUrl = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2014'
    const [data, setData] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);
    const [launchCheckBox, setLaunchCheckBox] = useState(null)
    const [launchLandCheckBox, setLaunchLandCheckBox] = useState(null)
    const [allCheckBox, setAllCheckBox] = useState(null)
    const [currentPage, setcurrentPage] = useState(0);
    const [limit, setLimit] = useState(100);
    const [url, setUrl] = useState(defaultUrl);
    const [query, setQuery] = useState('startups');
    const yearArr = [{ "one": 2006, "two": 2007 }, { "one": 2008, "two": 2009 }, { "one": 2010, "two": 2011 }, { "one": 2012, "two": 2013 }, { "one": 2014, "two": 2015 }, { "one": 2016, "two": 2017 }, { "one": 2018, "two": 2019 }, { "one": 2020, "two": 2021 }]

    const handleFetch = (urlToCall) => {
        fetch(urlToCall)
            .then(response => response.json())
            .then(body => {
                setData(body);
                setisLoaded(true);
            })
            .catch(error => console.error('Error', error));
    };
    useEffect(async () => {
        // if(launchCheckBox){
        //     setUrl('https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true')
        // }
        // if(launchLandCheckBox){
        //     setUrl('https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true&amp;land_success=true')
        // }
        // if(allCheckBox){
        //     setUrl('https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true&amp;land_success=true&amp;launch_year=2014')
        // }
        setisLoaded(false)
        await handleFetch(url)
    }, [url])
    function assignCorrectUrl1(one, sec, third) {
        if (third) {
            return
        }
        if (!sec && !third && !one) {
            setUrl(defaultUrl)
        }
        if (sec) {
            setUrl(launchLandUrl)
        }
        if (one) {
            setUrl(launchUrl)
        }
    }
    function assignCorrectUrl(one, sec, third) {
        let s = ''
        if (one == true || one == false) {
            s += '&launch_success=' + one
        }
        if (sec == true || sec == false) {
            s += '&land_success=' + sec
        }
        if (third) {
            s += '&launch_year=' + third
        }

        setUrl(defaultUrl + s)

    }
    function onChange(key, value) {
        if (key == 1) {
            value = value == launchCheckBox ? null : value
            setLaunchCheckBox(value)
            // if (!launchLandCheckBox && !allCheckBox && value) {
            //     setUrl(launchUrl)
            // }
            // if (!value) {
            assignCorrectUrl(value, launchLandCheckBox, allCheckBox)
            // }
        }
        if (key == 2) {
            value = value == launchLandCheckBox ? null : value
            setLaunchLandCheckBox(value)
            // if (!allCheckBox && value) {
            //     setUrl(launchLandUrl)
            // }
            // if (!value) {
            assignCorrectUrl(launchCheckBox, value, allCheckBox)
            // }
        }
        if (key == 3) {
            value = value == allCheckBox ? null : value
            setAllCheckBox(value)
            assignCorrectUrl(launchCheckBox, launchLandCheckBox, value)
        }
    }
    function onClick(e) {
        console.log(e)
    }
    return (
        <div className='home'>
            {/* <div><b>Filter: </b>
                <label className='checkBox'>
                    <input type="checkBox" id="launch" onChange={(event) => onChange(1, event.target.checked)} />
                    <i>{'Launch Success Filter'}</i>
                </label>
                <label className='checkBox'>
                    <input type="checkBox" id="launch" onChange={(event) => onChange(2, event.target.checked)} />
                    <i>{'Launch & Land Filter'}</i>
                </label>
                <label className='checkBox'>
                    <input type="checkBox" id="launch" onChange={(event) => onChange(3, event.target.checked)} />
                    <i> {'All'}</i>
                </label>
            </div> */}

            <b> SpaceX Launch Programs</b>
            <div className="row1">

                <div className="column1"><div><b>Filter: </b></div>
                    <div>
                        <div><u>Launch year</u></div>
                        {yearArr.map(obj => {
                            return (
                                <div className="rowButton">
                                    <div className="radio-toolbar">
                                        <input type="button" id={`yearRadio${obj.one}`} name="yearRadio" value={`${obj.one}`} className={allCheckBox == obj.one ? 'buttonActive' : ''} onClick={() => onChange(3, obj.one)} />
                                        <label className={allCheckBox == obj.one ? 'buttonActive' : ''} for={`yearRadio${obj.one}`}>{obj.one}</label>

                                        <input type="button" id={`yearRadio${obj.two}`} name="yearRadio" value={`${obj.two}`} onClick={() => onChange(3, obj.two)} />
                                        <label className={allCheckBox == obj.two ? 'buttonActive right' : 'right'} for={`yearRadio${obj.two}`}>{obj.two}</label>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div>
                        <div className="rowButton"><u>  Successful launch</u></div>
                        <div className="rowButton">
                            <div className="radio-toolbar">
                                <input type="button" id="launchRadioTrue" name="launchRadio" value="true" onClick={() => onChange(1, true)} />
                                <label className={launchCheckBox == true ? 'buttonActive' : ''} for="launchRadioTrue">True</label>

                                <input type="button" id="launchRadioFalse" name="launchRadio" value="false" onClick={() => onChange(1, false)} />
                                <label className={launchCheckBox == false ? 'buttonActive right' : 'right'} for="launchRadioFalse">False</label>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div ><u>  Successful Landing</u></div>
                        <div className="rowButton">
                            <div className="radio-toolbar">
                                <input type="button" id="landingRadioTrue" name="landingRadio" value="true" onClick={() => onChange(2, true)} />
                                <label className={launchLandCheckBox == true ? 'buttonActive' : ''} for="landingRadioTrue">True</label>

                                <input type="button" id="landingRadioFalse" name="landingRadio" value="false" onClick={() => onChange(2, false)} />
                                <label className={launchLandCheckBox == false ? 'buttonActive right' : 'right'} for="landingRadioFalse">False</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column2" >
                    {isLoaded ?

                        <PaginationTableComponent data={data} />

                        : (
                            <div></div>
                        )}
                </div>
            </div>
            <div className='footer'>Developed By: Tarun Jain</div>
        </div>
    );

}

export default HomeComponent;