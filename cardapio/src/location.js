if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(geo_success, geo_error, {
    enableHighAccuracy: true,

  });
} else {
  console.error("Não Disponivel no teu navegador");
}

async function geo_success(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  const loadingElement = document.querySelector('#loading-restaurantes');
  if (loadingElement) {
    loadingElement.style.display = 'flex';

  }

  const restaurantes = await buscarRestaurantes(lat, lon);
  
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }

  const listaLojas = restaurantes.map(rest => {
    const distancia = calcDist(lat, lon, rest.lat, rest.lon); 
    return `
    <div class="localizacao-card">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&amp;fit=crop&amp;w=400&amp;q=80"
              alt="${rest.tags.name}" class="localizacao-img">
            <div class="localizacao-card-conteudo">
              <h2 class="localizacao-nome">${rest.tags.name}</h2>
              <p class="localizacao-endereco">${rest.tags["addr:street"]}, ${rest.tags["addr:housenumber"]} - ${rest.tags["addr:suburb"]}</p>
              <span class="localizacao-distancia">${distancia.toFixed(0,2)}m de você</span>
            </div>
          </div>
          `;
  }).join("");

  console.log(restaurantes)
  
  document.querySelector('#loc-card').innerHTML = listaLojas
}

function geo_error(error) {
  console.error("Erro ao buscar sua localizacao:", error);
  
  const loadingElement = document.querySelector('#loading-restaurantes');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
  
  const locCard = document.querySelector('#loc-card');
  if (locCard) {
    locCard.innerHTML = `
      <div class="error-message">
        <p>Não foi possível obter sua localização. Por favor, verifique as permissões do navegador.</p>
      </div>
    `;
  }
}

async function buscarRestaurantes(lat, lon) {
  const query = `
    [out:json];
    node["amenity"="restaurant"](around:1200, ${lat}, ${lon});
    out;
  `;

  const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);

  const response = await fetch(url);
  const data = await response.json();

  return data.elements;
}

// Fórmula de Haversine
function calcDist(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = v => v * Math.PI / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
