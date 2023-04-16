import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { useLocalStorage } from '@mantine/hooks';
import ModalRecipe from './components/ModalRecipe';
import { GridLoader } from 'react-spinners'
import Cats from './components/Cats';
import Subs from './components/Subs';
import { Recipe } from './types/MainTypes';
import List from './components/List';

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
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);
  const [menusData, setMenusData] = useState<Recipe[]>([]);

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


  const filtereddata: Recipe[] = query === ''
      ? menusData
      : menusData.filter((recipes: Recipe) =>
        recipes.title
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  return (
    <div>
      <div className="flex w-full">
        <input type="text" placeholder='Qidirish ...' onChange={(event: React.FormEvent<HTMLInputElement>) => setQuery(event.currentTarget.value)} className="border w-72 px-3 py-2" />
      </div>
      <div>
        <Cats />
      </div>

      <div>
        <Subs />
      </div>

      <div className="shadow">
        {loading ? <div className="flex flex-col h-96 justify-center items-center">
          <div> <GridLoader color='blue' /> </div>
          <div className="mt-5 text-blue-500"> Ma'lumotlar yuklanmoqda ... </div>

        </div> : <div className='overflow-y-scroll h-[70vh] py-2 px-2 xl:pl-0 xl:pr-4'>
          <div className="flex justify-start gap-x-3 flex-wrap">
            {menusData.map((item: Recipe, index: number) => (
              <List item={item} key={index} />
            ))}
          </div>
        </div>}
      </div>

      <ModalRecipe open={open} setOpen={setOpen} />
    </div>
  )
}

export default App
