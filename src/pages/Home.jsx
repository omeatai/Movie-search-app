import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

export const Home = () => {

    const [tempWord, setTempWord] = useState("");
    const [keyWord, setKeyWord] = useState('');
    const [on, setOn] = useState(true);

    const fetchMovies = () => {
        if(on){
            return axios.request(`https://imdb-api.com/en/API/SearchAll/_____/${keyWord || "Spider"}`).then((res) => res.data)
        }else{
            return null;
        }
    }

    const { data, isLoading, isError, error, isRefetching, isLoadingError } = useQuery([keyWord], fetchMovies, {enabled: true});

    const SubmitHandler = (e) => {
        e.preventDefault();
        setKeyWord(tempWord);
        setTempWord("");
        console.log("refetching...");
    }

    const onChangeHandler = (e) => {
        setTempWord(e.target.value);
    }

    return (
        <div className="m-8">
            <div className='flex flex-col items-center'>
                <h1 className="ml-6 text-6xl font-bold font-serif text-slate-300">The Movie Search App</h1>
                <form className="m-6 flex flex-col items-center" onSubmit={SubmitHandler}>
                    <input className='text-[#e2e8f0] px-4 py-2 w-96 rounded-lg bg-[#334155] outline-0 ring-4 ring-[#e2e8f0]' type="text" onChange={onChangeHandler} value={tempWord} placeholder="Spider..." />
                    <button className="bg-[#0ea5e9] rounded-lg text-white mt-4 w-48 px-2 py-2 border-0" type="submit">Search</button>
                </form>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">{isLoading ? "Loading...." : isRefetching ? "Refreshing page..." : isError || isLoadingError ? `Error Loading Page...${error.message}` : !on ? "Switched Off...." : data?.results.errorMessage ? data?.results.errorMessage : !data?.results ? "Maximum API calls has been used for today. Try again Tomorrow!" : data?.results.map(data => {
                return (
                    <div className='flex flex-col items-center' key={data.id}>
                        <img className="w-[250px] h-[350px]" src={!data.image ? "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_Ratio0.6757_AL_.jpg" : data.image} alt={data.title} />
                        <p className='text-[14px] w-[150px] mt-4 font-bold text-center'>{data.title}</p>
                    </div>)
            })}</div>
        </div>
    );
}
