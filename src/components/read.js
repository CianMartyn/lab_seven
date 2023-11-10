import { useEffect, useState } from "react";
import axios from "axios";
import Books from "./books";

function Read() {
   
    const [data, setData] = useState([]);

  useEffect(

    ()=>{

        axios.get('https://localhost:4000/api/books')
        .then(
            (response)=>{
                setData(response.data.myBooks)
            }
        )
        .catch(
            (error)=>{
                console.log(error);
            }
        )

    }, []
  );

    return (
        <div>
            <h2>Hello from Read Component!</h2>
            <Books myBooks={data}></Books>
        </div>
    );

}

export default Read;