function obtenerFechaCompleta() {
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ]
  const meses = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ]

  const fecha = new Date()

  const diaSemana = diasSemana[fecha.getDay()]
  const dia = fecha.getDate()
  const mes = meses[fecha.getMonth()]
  const año = fecha.getFullYear()

  const fechaCompleta = `${diaSemana.toUpperCase()}, ${dia}/${mes}/${año}`

  return fechaCompleta
}

export { obtenerFechaCompleta }
