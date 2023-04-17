import React from 'react'
import { motion } from 'framer-motion'
import { Recipe } from '../types/MainTypes'
import MaterialSymbolsFavoriteOutline from './MaterialSymbolsFavoriteOutline'
import { useAppDispatch } from '../app/hooks'
import { changeModalOpen, changeShowRecipe } from '../feature/categorySlice'

function List({ item }: { item: Recipe }) {
    const dispatch = useAppDispatch()

    const handleShow = (recipe: Recipe) => {
        dispatch(changeShowRecipe(recipe))
        dispatch(changeModalOpen(true))
    }

    return (
        <div onClick={() => handleShow(item)} className={`border hover:bg-slate-100 cursor-pointer w-[365px] lg:w-[405px] rounded-md my-1.5  flex justify-between items-center`}>
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


        </div>
    )
}

export default List