import React from 'react'
import { motion } from 'framer-motion'
import { Recipe } from '../types/MainTypes'
import MaterialSymbolsFavoriteOutline from './MaterialSymbolsFavoriteOutline'

function List({ item }: { item: Recipe }) {
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className={`border w-[405px] rounded-md my-1.5  flex justify-between items-center`}>
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
    )
}

export default List