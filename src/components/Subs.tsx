import { useLocalStorage } from '@mantine/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

function Subs() {
    const [catId, setCatId] = useLocalStorage<string>({
        key: 'cat_id',
        defaultValue: '',
    })
    const [subId, setSubId] = useLocalStorage<string>({
        key: 'subId',
        defaultValue: ''
    })

    const [cats, setCats] = useState([]);
    const [subs, setSubs] = useState([]);
    const [scats, setScats] = useState([]);
    return (
        <AnimatePresence>
            <ul id="menu-flters" className="flex transition-all duration-75 flex-row justify-center xl:justify-start flex-wrap gap-2 pb-4">
                {scats.length === 1 || scats.length === 0 ? <div className="cursor-default invisible border px-3 w-32 py-2">
                    {scats.length}
                </div> : scats.map((item: any) => (
                    item && item.title !== "Barchasi" ?
                        <motion.li
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}

                            key={item.id} onClick={() => setSubId(item.id)} data-filter={`.filter${item.id}`} className={`cursor-default border px-3 w-32 py-2 ${item.id === Number(subId) ? "bg-blue-400 text-white" : ''}`}>
                            {item.title}
                        </motion.li>
                        : ''
                ))}
            </ul>
        </AnimatePresence>
    )
}

export default Subs