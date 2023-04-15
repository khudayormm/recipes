import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks';

function Cats() {
    const [catId, setCatId] = useLocalStorage<string>({
        key: 'cat_id',
        defaultValue: '',
      })

    const [cats, setCats] = useState([]);
    const [subs, setSubs] = useState([]);
    const fetchCategory = async () => {
        await axios
          .get(`${import.meta.env.VITE_SOME_KEY}/site/menu/category/`)
          .then((res) => {
            let arr: any = [];
            let arr2: any = [];
            res.data.forEach((item: any) => {
              if (!item.parent) {
                arr.push(item);
              } else {
                arr2.push(item);
              }
            });
    
            setCats(arr);
            setSubs(arr2);
          })
          .catch((err) => {
            console.log(err);
          });
      };


      useEffect(() => {
        fetchCategory()
      }, [])

      const handleClick = (e:any) => {
        if (e.type === 'click') {
          console.log('Left click');
        } else if (e.type === 'contextmenu') {
          console.log('Right click');
        }
      };


  return (
        <ul onClick={handleClick} className="flex flex-row transition-all duration-75 justify-center xl:justify-start flex-wrap gap-2 py-2">
        <li className={`${1 ? "bg-blue-500 text-white" : ""} listCjasteFilter cursor-default border px-3 w-32 py-2`}>Hammasi</li>
          {cats.map((item: any) => item.id !== 1 && (
            <li className={`${item.id === Number(catId) ? "bg-blue-500 text-white" : ""} listCjasteFilter cursor-default border px-3 w-32 py-2`} key={item.id} onClick={() => setCatId(item.id)}>{item.title}</li>
          ))}
        </ul>
  )
}

export default Cats