type OrderByField = 'OrderByReleaseDateDESC' | 'OrderByBestDiscountDESC' | 'OrderByPriceDESC' | 'OrderByPriceASC' | 'OrderByNameASC' | 'OrderByNameDESC' | 'OrderByScoreDESC' | 'OrderByTopSaleDESC'

type OrderByFieldInput = 'Relevancia' | 'Ventas' | "Más Reciente" | "Descuento" | "Precios Más Altos" | "Precios Mas Bajos" | "Nombre, Creciente" | "Nombre, Decreciente"

type SkusFilter = 'FIRST_AVAILABLE' | 'ALL_AVAILABLE' | 'ALL'

type SimulationBehavior = 'default' | 'skip'

interface ResultadosDeBusqueda {
  tituloPestaña: string
  orderByField: OrderByFieldInput
  hideUnavailableItems: boolean
  maxItemsPerPage: number
  skusFilter: SkusFilter
  simulationBehavior:SimulationBehavior
  queryField: string
  mapField: string
}

interface MiListaEscolarAppProps {
  resultadosDeBusqueda: ResultadosDeBusqueda[]
  CustomQueryResult: any
}

