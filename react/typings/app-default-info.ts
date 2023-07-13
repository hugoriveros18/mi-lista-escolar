export const appDefaultInfo:ResultadosDeBusqueda[] = [
  {
    "tituloPestaña": "CUADERNOS",
    "orderByField": "Descuento",
    "hideUnavailableItems": true,
    "maxItemsPerPage": {
      "desktop": 12,
      "tablet": 8,
      "phone": 6
    },
    "skusFilter": "ALL",
    "simulationBehavior": "default",
    "queryField": "570/575/275",
    "mapField": "c,c,c"
  }
]

export const ordenarPorValues: OrderByFieldInput[] = [
  "Relevancia",
  "Ventas",
  "Más Reciente",
  "Descuento",
  "Precios Más Altos",
  "Precios Mas Bajos",
  "Nombre, Creciente",
  "Nombre, Decreciente"
]

export const ordenarPorValuesConvertidor: {[key: string]: OrderByField} = {
  "Relevancia": "OrderByScoreDESC",
  "Ventas": "OrderByTopSaleDESC",
  "Más Reciente": "OrderByReleaseDateDESC",
  "Descuento": "OrderByBestDiscountDESC",
  "Precios Más Altos": "OrderByPriceDESC",
  "Precios Mas Bajos": "OrderByPriceASC",
  "Nombre, Creciente": "OrderByNameASC",
  "Nombre, Decreciente": "OrderByNameDESC"
}

