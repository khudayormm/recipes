import { useEffect, useState } from 'react'
import './App.css'
import { useLocalStorage } from '@mantine/hooks';
import ModalRecipe from './components/ModalRecipe';
import { GridLoader } from 'react-spinners'
import Cats from './components/Cats';
import Subs from './components/Subs';
import { Recipe } from './types/MainTypes';
import List from './components/List';
import { useAppSelector } from './app/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import PhMagnifyingGlassLight from './components/PhMagnifyingGlassLight (1)';
import IconoirCancel from './components/IconoirCancel';

function App() {
  const [catId, setCatId] = useLocalStorage<string>({
    key: 'cat_id',
    defaultValue: '',
  })

  const [subId, setSubId] = useLocalStorage<string>({
    key: 'subId',
    defaultValue: ''
  })

  const [query, setQuery] = useState<string>('')
  const [list, setList] = useState<Recipe[]>([])
  const { loading, recipes } = useAppSelector((state) => state.categorySlice)
  const [filterData, setFilterData] = useState<Recipe[]>(recipes)




  useEffect(() => {
    if (catId === '') return setFilterData(recipes)
    const data = recipes.filter((item) => item.parent_category?.id === Number(catId))
    const newData = data.filter((item) => item.category?.id === Number(subId))
    if (!loading) {
      setFilterData(data)
    }
    if (subId !== '') {
      setFilterData(newData)
    }
  }, [catId, subId, loading, loading]);


  const filtereddata: Recipe[] = query === ''
    ? filterData
    : filterData.filter((item: Recipe) =>
      item.title
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, ''))
    )

  return (
    <div>
      <div className="flex items-center w-full px-2">
      <div className="relative w-96">
          <PhMagnifyingGlassLight className='absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3' fontSize={24} />
          <input type="text" placeholder='Qidirish ...' onChange={(event: React.FormEvent<HTMLInputElement>) => setQuery(event.currentTarget.value)} value={query} className="w-full border py-2 pl-10 focus:outline-1 outline-blue-500" />
          { query !== '' ? <IconoirCancel onClick={() => setQuery('')} className='absolute cursor-pointer z-10 top-0 bottom-0 w-6 h-6 my-auto hover:bg-slate-100 active:bg-slate-200 text-gray-400 right-2' fontSize={24} /> : '' }
        </div>
      </div>
      <div>
        <Cats />
      </div>

      <div>
        <Subs />
      </div>

      <div className="shadow">
        <AnimatePresence>
          {loading ? <div className="flex flex-col h-96 justify-center items-center">
            <div> <GridLoader color='blue' /> </div>
            <div className="mt-5 text-blue-500"> Ma'lumotlar yuklanmoqda ... </div>

          </div> : <div className='overflow-y-scroll h-[70vh] py-2 px-2 xl:pl-0 xl:pr-4'>
            <div className="flex justify-start gap-x-3 flex-wrap">
              {query === '' ? filterData.map((item: Recipe, index: number) => (
                <motion.div
                  key={index}
                  initial={{ y: 300, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -300, opacity: 0 }}
                >
                  <List item={item} key={index} />
                </motion.div>
              )) : filtereddata.map((item: Recipe, index: number) => (
                <motion.div
                key={index}
                  initial={{ y: 300, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -300, opacity: 0 }}
                >
                  <List item={item} key={index} />
                </motion.div>
              ))}
            </div>
          </div>}
        </AnimatePresence>
      </div>

      <ModalRecipe />
    </div>
  )
}

export default App
