import {useEffect, useState} from 'react';
import {API_KEY} from '../constants';
import {HttpClient} from '../utils';
interface Response {
  weather: Weather[];
  name: string;
}

interface Weather {
  description: string;
}

interface Response2 {
  list: Array<{
    dt_txt: string;
    weather: Array<Weather>;
  }>;
}
export default function useCallApi(lat: number, long: number) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Response>();
  const [data2, setData2] = useState<Response2>();
  console.log({lat, long});
  const callApi = async () => {
    if (!lat || !long) return;
    try {
      setLoading(true);
      const result = await HttpClient<Response>(
        `/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`,
      );
      const result2 = await HttpClient<Response2>(
        `/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`,
      );
      setData(result?.data);
      setData2(result2?.data);
      setLoading(false);
    } catch (error) {
      console.log('Error Fetching Weather ====>', error);
    }
  };
  useEffect(() => {
    callApi();
  }, []);
  return {
    loading,
    data,
    data2,
  };
}
