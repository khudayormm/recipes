import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { changeShow } from '../feature/categorySlice'
import Cats from './Cats'
import Subs from './Subs'
import IconoirCancel from './IconoirCancel'

export default function DrawerFilter() {
  const { show } = useAppSelector((state) => state.categorySlice)
  const dispatch = useAppDispatch()

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => dispatch(changeShow(false))}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => dispatch(changeShow(false))}
                      >
                        <span className="sr-only">Close panel</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        <button onClick={() => dispatch(changeShow(false))} className="p-2 border hover:bg-slate-100 active:bg-slate-200">
                          <IconoirCancel fontSize={20} />
                        </button>
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div>
                      <div className="mt-5 mx-2 mb-2 text-sm">Subkategoriyalar</div>
                      <Cats />
                    </div>

                    <div>
                      <div className="mt-5 mx-2 mb-2 text-sm">Subkategoriyalar</div>
                      <Subs />
                    </div>  
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
