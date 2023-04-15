import { useEffect, useState } from 'react'
import axios from 'axios'


import './App.css'
import MaterialSymbolsFavoriteRounded from './components/MaterialSymbolsFavoriteRounded';
import MaterialSymbolsFavoriteOutline from './components/MaterialSymbolsFavoriteOutline';
import { useLocalStorage } from '@mantine/hooks';
import ModalRecipe from './components/ModalRecipe';
import { GridLoader } from 'react-spinners'
import { AnimatePresence, motion } from 'framer-motion';
import Cats from './components/Cats';
import Subs from './components/Subs';

function App() {
  const [catId, setCatId] = useLocalStorage<string>({
    key: 'cat_id',
    defaultValue: '',
  })
  const [subId, setSubId] = useLocalStorage<string>({
    key: 'subId',
    defaultValue: ''
  })

  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false);
  const [menusData, setMenusData] = useState([]);

  const fetchMenu = async () => {
    setLoading(true);
    await axios
      .get(`${import.meta.env.VITE_SOME_KEY}/site/menu/`)
      .then((res) => {
        setMenusData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  useEffect(() => {
    fetchMenu();
  }, []);




  const filtereddata =
  query === ''
    ? menusData
    : menusData.filter((recipes: any) =>
    recipes.title
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, ''))
    )

  return (
    <div>
      <div className="flex w-full">
        <input type="text" placeholder='Qidirish ...' onChange={(event) => setQuery(event.target.value)} className="border w-72 px-3 py-2" />
      </div>
      <div>
        <Cats />
      </div>


      <div>
      <Subs />
      </div>

     <div className="shadow">
        {loading ? <div className="flex flex-col h-96 justify-center items-center">
          <div> <GridLoader color='blue'  /> </div>
          <div className="mt-5 text-blue-500"> Ma'lumotlar yuklanmoqda ... </div>
          
        </div> : <div className='overflow-y-scroll h-[70vh] py-2 px-2 xl:pl-0 xl:pr-4'>
          <div className="flex justify-start gap-x-3 flex-wrap">
            {menusData.map((item: any, index) => (
              <motion.div 
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}

                key={index} className={`border w-[405px] rounded-md my-1.5  flex justify-between items-center`}>
                <div className="flex flex-row justify-start items-center text-left">
                  <div className="h-20 w-20 flex justify-center items-center ml-1">
                  <img src={item.thumbnail} className="rounded-full w-16 h-16" alt="" />
                  </div>

                  <div className="px-2">
                    <div className="">
                      <p className="truncate w-56">{item.title}</p>
                      <p className="text-md font-normal">{item.summa && item.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm"}</p>
                    </div>

                    <div className={`text-xs`}>
                      <p className="truncate w-48 xl:96">
                      {item.text}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pr-4">
                  {/* <MaterialSymbolsFavoriteRounded fontSize={24} /> */}
                  <MaterialSymbolsFavoriteOutline fontSize={24} />
                </div>


              </motion.div>
            )) }
          </div>
        </div>}
      </div>


      <ModalRecipe open={open} setOpen={setOpen} />
    </div>
  )
}

export default App
