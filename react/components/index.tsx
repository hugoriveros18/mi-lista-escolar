import React, { useEffect, useState } from "react";
import { useCssHandles } from 'vtex.css-handles';
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { appDefaultInfo, ordenarPorValues, ordenarPorValuesConvertidor } from "../typings/app-default-info";
import { useRuntime  } from "vtex.render-runtime"
import './styles.css';

const CSS_HANDLES = [
  'tabs__globalContainer',
  'tabs__itemContainer',
  'tabs__itemContainerSelected',
  'orderBy__globalContainer',
  'orderBy__title',
  'orderBy__listContainer',
  'orderBy__itemContainer',
  'orderBy__itemCheckbox',
  'orderBy__itemCheckboxSelected',
  'orderBy__itemName',
]

export default function MiListaEscolarApp({
  resultadosDeBusqueda = appDefaultInfo,
  CustomQueryResult
}:MiListaEscolarAppProps) {

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  const runTime = useRuntime();
  console.log('runTime',runTime)

  //SEARCH PAGE CONTEXT
  const searchPageContext = useSearchPage();

  console.log('searchPageContext', searchPageContext)

  //STATES
  const [queryActiva, setQueryActiva] = useState<ResultadosDeBusqueda | null>(null);
  const [orderBy, setOrderBy] = useState<OrderByFieldInput>('Relevancia');
  const [isOrderByListActive, setIsOrderByListActive] = useState<boolean>(false);

  //EFFECTS
  useEffect(() => {
    setQueryActiva(resultadosDeBusqueda[0])
    setOrderBy(resultadosDeBusqueda[0].orderByField)
  },[])

  //METHODS
  const handleTabChange = (result:ResultadosDeBusqueda) => {
    setQueryActiva(result)
    setOrderBy(result.orderByField)
  }

  //JSX
  return (
    <div>

      {/* PESTAÑAS */}
      <ul className={handles.tabs__globalContainer}>
        {
          resultadosDeBusqueda.map((result, index) => {
            return (
              <li
                key={index}
                onClick={() => handleTabChange(result)}
                className={`${handles.tabs__itemContainer} ${result === queryActiva ? handles.tabs__itemContainerSelected : undefined}`}
              >
                {result.tituloPestaña}
              </li>
            )
          })
        }
      </ul>

      {/* FILTROS */}
      <div>
        {/* OrderBy */}
        <div className={handles.orderBy__globalContainer}>
          <p
            className={handles.orderBy__title}
            onClick={() => setIsOrderByListActive((state) => !state)}
          >
            Ordenar por <span>{isOrderByListActive ? '-' : '+'}</span>
          </p>
          {
            isOrderByListActive
            ?
            <ul className={handles.orderBy__listContainer}>
              {
                ordenarPorValues.map((ord, index) => {
                  return (
                    <li
                      key={index}
                      className={handles.orderBy__itemContainer}
                      onClick={() => setOrderBy(ord)}
                    >
                      <div className={`${handles.orderBy__itemCheckbox} ${orderBy === ord ? handles.orderBy__itemCheckboxSelected : undefined}`}></div>
                      <p className={handles.orderBy__itemName}>{ord}</p>
                    </li>
                  )
                })
              }
            </ul>
            :
            null
          }
        </div>
      </div>

      <div>
        {
          queryActiva
          ?
          <CustomQueryResult
            querySchema={{
              orderByField: ordenarPorValuesConvertidor[orderBy],
              hideUnavailableItems: queryActiva.hideUnavailableItems,
              maxItemsPerPage: queryActiva.maxItemsPerPage,
              skusFilter: queryActiva.skusFilter,
              simulationBehavior: queryActiva.simulationBehavior,
              queryField: queryActiva.queryField,
              mapField: queryActiva.mapField
            }}
          />
          :
          null
        }
      </div>
    </div>
  )
}

