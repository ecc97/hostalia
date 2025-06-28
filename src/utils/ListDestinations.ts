export type Destination = {
  name: string
  image: string
}

const destinations: Destination[] = [
  { name: 'Bogotá', image: 'https://t3.ftcdn.net/jpg/05/25/60/40/360_F_525604089_jD3RQqQefPDtw1Mu3Ou4EJLsUMhbvkhJ.jpg' },
  { name: 'Medellín', image: 'https://st3.depositphotos.com/1867553/14824/i/450/depositphotos_148248391-stock-photo-medellin-colombia-06-october-2016.jpg' },
  { name: 'Cali', image: 'https://st2.depositphotos.com/3260949/12282/i/450/depositphotos_122829488-stock-photo-hdr-cali-colombia.jpg' },
  { name: 'Barranquilla', image: 'https://cdn.pixabay.com/photo/2019/03/26/17/52/barranquilla-4083263_1280.jpg' },
  { name: 'Cartagena', image: 'https://st3.depositphotos.com/1867553/18624/i/450/depositphotos_186246334-stock-photo-night-view-of-cartagena-de.jpg' },
  { name: 'Santa Marta', image: 'https://t3.ftcdn.net/jpg/02/82/00/92/360_F_282009272_sC4CzziBOm3QZ2nOGhD9yelsDi81K173.jpg' },
  { name: 'Bucaramanga', image: 'https://st3.depositphotos.com/1473952/12898/i/450/depositphotos_128988822-stock-photo-bucaramanga-santander-cityscape.jpg' },
  { name: 'Tunja', image: 'https://alcabama.com/blog/wp-content/uploads/2022/02/tunja-nochen-alcaldia.jpg' },
  { name: 'Pereira', image: 'https://st3.depositphotos.com/1867553/18624/i/450/depositphotos_186248858-stock-photo-pereira-colombia-novembre-15-2017.jpg' },
  { name: 'Manizales', image: 'https://st3.depositphotos.com/1473952/16196/i/450/depositphotos_161964006-stock-photo-manizales-downtown-and-cathedral.jpg' },
  { name: 'Cúcuta', image: 'https://www.shutterstock.com/image-photo/municipality-capital-norte-de-santander-600nw-2418155369.jpg' },
  { name: 'Valledupar', image: 'https://patoneando.com/wp-content/uploads/2019/11/Valledupar-patoneando-blog-de-viajes-min-scaled.jpg' },
  { name: 'Ibagué', image: 'https://t3.ftcdn.net/jpg/05/28/26/38/360_F_528263841_F639vaTaBGU2OfsAYMAFHvNm8Mk5LIwr.jpg' },
  { name: 'Armenia', image: 'https://paisajeculturalcafetero.org.co/wp-content/uploads/2022/10/Armenia2-1024x696.jpg' },
]

const randomDestinations = () => {
  const allDestinations = destinations.slice()
  const selectedDestinations: Destination[] = []

  while (selectedDestinations.length < 4) {
    const randomIndex = Math.floor(Math.random() * allDestinations.length)
    const randomDestination = allDestinations[randomIndex]

    if (!selectedDestinations.includes(randomDestination)) {
      selectedDestinations.push(randomDestination)
    }
  }

  return selectedDestinations
}

export { randomDestinations }