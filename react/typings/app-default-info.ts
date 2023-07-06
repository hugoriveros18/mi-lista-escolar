export const appDefaultInfo:ResultadosDeBusqueda[] = [
  {
    tituloPestaña: 'Cuadernos',
    orderByField: "Relevancia",
    hideUnavailableItems: true,
    maxItemsPerPage: 15,
    skusFilter: "ALL",
    simulationBehavior: "default",
    queryField: "570",
    mapField: "c"
  },
  {
    tituloPestaña: 'Escritura',
    orderByField: "Relevancia",
    hideUnavailableItems: true,
    maxItemsPerPage: 12,
    skusFilter: "ALL",
    simulationBehavior: "default",
    queryField: "570/572",
    mapField: "c,c"
  },
  {
    tituloPestaña: 'Papeles',
    orderByField: "Relevancia",
    hideUnavailableItems: true,
    maxItemsPerPage: 12,
    skusFilter: "ALL",
    simulationBehavior: "default",
    queryField: "155/218",
    mapField: "c,c"
  }
]

export const ordenarPorValues: OrderByFieldInput[] = [
  'Relevancia',
  'Ventas',
  "Más Reciente",
  "Descuento",
  "Precios Más Altos",
  "Precios Mas Bajos",
  "Nombre, Creciente",
  "Nombre, Decreciente"
]

export const ordenarPorValuesConvertidor: {[key: string]: OrderByField} = {
  'Relevancia': 'OrderByScoreDESC',
  'Ventas': 'OrderByTopSaleDESC',
  "Más Reciente": 'OrderByReleaseDateDESC',
  "Descuento": 'OrderByBestDiscountDESC',
  "Precios Más Altos": 'OrderByPriceDESC',
  "Precios Mas Bajos": 'OrderByPriceASC',
  "Nombre, Creciente": 'OrderByNameASC',
  "Nombre, Decreciente": 'OrderByNameDESC'
}

