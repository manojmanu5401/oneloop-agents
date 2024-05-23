import React, { useRef , useState} from "react";
import Card from "../components/Card";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import { MARKERS } from "../constants";
import Select from "react-select";

const Home = () => {
  const mapRef = useRef(null);
  const position = [10.0, 10.0];
  const map =
    "https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=Ebr07Rp128vYDDp9cTLZ";
  const [option, setOption] = useState(null);
  const countries = MARKERS.map((marker) => {
    return {
      value: marker.place.split(" ")[0],
      label: marker.place.split(" ")[0].toLowerCase(),
    };
  });
  countries.sort((a,b) => a.value.localeCompare(b.value));
  const handleChange = (selectedOption) => {
    if(selectedOption!==null){
        const data = MARKERS.filter(
            (marker) => marker.place.split(" ")[0] === selectedOption.value
          );
        setOption(data)
        
    }
    else{
        setOption(null)
        
    }

  };

  return (
    <>
      <section className="flex flex-col items-center space-y-8 mx-auto max-w-8xl px-2 sm:px-6 lg:px-8 my-10">
        <div>
          <h1 className="text-2xl font-bold">ONELOOP AGENT DETAILS</h1>
        </div>
        <div className="select">
          <Select
            className="w-[300px] md:w-[500px] z-1"
            isSearchable={true}
            name="country"
            onChange={handleChange}
            options={countries}
            classNamePrefix="select"
            isClearable={true}
          />
        </div>
        <div className="flex lg:flex-row flex-col mt-5 lg:space-y-0 space-x-0 space-y-4 lg:space-x-4">
            {
                option && option.map((marker,i)=>{
                    return marker.description.map((desc,j)=>{
                        return <Card key={i+j} title={desc.title? desc.title : null} description={desc.value}/>
                    })
                })
            }
        </div>
        <div className="container rounded-xl overflow-hidden">
          <MapContainer
            center={position}
            zoom={3}
            scrollWheelZoom={true}
            ref={mapRef}
            whenCreated={(map) => (mapRef.current = map)}
          >
            <TileLayer url={map} />
            {MARKERS.map((marker) => {
              return (
                <Marker key={marker.id} position={[marker.lat, marker.lon]}>
                  <Popup>
                    {marker.description.map((desc) => {
                      return (
                        <>
                          {desc.title && (
                            <p className="text-md font-bold whitespace-pre-line">{desc.title}</p>
                          )}
                          <p className= "whitespace-pre-line">{desc.value}</p>
                        </>
                      );
                    })}
                  </Popup>
                  <Tooltip>{marker.place}</Tooltip>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </section>
    </>
  );
};

export default Home;
