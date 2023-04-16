import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks';
import { Category } from '../types/MainTypes';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { changeCategories, changeCategoryId, changeLoading, changeRecipes, changeSubCategories } from '../feature/categorySlice';

function Cats() {
  const [catId, setCatId] = useLocalStorage<string>({
    key: 'cat_id',
    defaultValue: '',
  })

  const [subId, setSubId] = useLocalStorage<string>({
    key: 'subId',
    defaultValue: ''
})

  const { categories } = useAppSelector((state) => state.categorySlice)
  const dispatch = useAppDispatch()
  const fetchCategory = async () => {
    await axios
      .get(`${import.meta.env.VITE_SOME_KEY}/site/menu/category/`)
      .then((res) => {
        let arr: Category[] = [];
        let arr2: Category[] = [];
        res.data.forEach((item: Category) => {
          if (!item.parent) {
            arr.push(item);
          } else {
            arr2.push(item);
          }
        });

        dispatch(changeCategories(arr))
        dispatch(changeSubCategories(arr2))
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const fetchMenu = async () => {
    dispatch(changeLoading(true))
    await axios
      .get(`${import.meta.env.VITE_SOME_KEY}/site/menu/`)
      .then((res) => {
        dispatch(changeRecipes(res.data))
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(changeLoading(false))
      });
  };

  useEffect(() => {
    fetchCategory()
    fetchMenu()
  }, [])

  const handleChangeCategory = (id: number) => {
    setCatId(String(id)); 
    dispatch(changeCategoryId(id));
    setSubId('')    
  }



  return (
    <ul className="flex flex-row transition-all duration-75 justify-center xl:justify-start flex-wrap gap-2 py-2">
      <li onClick={() => { setSubId(''); setCatId('') }} className={`${subId==='' && catId === '' ? "bg-blue-500 text-white" : ""} listCjasteFilter cursor-default border px-3 w-32 py-2`}>
        Hammasi
      </li>
      {categories.map((item: Category) => item.id !== 1 && (
        <li className={`${item.id === Number(catId) ? "bg-blue-500 text-white" : ""} listCjasteFilter cursor-default border px-3 w-32 py-2`} 
        key={item.id} onClick={() => handleChangeCategory(item.id)}>{item.title}</li>
      ))}
    </ul>
  )
}

export default Cats