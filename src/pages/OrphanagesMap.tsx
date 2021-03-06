import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {

  // nome do array e nome da função (setOrphanages) para atualizar o array
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  // executa assim que a pagina estiver disponivel
  useEffect(() => {
    // qual ação eu quero executar
    api.get('orphanages').then((response: any) => {
      setOrphanages(response.data);
    });
  }, []);
  // quando eu quero executar (quando variaveis dentro do vetor forem alteradas, se nao tiver nenhuma, executa 1x)

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Diadema</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.6914393,-46.6364344]}
        zoom={15}
        style={{ width: '100%', height: '100%'}}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/*
          <TileLayer 
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
        */}

        {orphanages.map(orphanage => {
          return (
            <Marker 
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;

/**
 * Map => recurso disponibilizado pelo react-leaflet
 * que é uma lib de mapas, para importar usar o comando
 * npm install @types/react-leaflet se der problema no import
 * dar o comando npm install @types/react-leaflet -D menos
 * D significa dependencia em ambiente de desenvolvimento
 * Map precisa que informe como propriedade center o valor de 
 * autitude e longitude do local que se quer exibir no mapa
 * para pegar essa informação, é só entrar no google maps e 
 * digitar o nome da cidade, ao carregar é só pegar os numeros
 * na url exemplo: google.com/maps/place/Diadema,+SP/@-23.6914393,-46.6364344
 * pegar os numeros entre as duas primeiras vírgulas depois de @
 * 
 * TileLayer => servidor onde eu posso pegar as imagens do mapa
 * Existem vários servidores de imagens de mapa e um dos mais conhecidos
 * é o OpenStreetMap que usamos aqui e para adicionar ele no TitleLayer
 * passamos uma url como propriedade com esse endereço:
 * https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
 * z=> zoom x=> eixo x e y => eixo y
 * assim ele vai conseguir renderizar o nosso mapa em tela
 * 
 * ou pode usar o MapBox (tem que criar conta) => depois que cria a conta,
 * logar e copiar o access token e salvar ele na aplicação em uma varável de ambiente
 * 
 * Variável de ambiente não fica exposta para o mundo, a gente consegue customizar ela
 * de acordo com o ambiente da nossa aplicação, seja desenvolvimento, produção ... 
 * e ela não vai para o github, então para a variavel ambiente ser ignorada pelo
 * e não subir para o repositório ao dar comiits git vamos adicionar o nome do 
 * arquivo dela (.env) no .gitignore na listinha de misc
 * toda variável ambiente no react precisa começar com REACT_APP
 * 
 * ou GoogleMaps (mas precisa add cartão ainda que seja versão gratuita)
 */