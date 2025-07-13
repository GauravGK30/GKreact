import { useEffect  , useState} from "react";

function useCurrencyInfo(currency){
    const[data,setData] = useState({})

    useEffect(()=>{
        if (!currency) return;

        const sanitizedCurrency = currency.toUpperCase().trim();
       
        fetch(`https://v6.exchangerate-api.com/v6/4163748f3b1bcce7f650d2f9/latest/${sanitizedCurrency}`)
        .then((res) => {
        if (!res.ok) throw new Error(`API returned status ${res.status}`);
        return res.json();
        })
        .then((res)=>{
            if(res.result === "success"){
                setData(res.conversion_rates);
            }else{
                throw new Error("API returned error result");
            }
        })
        .catch((err)=>{
            console.error("Failed to fetch currency data:", err);
            setData({});
        })

        console.log(data);
        
    },[currency] )


    console.log(data);
    return data
}

export default useCurrencyInfo;
