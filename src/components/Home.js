import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import humidity from '../images/humidity.png'
import visi from '../images/visi.png'
import wind from '../images/wind.png'
import uv from '../images/uv.png'
import rain from '../images/rain.png'
import sunrise from '../images/sunrise.png'
import sunset from '../images/sunset.png'
import moonrise from '../images/moonrise.png'
import moonset from '../images/moonset.png'
import snow from '../images/snow.png'
import search from '../images/search.png'

const Home = () => {
    const [search2, setSearch2] = useState('New Delhi')
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const getdata = async (search2) => {
        try {
            setLoading(true)
            const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${search2}&days=3`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'b27e18fb5bmsh653948a61eaedcap122759jsncc5aa8dcbbd9',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            };
            const data = await fetch(url, options)
            const res = await data.json()
            if (res.error) {
                setLoading(false)
                console.log(res);
                setError(true)
                // setData(res);
            }
            else {
                setLoading(false)
                console.log(res);
                setError(false)
                setData(res)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const postdata = () => [
        getdata(search2)
    ]
    useEffect(() => {
        if (!search2) {
            getdata('New Delhi')
        }
        else {
            getdata(search2)
        }
    }, [search2])
    if (loading) {
        return (
            <div className='maincon'>
                <div className="inner">
                    <div className="search">
                        <input type="text" placeholder='Type Something' onChange={(e) => setSearch2(e.target.value)} />
                        <button onClick={postdata}><img src={search} alt="" /></button>
                    </div>
                    <div className="loading">
                         <p>Loading....</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='maincon'>
            <div className="inner">
                <div className="search">
                    <input type="text" placeholder='Type Something' onChange={(e) => setSearch2(e.target.value)} />
                    <button onClick={postdata}><img src={search} alt="" /></button>
                </div>
                {
                    error ? <div className="found">
                        <p>No matching location found</p>
                    </div> :
                        data ? <div className="box">
                            <div className="box1">
                                <div className="boxcon1">
                                    <div className="con1">

                                    </div>
                                    <div className="con2">
                                        <p>{data.location.localtime}</p>
                                        <p>{`${data.current.temp_c} * c`}</p>
                                    </div>
                                </div>
                                <div className="boxcon2">
                                    <p>{data.location.name}</p>
                                    <p>{data.current.condition.text}</p>
                                    <img src={`https:${data.current.condition.icon}`} alt="error" />
                                </div>
                            </div>
                            <div className="box2">
                                <div className="box2con1">
                                    <div>
                                        <p>Humidity</p>
                                        <img src={humidity} alt="" className='img' />
                                        <p>{`${data.current.humidity} %`}</p>
                                    </div>
                                    <div>
                                        <p>Visibility</p>
                                        <img src={visi} alt="" className='img' />
                                        <p>{`${data.current.vis_km} km`}</p>
                                    </div>
                                    <div>
                                        <p>Wind</p>
                                        <img src={wind} alt="" className='img' />
                                        <p>{`${data.current.wind_mph} mph`}</p>
                                    </div>
                                    <div>
                                        <p>UV</p>
                                        <img src={uv} alt="" className='img' />
                                        <p>{data.current.uv}</p>
                                    </div>
                                    <div>
                                        <p>% of Rain</p>
                                        <img src={rain} alt="" className='img' />
                                        <p>{`${data.forecast.forecastday[0].day.daily_chance_of_rain} %`}</p>
                                    </div>
                                </div>
                                <div className="box2con2">
                                    <div>
                                        <p>Sunrise</p>
                                        <img src={sunrise} alt="" className='img' />
                                        <p>{data.forecast.forecastday[0].astro.sunrise}</p>
                                    </div>
                                    <div>
                                        <p>Sunset</p>
                                        <img src={sunset} alt="" className='img' />
                                        <p>{data.forecast.forecastday[0].astro.sunset}</p>
                                    </div>
                                    <div>
                                        <p>Moonrise</p>
                                        <img src={moonrise} alt="" className='img' />
                                        <p>{data.forecast.forecastday[0].astro.moonrise}</p>
                                    </div>
                                    <div>
                                        <p>Moonset</p>
                                        <img src={moonset} alt="" className='img' />
                                        <p>{data.forecast.forecastday[0].astro.moonset}</p>
                                    </div>
                                    <div>
                                        <p>% of snow</p>
                                        <img src={snow} alt="" className='img' />
                                        <p>{`${data.forecast.forecastday[0].day.daily_chance_of_snow} %`}</p>
                                    </div>
                                </div>
                            </div>
                        </div> : console.log('')
                }
            </div>
        </div>
    )
}

export default Home
