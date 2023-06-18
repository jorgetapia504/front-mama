import { MainLayout } from '@/components/layouts'
import { IFiltersBank } from '@/interfaces'
import React, { ChangeEvent, useState } from 'react'

const Santander = () => {

  const [filters, setFilters] = useState<IFiltersBank>({
    search: undefined,
    code: undefined,
    initialDate: undefined,
    lastDate: undefined
  })
  const [popupDisplay, setPopupDisplay] = useState('hidden')
  const [popupOpacity, setPopupOpacity] = useState('opacity-0')
  const [mousePopup, setMousePopup] = useState(false)

  const viewPopup = () => {
    setPopupDisplay('flex')
    setTimeout(() => {
      setPopupOpacity('opacity-1')
    }, 50)
  }

  const closePopup = () => {
    if (!mousePopup) {
      setPopupOpacity('opacity-0')
      setTimeout(() => {
        setPopupDisplay('hidden')
      }, 200)
    }
  }

  return (
    <>
      <div onClick={closePopup} className={`${popupDisplay} ${popupOpacity} transition-opacity duration-200 absolute w-full h-screen bg-black/20`}>
        <div onMouseEnter={() => setMousePopup(true)} onMouseLeave={() => setMousePopup(false)} className={`p-4 bg-white rounded-md shadow-md w-[500px] m-auto`}>
          <h2 className='text-xl mb-4'>Subir datos</h2>
          <p className='mb-4'>Subir archivo Excel con la cartola del banco.</p>
          <input type='file' className='mb-4' />
          <button className='bg-teal-500 h-fit my-auto block text-white w-full py-2 rounded'>Subir</button>
        </div>
      </div>
      <MainLayout>
        <main className='px-2 py-4'>
          <div className='m-auto w-full max-w-[1280px] flex flex-col gap-4'>
            <div className='flex gap-2 justify-between'>
              <h1 className='text-3xl'>Banco Santander</h1>
              <button onClick={viewPopup} className='bg-teal-500 h-fit my-auto text-white px-8 py-2 rounded'>Subir nuevos datos</button>
            </div>
            <div className='flex gap-2'>
              <input type='text' placeholder='Buscar' onChange={(e: ChangeEvent<HTMLInputElement>) => setFilters({...filters, search: e.target.value})} value={filters.search} className='w-full p-1.5 border rounded' />
            </div>
            <div className='flex gap-4'>
              <div className='flex gap-2'>
                <button className={`p-6 border ${filters.code?.substring(0, 1) === '1' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '1'})}>
                  <p>Ingresos</p>
                  <p>i - 1</p>
                </button>
                <button className={`p-6 border ${filters.code?.substring(0, 1) === '2' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '2'})}>
                  <p>Egresos</p>
                  <p>e - 2</p>
                </button>
              </div>
            </div>
              {
                filters.code?.substring(0, 1) === '1'
                  ? (
                    <div className='flex gap-2'>
                      <button className={`p-4 border ${filters.code.substring(0, 2) === '11' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '11'})}>
                        <p>Clientes</p>
                        <p>ic - 11</p>
                      </button>
                      <button className={`p-4 border ${filters.code.substring(0, 2) === '12' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '12'})}>
                        <p>Ingresos socios</p>
                        <p>is - 12</p>
                      </button>
                    </div>
                  )
                  : ''
              }
              {
                filters.code?.substring(0, 1) === '2'
                  ? (
                    <div className='flex gap-2'>
                      <button className={`p-4 border ${filters.code.substring(0, 2) === '21' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '21'})}>
                        <p>Proveedores</p>
                        <p>ep - 21</p>
                      </button>
                      <button className={`p-4 border ${filters.code.substring(0, 2) === '22' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '22'})}>
                        <p>Sueldos</p>
                        <p>es - 22</p>
                      </button>
                      <button className={`p-4 border ${filters.code.substring(0, 2) === '23' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '23'})}>
                        <p>Banco</p>
                        <p>eb - 23</p>
                      </button>
                      <button className={`p-4 border ${filters.code.substring(0, 2) === '24' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '24'})}>
                        <p>Gastos</p>
                        <p>eg - 24</p>
                      </button>
                      <button className={`p-4 border ${filters.code.substring(0, 2) === '25' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '25'})}>
                        <p>Retiros socios</p>
                        <p>er - 25</p>
                      </button>
                      <button className={`p-4 border ${filters.code.substring(0, 2) === '26' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '26'})}>
                        <p>Pagos cheques</p>
                        <p>ec - 26</p>
                      </button>
                      <button className={`p-4 border ${filters.code.substring(0, 2) === '27' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '27'})}>
                        <p>Transferencias</p>
                        <p>et - 27</p>
                      </button>
                    </div>
                  )
                  : ''
              }
              {
                filters.code?.substring(0, 2) === '11'
                  ? (
                    <div className='flex gap-2'>
                      <button className={`p-4 border ${filters.code.substring(0, 3) === '111' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '111'})}>
                        <p>Transbank</p>
                        <p>ict - 111</p>
                      </button>
                      <button className={`p-4 border ${filters.code.substring(0, 3) === '112' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '112'})}>
                        <p>Efectivo</p>
                        <p>ice - 112</p>
                      </button>
                      <button className={`p-4 border ${filters.code.substring(0, 3) === '113' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '113'})}>
                        <p>Transferencia</p>
                        <p>icd - 113</p>
                      </button>
                    </div>
                  )
                  : ''
              }
              {
                filters.code?.substring(0, 2) === '21'
                  ? (
                    <div className='flex gap-2'>
                      <button className={`p-4 border ${filters.code.substring(0, 3) === '211' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '211'})}>
                        <p>Maderas</p>
                        <p>epa - 211</p>
                      </button>
                      <button className={`p-4 border ${filters.code.substring(0, 3) === '212' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '212'})}>
                        <p>Quincallería</p>
                        <p>epq - 212</p>
                      </button>
                    </div>
                  )
                  : ''
              }
            <div className='flex gap-2'>
              <div>
                <p className='mb-2'>Desde</p>
                <input type='date' onChange={(e: ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, initialDate: new Date(e.target.value) })} className='p-1.5 h-fit my-auto border rounded' />
              </div>
              <div>
                <p className='mb-2'>Hasta</p>
                <input type='date' onChange={(e: ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, lastDate: new Date(e.target.value) })} className='p-1.5 h-fit my-auto border rounded' />
              </div>
            </div>
            <div className='flex gap-4'>
              <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                console.log(filters)
              }} className='bg-teal-500 h-fit my-auto text-white px-8 py-2 rounded'>Buscar</button>
            </div>
          </div>
        </main>
      </MainLayout>
    </>
  )
}

export default Santander