import { useLocalStorage } from '@mantine/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { Category } from '../types/MainTypes'
import { useAppSelector } from '../app/hooks'
import { useEffect, useState } from 'react'

function Subs() {
    const [catId, setCatId] = useLocalStorage<string>({
        key: 'cat_id',
        defaultValue: '',
    })
    const [subId, setSubId] = useLocalStorage<string>({
        key: 'subId',
        defaultValue: ''
    })

    const { subcategories, loading } = useAppSelector((state) => state.categorySlice)
    
    const [subs, setSubs] = useState<Category[]>([])
    useEffect(() => {
        const data: Category[] = subcategories.filter((item) => item.parent === Number(catId))
        setSubs(data)
    }, [catId, loading, catId])


    return (
        <AnimatePresence>
            <ul id="menu-flters" className="flex transition-all duration-75 flex-row justify-center xl:justify-start flex-wrap gap-2 pb-4">
                {subs.length === 1 || subs.length === 0 ? <div className="cursor-default invisible border px-3 w-32 py-2">
                    {subs.length}
                </div> : subs.map((item: Category) => (
                    item && item.title !== "Barchasi" ?
                        <motion.li
                            initial={{ y: 300, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -300, opacity: 0 }}

                            key={item.id} onClick={() => setSubId(String(item.id))} data-filter={`.filter${item.id}`} className={`cursor-default border px-3 w-32 py-2 ${item.id === Number(subId) ? "bg-blue-400 text-white" : ''}`}>
                            {item.title}
                        </motion.li>
                        : ''
                ))}
            </ul>
        </AnimatePresence>
    )
}

export default Subs