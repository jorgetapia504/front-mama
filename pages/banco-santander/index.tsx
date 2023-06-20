import { MainLayout } from '@/components/layouts'
import { Spinner, Spinner2 } from '@/components/ui'
import { IFilter, IFiltersBank } from '@/interfaces'
import { formatDate } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import React, { ChangeEvent, useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

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
  const [filterDisplay, setFilterDisplay] = useState('hidden')
  const [filterOpacity, setFilterOpacity] = useState('opacity-0')
  const [mouseFilter, setMouseFilter] = useState(false)
  const [file, setFile] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [newFilter, setNewFilter] = useState<IFilter>({
    code: '',
    name: '',
    rut: ''
  })
  const [loadingFilter, setLoadingFilter] = useState(false)
  const [data, setData] = useState([])
  const [loadingData, setLoadingData] = useState(false)

  const getData = async () => {
    setData([])
    setLoadingData(true)
    const response = await axios.get('https://server-mama-production.up.railway.app/santander/get-data')
    setData(response.data)
    setLoadingData(false)
  }

  useEffect(() => {
    getData()
  }, [])

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

  const viewFilter = () => {
    setFilterDisplay('flex')
    setTimeout(() => {
      setFilterOpacity('opacity-1')
    }, 50)
  }

  const closeFilter = () => {
    if (!mouseFilter) {
      setFilterOpacity('opacity-0')
      setTimeout(() => {
        setFilterDisplay('hidden')
      }, 200)
    }
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files){
      const reader = new FileReader()
      reader.readAsBinaryString(e.target.files[0])
      reader.onload = (e) => {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: "binary" })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const parsedData = XLSX.utils.sheet_to_json(sheet)
        setFile(parsedData)
      }
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    if (!file) {
      console.error('No se ha seleccionado ningún archivo.')
      return
    }
    try {
      const response = await axios.post('https://server-mama-production.up.railway.app/santander/upload-excel', file)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
    setPopupOpacity('opacity-0')
    getData()
    setTimeout(() => {
      setPopupDisplay('hidden')
      setTimeout(() => {
        setFilters({
          search: undefined,
          code: undefined,
          initialDate: undefined,
          lastDate: undefined
        })
        setFile(null)
      }, 200)
    }, 200)
  }

  const handleSubmitFilter = async () => {
    setLoadingFilter(true)
    await axios.post('https://server-mama-production.up.railway.app/santander/create-filter', newFilter)
    setLoadingFilter(false)
    setFilterOpacity('opacity-0')
    setTimeout(() => {
      setFilterDisplay('hidden')
      setTimeout(() => {
        setNewFilter({
          code: '',
          name: '',
          rut: ''
        })
      }, 200)
    }, 200)
  }

  const handleFilter = async () => {
    setData([])
    setLoadingData(true)
    const response = await axios.post('https://server-mama-production.up.railway.app/santander/get-data', filters)
    setData(response.data)
    setLoadingData(false)
  }

  return (
    <>
      <Head>
        <title>Banco Santander</title>
      </Head>
      <div onClick={closePopup} className={`${popupDisplay} ${popupOpacity} transition-opacity duration-200 absolute w-full h-screen bg-black/20`}>
        <div onMouseEnter={() => setMousePopup(true)} onMouseLeave={() => setMousePopup(false)} className={`p-4 bg-white rounded-md shadow-md w-[500px] m-auto`}>
          <h2 className='text-xl mb-4'>Subir datos</h2>
          <p className='mb-4'>Subir archivo Excel con la cartola del banco.</p>
          <input type='file' onChange={handleFileUpload} className='mb-4' />
          <button onClick={handleSubmit} className='bg-teal-500 my-auto block text-white w-full h-10 rounded'>{loading ? <Spinner2 /> : 'Subir'}</button>
        </div>
      </div>
      <div onClick={closeFilter} className={`${filterDisplay} ${filterOpacity} transition-opacity duration-200 absolute w-full h-screen bg-black/20`}>
        <div onMouseEnter={() => setMouseFilter(true)} onMouseLeave={() => setMouseFilter(false)} className={`p-4 bg-white rounded-md shadow-md w-[500px] m-auto`}>
          <h2 className='text-xl mb-4'>Agregar filtro</h2>
          <p className='mb-4'>Ingresa los datos de la empresa o persona para poder segmentar la información</p>
          <p className='mb-2 text-sm'>Rut</p>
          <input type='text' placeholder='Rut' onChange={(e: ChangeEvent<HTMLInputElement>) => setNewFilter({ ...newFilter, rut: e.target.value })} value={newFilter.rut} className='w-full p-1.5 border mb-4 rounded text-sm' />
          <p className='text-sm mb-2'>Nombre</p>
          <input type='text' placeholder='Nombre' onChange={(e: ChangeEvent<HTMLInputElement>) => setNewFilter({ ...newFilter, name: e.target.value })} value={newFilter.name} className='w-full p-1.5 border mb-4 rounded text-sm' />
          <p className='text-sm mb-2'>Tipo</p>
          <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewFilter({ ...newFilter, code: e.target.value })} value={newFilter.code.slice(0,1) === '1' ? '1' : newFilter.code.slice(0,1) === '2' ? '2' : newFilter.code.slice(0,1) === '3' ? '3' : ''} className='w-full p-1.5 border mb-4 rounded text-sm'>
            <option>Seleccionar tipo</option>
            <option value='1'>Ingreso</option>
            <option value='2'>Egreso</option>
            <option value='3'>Movimientos socios</option>
          </select>
          {
            newFilter.code?.substring(0, 1) === '1'
              ? (
                <>
                  <p className='text-sm mb-2'>Tipo de ingreso</p>
                  <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewFilter({ ...newFilter, code: e.target.value })} className='w-full p-1.5 border mb-4 rounded text-sm'>
                    <option>Seleccionar tipo de ingreso</option>
                    <option value='11'>Clientes</option>
                  </select>
                </>
              )
              : ''
          }
          {
            newFilter.code?.substring(0, 1) === '2'
              ? (
                <>
                  <p className='text-sm mb-2'>Tipo de egreso</p>
                  <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewFilter({ ...newFilter, code: e.target.value })} className='w-full p-1.5 border mb-4 rounded text-sm'>
                    <option>Seleccionar tipo de egreso</option>
                    <option value='21'>Proveedores</option>
                    <option value='22'>Sueldos</option>
                    <option value='23'>Banco</option>
                    <option value='24'>Gastos generales</option>
                    <option value='25'>Pagos cheques</option>
                    <option value='26'>Transferencias generales</option>
                    <option value='27'>Impuestos</option>
                  </select>
                </>
              )
              : ''
          }
          {
            newFilter.code?.substring(0, 2) === '11'
              ? (
                <>
                  <p className='text-sm mb-2'>Tipo de cliente</p>
                  <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewFilter({ ...newFilter, code: e.target.value })} className='w-full p-1.5 border mb-4 rounded text-sm'>
                    <option>Seleccionar tipo de cliente</option>
                    <option value='111'>Transbank</option>
                    <option value='112'>Efectivo</option>
                    <option value='113'>Transferencia directa</option>
                  </select>
                </>
              )
              : ''
          }
          {
            newFilter.code?.substring(0, 2) === '21'
              ? (
                <>
                  <p className='text-sm mb-2'>Tipo de proveedor</p>
                  <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewFilter({ ...newFilter, code: e.target.value })} className='w-full p-1.5 border mb-4 rounded text-sm'>
                    <option>Seleccionar tipo de proveedor</option>
                    <option value='211'>Maderas</option>
                    <option value='212'>Quincalleria</option>
                  </select>
                </>
              )
              : ''
          }
          <button onClick={handleSubmitFilter} className='bg-teal-500 my-auto block text-white w-full h-10 rounded'>{loadingFilter ? <Spinner2 /> : 'Crear'}</button>
        </div>
      </div>
      <MainLayout>
        <main className='px-2 py-4'>
          <div className='m-auto w-full max-w-[1280px] flex flex-col gap-4'>
            <div className='flex gap-2 justify-between'>
              <h1 className='text-3xl'>Banco Santander</h1>
              <div className='flex gap-2'>
                <button onClick={viewFilter} className='h-fit my-auto px-8 py-2 rounded'>Agregar filtro</button>
                <button onClick={viewPopup} className='bg-teal-500 h-fit my-auto text-white px-8 py-2 rounded'>Subir nuevos datos</button>
              </div>
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
                <button className={`p-6 border ${filters.code?.substring(0, 1) === '3' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '3'})}>
                  <p>Movimientos socios</p>
                  <p>s - 3</p>
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
                        <p>Pagos cheques</p>
                        <p>ec - 25</p>
                      </button>
                      <button className={`p-4 border ${filters.code.substring(0, 2) === '26' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '26'})}>
                        <p>Transferencias</p>
                        <p>et - 26</p>
                      </button>
                      <button className={`p-4 border ${filters.code.substring(0, 2) === '27' ? 'border-sky-500 text-sky-500' : ''} rounded-lg`} onClick={() => setFilters({...filters, code: '27'})}>
                        <p>Impuestos</p>
                        <p>ei - 27</p>
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
              <button onClick={handleFilter} className='bg-teal-500 h-fit my-auto text-white px-8 py-2 rounded'>Buscar</button>
            </div>
            {
              data?.length
                ? (
                  <table>
                    <thead>
                      <tr className='border-b'>
                        <th className='text-left p-2 font-medium'>Nombre</th>
                        <th className='text-left p-2 font-medium'>Monto</th>
                        <th className='text-left p-2 font-medium'>Fecha</th>
                        <th className='text-left p-2 font-medium'>Codigo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data.map((item: any) => (
                          <tr className='border-b' key={item._id}>
                            <td className='p-2'>{item.name}</td>
                            <td className='p-2'>${item.amount.toLocaleString('es')}</td>
                            <td className='p-2'>{formatDate(item.date.toString())}</td>
                            <td className='p-2'>{item.code}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )
                : ''
            }
            {
              loadingData
                ? (
                  <div className='w-full flex mt-20'>
                    <div className='w-fit m-auto'>
                      <Spinner />
                    </div>
                  </div>
                )
                : ''
            }
            {
              !loadingData && data.length === 0
                ? <p>No hay datos</p>
                : ''
            }
          </div>
        </main>
      </MainLayout>
    </>
  )
}

export default Santander