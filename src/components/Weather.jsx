import React, { useEffect, useRef, useState } from 'react'
import searchIcon from "../assets/search.png"
import clear from "../assets/clear.png"
import humidity from "../assets/humidity.png"
import wind from "../assets/wind.png"
import cloud from "../assets/cloud.png"
import drizzle from "../assets/drizzle.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"

const Weather = () => {
    const inputRef=useRef()
    const [weatherData,setWeatherData]=useState(false);
    
    const allIcons={
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,
    }
    
    const search =async (city)=>{
        if(city===""){
            alert("Enter City Name");
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response=await fetch(url);
            const data=await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon=allIcons[data.weather[0].icon ] || clear;
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })
        }
        catch(error){
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    }
    useEffect(()=>{
        search("Kathmandu");
    },[])
  return (
    <div className=' flex flex-col justify-evenly items-center bg-gradient-to-t from-blue-800 to-purple-800 h-full  w-full rounded-lg '>
        <h1 className='text-4xl text-white font-bold '>Weather App</h1>
      <div className='flex justify-evenly gap-3 items-center '>
        <input className='bg-white rounded-lg border-none outline-none p-2' ref={inputRef} type="text" placeholder='Search' />
        <img src={searchIcon} alt="" onClick={()=>search(inputRef.current.value)} className='bg-white rounded-full p-2 cursor-pointer hover:bg-gray-900' />
      </div>
      {weatherData?<>
        <div className='flex justify-center  '>
        <img className='w-20' src={weatherData.icon} alt="" />
        </div>
      
      <h1 className='text-center text-5xl text-white'>{weatherData.temperature}&#8451;</h1>
      <h2 className='text-center text-3xl  text-white'>{weatherData.location}</h2>
    <div className='flex justify-center gap-12'>
        <div className='flex gap-3 items-center'>
            <div>
                <img src={humidity} className='w-5' alt="" />
            </div>
    
            <div className=''>
                <h4 className='text-white text-xl'>{weatherData.humidity}%</h4>
                <h5 className='text-white'>Humidity</h5>
            </div>
        </div>
        <div className='flex gap-3 items-center'>
            <div>
                <img src={wind} className='w-5' alt="" />
            </div>
    
            <div className=''>
                <h4 className='text-white text-xl'>{weatherData.windSpeed} Km/h</h4>
                <h5 className='text-white'>Wind Speed</h5>
            </div>
        </div>
    </div>
      
      </>:
      
      <>
      </>}
        
    
      
      
    </div>
  )
}

export default Weather
