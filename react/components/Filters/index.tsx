import React, { useContext, useEffect, useRef, useState } from "react";
import { useCssHandles } from 'vtex.css-handles';
import { useDevice } from 'vtex.device-detector';
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
  'filters__arrowContainer',
  'filters__arrowLeft',
  'filters__arrowRight'
]

export default function Filters({ VtexFilters }: FiltersProps) {

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //GLOBAL CONTEXT
  const estadoGlobal = useContext(Context);

  //DETECTOR DE DISPOSITIVO
  const { device } = useDevice();

  //REFERENCES
  const containerRef = useRef<any>(null);
  const filterRef = useRef<any>(null);

  //STATES
  const [isOrderByListActive, setIsOrderByListActive] = useState<boolean>(false);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  const [translateValue, setTranslateValue] = useState<number>(0);

  //METHODS
  const handleOrderSelection = (ord: OrderByFieldInput) => {
    estadoGlobal.setOrderBy(ord);
    setIsOrderByListActive(false);
  }

  const validarWidthContenedor = () => {
    if(containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth;
      const containerParentWidth = containerRef.current.parentNode.clientWidth

      if(containerWidth > containerParentWidth) {
        setIsScrollable(true);
      } else {
        setIsScrollable(false);
      }
    }
  }
  const scrollToFirst = () => {
    setTranslateValue(0);
  }
  const scrollToLast = () => {
    const containerWidth = containerRef.current.scrollWidth;
    const containerParentWidth = containerRef.current.parentNode.clientWidth;

    setTranslateValue((containerWidth - containerParentWidth) + 25);
  }


  //EFFECTS
  useEffect(() => {
    window.addEventListener('load', () => {
      validarWidthContenedor()
    })

    window.addEventListener('resize', () => {
      validarWidthContenedor()
    })

    const observer = new MutationObserver(() => {
      validarWidthContenedor();
      setTranslateValue(0);
    })

    observer.observe(filterRef.current, {childList: true, subtree: true})

    return () => {
      window.removeEventListener('load', () => {
        validarWidthContenedor();
      });
      window.removeEventListener('resize', () => {
        validarWidthContenedor();
      });
      observer.disconnect();
    };
  }, [])

  useEffect(() => {
    setTranslateValue(0);
  }, [estadoGlobal.activeTab])


  //JSX
  return (
    <>
      <div
        className={handles.orderFilters__globalContainer}
        ref={containerRef}
        style={{transform: `translateX(-${translateValue}px)`}}
      >

        {/* ORDER BY */}
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


        {/* VTEX FILTERS */}
        <div className={handles.orderBy__filterContainer} ref={filterRef}>
          <VtexFilters/>
        </div>

      </div>
      {
        (isScrollable && device === 'desktop')
        ?
          <>
            {
              translateValue !== 0
              ?
                <div
                  onClick={scrollToFirst}
                  className={`${handles.filters__arrowContainer} ${handles.filters__arrowLeft}`}
                >
                  <img
                    alt="Left arrow"
                    src="https://panamericana.vteximg.com.br/arquivos/left-arrow-mle.svg"
                  />
                </div>
              :
                null
            }
            {
              translateValue === 0
              ?
                <div
                  onClick={scrollToLast}
                  className={`${handles.filters__arrowContainer} ${handles.filters__arrowRight}`}
                >
                  <img
                    alt="Right Arrow"
                    src="https://panamericana.vteximg.com.br/arquivos/right-arrow-mle.svg"
                  />
                </div>
              :
                null
            }
          </>
        :
          null
      }
    </>
  )
}

