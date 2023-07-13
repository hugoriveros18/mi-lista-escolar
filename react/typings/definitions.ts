type OrderByField = 'OrderByReleaseDateDESC' | 'OrderByBestDiscountDESC' | 'OrderByPriceDESC' | 'OrderByPriceASC' | 'OrderByNameASC' | 'OrderByNameDESC' | 'OrderByScoreDESC' | 'OrderByTopSaleDESC'

type OrderByFieldInput = 'Relevancia' | 'Ventas' | "Más Reciente" | "Descuento" | "Precios Más Altos" | "Precios Mas Bajos" | "Nombre, Creciente" | "Nombre, Decreciente"

type SkusFilter = 'FIRST_AVAILABLE' | 'ALL_AVAILABLE' | 'ALL'

type SimulationBehavior = 'default' | 'skip'

interface MaxItemsPerPage {
  desktop: number
  tablet: number
  phone: number
}

interface ResultadosDeBusqueda {
  tituloPestaña: string
  orderByField: OrderByFieldInput
  hideUnavailableItems: boolean
  maxItemsPerPage: MaxItemsPerPage
  skusFilter: SkusFilter
  simulationBehavior:SimulationBehavior
  queryField: string
  mapField: string
}

interface MiListaEscolarAppProps {
  resultadosDeBusqueda: ResultadosDeBusqueda[]
  CustomQueryResult: any
}

interface AppContentProps extends MiListaEscolarAppProps {}

interface FiltersProps {
  VtexFilters: any
}

