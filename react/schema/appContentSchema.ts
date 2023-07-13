export const appContentSchema = {
  title: "Configuracion Escolar App",
  type: "object",
  properties: {
    resultadosDeBusqueda: {
      title: "Lista de Busquedas",
      type: "array",
      items: {
        properties: {
          __editorItemTitle: {
            title: "Nombre Identificador",
            type: "string",
            default: ''
          },
          tituloPestaña: {
            title: "Titulo Pestaña",
            type: "string",
            default: ''
          },
          orderByField: {
            title: "Ordenar Busqueda Por:",
            type: "string",
            enum: [
              "Relevancia",
              "Ventas",
              "Más Reciente",
              "Descuento",
              "Precios Más Altos",
              "Precios Mas Bajos",
              "Nombre, Creciente",
              "Nombre, Decreciente"
            ],
            default: "Relevancia"
          },
          hideUnavailableItems: {
            title: "Ocultar Productos No Disponibles",
            type: "boolean",
            default: true
          },
          maxItemsPerPage: {
            title: "Numero Maximo de Elementos Por Pagina",
            type: "object",
            properties: {
              desktop: {
                title: "Desktop",
                type: "number",
                default: 12
              },
              tablet: {
                title: "Tablet",
                type: "number",
                default: 8
              },
              phone: {
                title: "Phone",
                type: "number",
                default: 6
              }
            }
          },
          skusFilter: {
            title: "Filtro SKU",
            type: "string",
            enum: [
              "FIRST_AVAILABLE",
              "ALL_AVAILABLE",
              "ALL",
            ],
            default: "ALL"
          },
          simulationBehavior: {
            title: "Simulation Behavior",
            type: "string",
            enum: [
              "default",
              "skip"
            ],
            default: "default"
          },
          queryField: {
            title: "Query Field",
            description: "Introduzca el valor o id a utilizar en la busqueda, como lo es el id de una categoria. ex. 155",
            type: "string",
            default: ''
          },
          mapField: {
            title: "Map Field",
            description: "Introduzca el valor que hace referencia al id señalado en el paso anterior. ex. c (coleccion ==> productClusterIds)",
            type: "string",
            default: ''
          },
        }
      }
    }
  }
}

