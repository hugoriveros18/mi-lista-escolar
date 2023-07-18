import React, { useContext, useEffect, useState } from "react";
import { Context } from "../ListaEscolarContext";
import { useCssHandles } from 'vtex.css-handles';
import { useDevice } from 'vtex.device-detector';
import { appDefaultInfo, ordenarPorValuesConvertidor } from "../../typings/app-default-info";
import { useRuntime } from "vtex.render-runtime"
import './styles.css';
import { appContentSchema } from "../../schema/appContentSchema";

const CSS_HANDLES = [
  'tabs__globalContainer',
  'tabs__itemContainer',
  'tabs__itemContainerSelected'
]

export default function AppContent({
  resultadosDeBusqueda = appDefaultInfo,
  CustomQueryResult
}: AppContentProps) {

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //DETECTOR DE DISPOSITIVO
  const { device } = useDevice();

  //GLOBAL CONTEXT
  const estadoGlobal = useContext(Context);

  //VTEX RUNTIME
  const runTime = useRuntime();

  //STATES
  const [queryActiva, setQueryActiva] = useState<ResultadosDeBusqueda | null>(null);

  //EFFECTS
  useEffect(() => {
    setQueryActiva(resultadosDeBusqueda[0]);
    estadoGlobal.setOrderBy(resultadosDeBusqueda[0].orderByField);
    estadoGlobal.setActiveTab(resultadosDeBusqueda[0].tituloPestaña);
  }, [])

  //METHODS
  const handleTabChange = async (result: ResultadosDeBusqueda) => {

    if(result === queryActiva) {
      return
    }

    if (Object.keys(runTime.query).length !== 0) {
      await runTime.history.replace("/mi-lista-escolar", {
        "navigationRoute": {
          "id": "store.custom#mi-lista-escolar",
          "params": {},
          "path": "/mi-lista-escolar"
        },
        "renderRouting": true,
        "scrollOptions": false
      })
    }

    await setQueryActiva(result);
    await estadoGlobal.setOrderBy(result.orderByField);
    await estadoGlobal.setActiveTab(result.tituloPestaña);
  }

  const calcularItemsPerPage = () => {
    if(device === 'desktop') {
      return queryActiva?.maxItemsPerPage.desktop
    } else if (device === 'tablet') {
      return queryActiva?.maxItemsPerPage.tablet
    } else {
      return queryActiva?.maxItemsPerPage.phone
    }
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
                className={`${handles.tabs__itemContainer} ${result.tituloPestaña === queryActiva?.tituloPestaña ? handles.tabs__itemContainerSelected : undefined}`}
              >
                {result.tituloPestaña}
              </li>
            )
          })
        }
      </ul>

      <div>
        {
          queryActiva
            ?
            <CustomQueryResult
              querySchema={{
                orderByField: ordenarPorValuesConvertidor[estadoGlobal.orderBy],
                hideUnavailableItems: queryActiva.hideUnavailableItems,
                maxItemsPerPage: calcularItemsPerPage(),
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

AppContent.schema = appContentSchema;

