import { Fragment, useRef, useState, useCallback } from 'react'
import { Dialog, FocusTrap, Transition } from '@headlessui/react'
import MaterialSymbolsFavoriteOutline from './MaterialSymbolsFavoriteOutline'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { changeModalOpen, changeShow } from '../feature/categorySlice'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-loading-skeleton/dist/skeleton.css'
import IconoirCancel from './IconoirCancel'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function ModalRecipe() {
  const cancelButtonRef = useRef(null)
  const { open, showRecipe } = useAppSelector((state) => state.categorySlice)
  const dispatch = useAppDispatch()

  const [isZoomed, setIsZoomed] = useState(false)

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom)
  }, [])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => dispatch(changeModalOpen(false))}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[1000px]">
                <div className="flex flex-row flex-wrap">
                  <div className="basis-2/2 md:basis-1/2 flex justify-center items-center">
                    {showRecipe ? <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
                    <img
                      src={showRecipe.image}
                      className="h-full w-full"
                      loading='lazy'
                    />
                </ControlledZoom>  : ''}
                  </div>
                  <div className="basis-2/2 md:basis-1/2 flex flex-col w-full items-center py-5 md:py-10 px-5">
                  
                  <button onClick={() => dispatch(changeModalOpen(false))} className="absolute top-2 right-2 p-2 border-0 md:border hover:bg-slate-100 active:bg-slate-200">
                    <IconoirCancel fontSize={20} className="text-white md:text-black" />
                  </button>

                    <h2 className="text-2xl">{showRecipe?.title}</h2>
                    <span className="mt-5 px-3 bg-orange-100 text-orange-800 rounded-full">
                      {showRecipe && showRecipe.summa ? String(showRecipe.summa).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm" : ''}
                    </span>

                    <div className="flex justify-start flex-col w-full px-5">
                      <h1 className="text-xs">Tarkibi:</h1>
                      <p>{showRecipe?.text}</p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
