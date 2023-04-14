import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false)

  const [cats, setCats] = useState([]);
  const [subs, setSubs] = useState([]);
  const [scats, setScats] = useState([]);

  const [scat, setScat] = useState(1);
  const [ssub, setSsub] = useState<any>(null);

  const [menusData, setMenusData] = useState([]);
  const [isAll, setIsAll] = useState(true)
  const [filterData, setFilterData] = useState([]);

  const fetchMenu = async () => {
    setLoading(true);
    await axios
      .get(`${import.meta.env.VITE_SOME_KEY}/site/menu/`)
      .then((res) => {
        setMenusData(res.data);
        setFilterData(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };


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
    fetchCategory();
    fetchMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = async (id: number) => {
    setLoad(true)
    setScat(id)
    setIsAll(false)
    const data: any = subs.filter((item: any) => item.parent === id);
    setScats(data);
    if ( data[0].title === "Barchasi") {
      const dataa = menusData.filter((item: any) => item.category.id === data[0].id);
      setFilterData(dataa)
    } else {
      setFilterData([])
    }
    setLoad(false)
    
  };

  const handleMenuFilter = async (id: number) => {
    setLoad(true)
    setIsAll(false)
    setSsub(id)
    const data = menusData.filter((item: any) => item.category.id === id);
    setFilterData(data)
    setLoad(false)
  };


  const handleClickAllMenu = () => {
    setLoad(true)
    setIsAll(true)
    setFilterData(menusData)
    setLoad(false)
  }


  return (
   <div>
      <div>
      <ul className='cjasteFilter'>
        <li key={'barcjasiCjaste'} onClick={handleClickAllMenu} className={`${load ? "disCjaste" : ""} listCjasteFilter ${isAll ? "activeCjasteLi" : ''}`}>Barchasi</li>
        {cats.map((item: any) => item.id !== 1 && (
            <li className={`${item.id === scat ? "activeCjasteLi" : "" } listCjasteFilter`} key={item.id} onClick={() => handleFilter(item.id)}>{item.title}</li>
              ))}
        </ul>
      </div>


      <div>
      <ul id="menu-flters">
          {/* <li data-filter="*" className="filter-active">All</li>
          <li data-filter=".filter-starters">Starters</li>
          <li data-filter=".filter-salads">Salads</li>
          <li data-filter=".filter-specialty">Specialty</li> */}

{/* <button
                  key={item.id}
                  onClick={() => handleMenuFilter(item.id)}
                  className={`${item.id === ssub ? "active" : "" } sub-btn`}
                >
                  {item.title}
                </button> */}

            {scats.map((item: any) => (
                item && item.title !== "Barchasi" ?
                <li key={item.id} onClick={() => handleMenuFilter(item.id)} data-filter={`.filter${item.id}`} className={`${load ? "disCjaste" : ""} ${item.id === ssub ? "filter-active" : ''}`}>
                    {item.title}
                </li> : ''
              ))}
        </ul>
      </div>



      <div>
      {filterData.length !== 0 && menusData.length !== 0 ? <div className='someScrollCjaste'>
        <div className='row someInnerScrollCjaste'>
       {filterData.map((item: any, index) => (
             <div key={index} className={`col-lg-6 menu-item filter${item.category.id}`}>
             <img src={item.thumbnail} className="menu-img" alt="" />
             <div className="menu-content">
               <p>{item.title}</p><span>{item.summa && item.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm"}</span>
             </div>
             <div className={`menu-ingredients`}>
               {item.text}
             </div>
           </div>
        ))}
        </div>
       </div> : ''}
      </div>
   </div>
  )
}

export default App
