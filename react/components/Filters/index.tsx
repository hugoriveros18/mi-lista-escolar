import React, { useContext, useState } from "react";
import { useCssHandles } from 'vtex.css-handles';
import { ordenarPorValues } from "../../typings/app-default-info";
import { Context } from "../ListaEscolarContext";
import './styles.css';

const CSS_HANDLES = [
  'orderFilters__globalContainer',
  'orderBy__globalContainer',
  'orderBy__title',
  'orderBy__titleActive',
  'orderBy__listContainer',
  'orderBy__listContainerActive',
  'orderBy__listContainerInactive',
  'orderBy__itemContainer',
  'orderBy__itemCheckbox',
  'orderBy__itemCheckboxSelected',
  'orderBy__itemName',
  'orderBy__filterContainer',
]

export default function Filters({ VtexFilters }: FiltersProps) {

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //GLOBAL CONTEXT
  const estadoGlobal = useContext(Context);

  //STATES
  const [isOrderByListActive, setIsOrderByListActive] = useState<boolean>(false);

  //METHODS
  const handleOrderSelection = (ord: OrderByFieldInput) => {
    estadoGlobal.setOrderBy(ord);
    setIsOrderByListActive(false);
  }

  //JSX
  return (
    <div className={handles.orderFilters__globalContainer}>
      {/* OrderBy */}
      <div className={handles.orderBy__globalContainer}>
        <p
          className={`${handles.orderBy__title} ${isOrderByListActive ? handles.orderBy__titleActive : undefined}`}
          onClick={() => setIsOrderByListActive((state) => !state)}
        >
          Ordenar por
        </p>

        <ul className={`${handles.orderBy__listContainer} ${isOrderByListActive ? handles.orderBy__listContainerActive : handles.orderBy__listContainerInactive}`}>
          {
            ordenarPorValues.map((ord, index) => {
              return (
                <li
                  key={index}
                  className={handles.orderBy__itemContainer}
                  onClick={() => handleOrderSelection(ord)}
                >
                  <div className={`${handles.orderBy__itemCheckbox} ${estadoGlobal.orderBy === ord ? handles.orderBy__itemCheckboxSelected : undefined}`}></div>
                  <p className={handles.orderBy__itemName}>{ord}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className={handles.orderBy__filterContainer}>
        <VtexFilters />
      </div>
    </div>
  )
}

