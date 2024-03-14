import React, {useEffect, useRef, useState} from "react";
import './test.css';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import * as ReactBootStrap from 'react-bootstrap';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import Multiselect from 'multiselect-react-dropdown';
import { MapContainer, TileLayer,FeatureGroup, Marker, Popup, Rectangle } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import {Button,Modal} from "react-bootstrap";
import JSONPretty from 'react-json-pretty';
import { MdOutlinePageview } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


const Home = () => {
  var JSONPrettyMon = require('react-json-pretty/dist/monikai');
  //MODEL
  const [infoshow, setinfoshow] = useState(false);
  const [infotext, setinfotext] = useState(false);
  const handleinfo = () => {
    setinfoshow(false)
  };

  const [infoshow2, setinfoshow2] = useState(false);
  const [infotext2, setinfotext2] = useState(false);
  const handleinfo2 = () => {
    setinfoshow2(false)
  };



  //Leaflet
  const _onEdited = e => {
    let numEdited = 0;
    e.layers.eachLayer(layer => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

  };

 const _onCreated = e => {
    let new_features_layer = e.layer;
    var extent_def = new_features_layer._bounds._northEast.lat+","+new_features_layer._bounds._southWest.lat+","+new_features_layer._bounds._northEast.lng+","+new_features_layer._bounds._southWest.lng;
  console.log(extent_def)
  setExtent(extent_def);
  extentref.current = extent_def;
  };

  const _onDeleted = e => {
    let numDeleted = 0;
    e.layers.eachLayer(layer => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

  };
  
  const mapContainer = useRef(null);
  const baseLayer = useRef();
  const _isMounted = useRef(true);
  const [title, setTitle] = useState('');
  const [extent, setExtent] = useState('');
  const extentref = useRef('');
  const titleref = useRef('%');
  const countryref = useRef('%');
  const datatyperef = useRef('%');
  const projectref = useRef('%');
  const isMarkerRef = useRef();
  const positionRef = useRef([0.878032, 185.843298]);
  const zoomRef = useRef(3);
  const markerRef = useRef([51.505, -0.09])
  const bboxRef = useRef([[-20.3034175184893,181.97255105015114],[-15.241789855961722,175.9708637472084]]);
  const countryFlagRef = useRef(require('../flags/FJI.png'))
  const [players, setPlayers] =useState([]);
  const [loading, setLoading] =useState(true);
  const [loading2, setLoading2] =useState(true);
  const [obsSource, setobsSource] =useState([]);
  const [parameter, setParameter]  = useState('');
  const [parameterlist,setParameterlist] = useState([]);
  const [country, setCountry]  = useState();
  const [countrylist,setCountrylist] = useState([]);
  const [datatype, setDatatype]  = useState();
  const [datatypelist,setDatatypelist] = useState([]);
  const [project, setProject]  = useState('');
  const [projectlist,setProjectlist] = useState([]);
  const [tag, setTag]  = useState([{key:1,label:"Oceanography"}]);
  const [taglist,setTaglist] = useState([]);
  const [topic, setTopic]  = useState([{key:1,label:"Geoscience"}]);
  const [topiclist,setTopiclist] = useState([]);
  const [checked, setChecked] = React.useState(false);


  const handleClick = (e) => {
      setChecked(!checked)
      e.currentTarget.blur();
    }
  const getPlayerData = async (e) => {
      try{
        if (checked){

          setLoading(false)
          setobsSource([])
          var myarray = extent.split(',');
          console.log(myarray)
          const data2 = await axios.get("https://opmdata.gem.spc.int/api/metadata/findByExtent?minx="+myarray[3]+"&maxx="+myarray[2]+"&miny="+myarray[0]+"&maxy="+myarray[1]);
          let counter = 1;
          console.log(data2.data)
          for (var i=0; i<data2.data.length; i++){
              let temp = [];
              var country = data2.data[i].countries[0].country_name;
              var title = data2.data[i].title;
              var datatype = data2.data[i].data_type.datatype_code;
              var project = data2.data[i].project.project_code;
              var is_restricted = data2.data[i].is_restricted;
              var email = data2.data[i].contact.email;
              var version = data2.data[i].version;
              temp.push({
                  "id":counter,
                  "idx":data2.data[i].id,
                  "title":title,
                  "datatype":datatype,
                  "country":country.toString(),
                  "project":project,
                  "is_restricted":is_restricted,
                  "email":email,
                  "version":version
              })
              counter = counter + 1;
              setobsSource(prevData =>[...prevData, ...temp]);
          }

          setPlayers(data2.data)
          setLoading(true)
        }
        else{
          setLoading(false)
          setobsSource([])
          const params = {
              title:titleref.current,
              datatype_id:datatyperef.current,
              country:countryref.current,
              parameters:"%",
              tag:"%",
              topic:"%",
              project:projectref.current
          
          }

          const data2 = await axios.post("https://opmdata.gem.spc.int/api/metadata/findByMultipleParam", params);
          let counter = 1;
          console.log(data2.data)
          for (var i=0; i<data2.data.length; i++){
              let temp = [];
              var country = data2.data[i].countries[0].country_name;
              var title = data2.data[i].title;
              var datatype = data2.data[i].data_type.datatype_code;
              var project = data2.data[i].project.project_code;
              var is_restricted = data2.data[i].is_restricted;
              var email = data2.data[i].contact.email;
              var version = data2.data[i].version;
              temp.push({
                  "id":counter,
                  "idx":data2.data[i].id,
                  "title":title,
                  "datatype":datatype,
                  "country":country.toString(),
                  "project":project,
                  "is_restricted":is_restricted,
                  "email":email,
                  "version":version
              })
              counter = counter + 1;
              setobsSource(prevData =>[...prevData, ...temp]);
          }

          setPlayers(data2.data)
          setLoading(true)
        }
      }
      catch (e){
          console.log(e);
      }
  }
  const fetchparameters = () => {
    axios
      .get('https://opmdata.gem.spc.int/api/parameters')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
          var temp=[]
          for (var i =0; i <data.length; i++){
            temp.push({key:data[i].short_name, label:data[i].standard_name})
          }
            //check the api call is success by stats code 200,201 ...etc
            setParameterlist(temp)
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchtags = () => {
    axios
      .get('https://opmdata.gem.spc.int/api/tags')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
          var temp=[]
          for (var i =0; i <data.length; i++){
            temp.push({key:data[i].id, label:data[i].name})
          }
            //check the api call is success by stats code 200,201 ...etc
            setTaglist(temp)
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchdatatype = () => {
    axios
      .get('https://opmdata.gem.spc.int/api/datatypes')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
            //check the api call is success by stats code 200,201 ...etc
            setDatatypelist(data)
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchcountry = () => {
    axios
      .get('https://opmdata.gem.spc.int/api/countries')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
            //check the api call is success by stats code 200,201 ...etc
            setCountrylist(data)
            
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchproject = () => {
    axios
      .get('https://opmdata.gem.spc.int/api/projects')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
            //check the api call is success by stats code 200,201 ...etc
            setProjectlist(data)
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchtopic = () => {
    axios
      .get('https://opmdata.gem.spc.int/api/topics')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
          var temp=[]
          for (var i =0; i <data.length; i++){
            temp.push({key:data[i].id, label:data[i].name})
          }
            //check the api call is success by stats code 200,201 ...etc
            setTopiclist(temp)
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };
  const columns = [
      {dataField: "id", text:"ID",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "title", text:"Title",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "datatype", text:"Data Type",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "country", text:"Country",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "project", text:"Project",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "is_restricted", text:"Restricted",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "email", text:"Contact",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "version", text:"Version",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "edit", text:"Action",formatter: rankFormatter,style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}}
  ]

  const loopToGetCoord = (extents,pos) =>{
    for (var i =0; i<extents.length; i++){
      if(extents[i].extent_name === pos){
        return extents[i].value;
      }
    }
  }

  const getOneData = async (row) => {
    setLoading(false)
    const data2 = await axios.get("https://opmdata.gem.spc.int/api/metadata/id/"+row.idx);
    
    countryFlagRef.current =  require('../flags/'+data2.data[0].countries[0].country_code+'.png')

    var extents = data2.data[0].spatial_extents;
    
    for (var i =0; i<extents.length; i++){
      if(extents[i].extent_name === 'x'){
        isMarkerRef.current = true;
        break;
      }
      else{
        isMarkerRef.current = false
      }
    }
    var coord_marker = [];
    var coordbbox = [];
    if (isMarkerRef.current){
      coord_marker.push(loopToGetCoord(extents,"y"))
      coord_marker.push(loopToGetCoord(extents,"x"))
      markerRef.current = coord_marker;
      positionRef.current = coord_marker;
      zoomRef.current = 10;
    }
    else{
      var tmp = []
      tmp.push(loopToGetCoord(extents,"ymin"))
      tmp.push(loopToGetCoord(extents,"xmin"))
      coordbbox.push(tmp)
      tmp = [];
      tmp.push(loopToGetCoord(extents,"ymax"))
      tmp.push(loopToGetCoord(extents,"xmax"))
      coordbbox.push(tmp)
      console.log(coordbbox)
      bboxRef.current = coordbbox;
      positionRef.current = tmp;
      zoomRef.current = 4;
    }
    const jsonData = JSON.stringify(data2.data[0], null, 2);
    setinfotext(jsonData)
    setLoading(true)
    setinfoshow(true)
  }

  const editData = async (row) => {
    setLoading(false)
    const data2 = await axios.get("https://opmdata.gem.spc.int/api/metadata/id/"+row.idx);
    
    const jsonData = JSON.stringify(data2.data[0], null, 2);
    var metadata = {};
    /*
    var employees = []
    metadata.employees = employees;

    var firstName = "John";
    var lastName = "Smith";
    var employee = {
      "firstName": firstName,
      "lastName": lastName
    }
    metadata.employees.push(employee);*/
    metadata.title = data2.data[0].title;
    metadata.description = data2.data[0].description;
    metadata.temporal_coverage_from = data2.data[0].temporal_coverage_from;
    metadata.temporal_coverage_to = data2.data[0].temporal_coverage_to;
    metadata.language = data2.data[0].language;
    metadata.version = data2.data[0].version;
    metadata.data_type = data2.data[0].data_type.id;
    metadata.spatial_projection_id = data2.data[0].spatial_projection.id;
    metadata.license_id = data2.data[0].license.id;
    console.log(metadata)

    var dataaa = JSON.stringify(metadata,null,2)
    setinfotext2(dataaa)
    setLoading(true)
    setinfoshow2(true)
  }
  function rankFormatter(cell, row, rowIndex, formatExtraData) { 
      //console.log(cell)
      return ( 
            < div 
                style={{ textAlign: "center",
                   cursor: "pointer",
                  lineHeight: "normal" }}>
                      
              <MdOutlinePageview  style={{width:"23px",height:"23px"}} onClick={() => {getOneData(row)}}/> &nbsp;<FaEdit style={{width:"18px",height:"18px",paddingBottom:'2px' }} onClick={() => {editData(row)}}/>
       </div> 
  ); } 

  const handleTitle = event => {
    titleref.current = event.target.value;
    setTitle(event.target.value);
  };
  

  const columns2 = [
      {dataField: "0", text:"playername",style:{fontSize:'15px', padding:'1px'}},
      {dataField: "1", text:"country",style:{fontSize:'15px', padding:'1px'}},
      {dataField: "2", text:"countrycode",style:{fontSize:'15px', padding:'1px'}},
      {dataField: "edit", text:"View",formatter: rankFormatter,style:{fontSize:'15px', padding:'1px'}}
  ]

const options = {
  custom: true,
  totalSize: obsSource.length
};

const rowStyle = { backgroundColor: '#c8e6c9', height: '3px', padding: '3px 0' };


  function initMap(){
    /*
      baseLayer.current = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution: '&copy; Pacific Community (OSM)',
          detectRetina: true
      });
      //console.log('Home Rendered!!');
      mapContainer.current = L.map('map', {
          zoom: 3,
          center: [0.878032, 185.843298]
        });
        baseLayer.current.addTo(mapContainer.current); 

        var m_drawn_features = new L.FeatureGroup();
   mapContainer.current.addLayer(m_drawn_features);

   let draw_control = new L.Control.Draw({
    position: 'topleft',
    draw: {
        polyline: false,
        polygon: false,
        circle: false,
        rectangle: true,
        circlemarker: false,
        marker: false,
    },
    edit: {
      featureGroup: m_drawn_features, //REQUIRED!!
      remove: true
  }
});

mapContainer.current.addControl(draw_control);

mapContainer.current.on(L.Draw.Event.CREATED, function(e) {
  // Remove all layers (only show one location at a time)
  m_drawn_features.clearLayers();

  // Add layer with the new features
  let new_features_layer = e.layer;
  m_drawn_features.addLayer(new_features_layer);

 // setExtent(new_features_layer)
  console.log(new_features_layer._bounds)
  var extent_def = new_features_layer._bounds._northEast.lat+","+new_features_layer._bounds._southWest.lat+","+new_features_layer._bounds._northEast.lng+","+new_features_layer._bounds._southWest.lng;
  console.log(extent_def)
  setExtent(extent_def);
  extentref.current(extent_def)
  //  console.log('----------');
//   console.log('----------');
//  update_plot(new_features_layer);
});
*/
  }

  useEffect(() => {  

      if (_isMounted.current){
        initMap();

        fetchparameters();

        fetchtags();
        fetchtopic();
        fetchcountry();
        fetchdatatype();
        fetchproject();
    //    getPlayerData();
   
   
        
      }  
      return () => { _isMounted.current = false }; 
      },[]);
    return (
        <div className="container-fluid">
            <main id="bodyWrapper">
          <div id="mapWrapper">

 <div className="row">
 <div className="col-sm-6" style={{backgroundColor:'#f7f7f7'}} id="map3">
 <div className="row" style={{}}>
    <div className="col-sm-12">
    <div className="form-group form-select-sm" style={{textAlign:'left'}}>
    <label htmlFor="exampleInputEmail2" >Title</label>
    <input type="email" className="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleTitle} value={title}/>
    </div>
      </div>
      </div>
      <div className="row" style={{marginTop:'0px'}}>
    <div className="col-sm-4">
    <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Country</label> <span style={{ color: 'red' }}>*</span>
      <select  className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"
              disabled={false}
              value={country}
              onChange={(e) => {
                countryref.current = e.currentTarget.value;
                setCountry(e.currentTarget.value)
                e.currentTarget.blur();}}
                
                
          >
            <option value="select">-- Select --</option>
              {countrylist.map((item) => (
              <option key={item.country_code} value={item.country_code}>
                  {item.country_name}
              </option>
              ))}
          </select>
    </div>
      </div>
      <div className="col-sm-4">
      <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Data Type</label> <span style={{ color: 'red' }}>*</span>
      <select  className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"
              value={datatype}
              onChange={(e) => {
                datatyperef.current = e.currentTarget.value;
                setDatatype(e.currentTarget.value)
                e.currentTarget.blur();}}
          >
             <option value="select">-- Select --</option>
              {datatypelist.map((item) => (
              <option key={item.datatype_code} value={item.datatype_code}>
                  {item.datatype_name}
              </option>
              ))}
          </select>
    </div>

  </div>
  <div className="col-sm-4">
  <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Project</label> <span style={{ color: 'red' }}>*</span>
      <select  className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"
              disabled={false}
              value={project}
              onChange={(e) => {
                projectref.current = e.currentTarget.value;
                setProject(e.currentTarget.value)
                e.currentTarget.blur();}}
          >
            <option value="select">-- Select --</option>
              {projectlist.map((item) => (
              <option key={item.project_code} value={item.project_code}>
                  {item.project_name}
              </option>
              ))}
          </select>
    </div>

  </div>
      </div>
      <div className="row" style={{marginTop:'0px'}}>
    <div className="col-sm-6">
    <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Parameters</label>
      <Multiselect
          backgroundcolor="#0e1111" 
          displayValue="label"
          placeholder="--Select Parameters--"
          isObject={true}
          closeOnSelect={false}
          blurInputOnSelect={true}
          closeMenuOnSelect={false}
          selectionLimit={1}
          onRemove={(event) => {
            console.log(event);
          }}
          onSelect={(event) => {
            setParameter(event);
          }}
          options={parameterlist}
          showCheckbox
          avoidHighlightFirstOption
        />
    </div>
      </div>
      <div className="col-sm-6">
    <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Tag</label> <span style={{ color: 'red' }}>*</span>
      
      <Multiselect
          displayValue="label"
          isObject={true}
          closeMenuOnSelect={false}
          onRemove={(event) => {
            setTag(event);
          }}
          onSelect={(event) => {
            setTag(event);
          }}
          options={taglist}
          selectedValues={[{key:1,label:"Oceanography"}]}
          showCheckbox
          avoidHighlightFirstOption
        />
  
    </div>
      </div>
      </div>
      <div className="row" style={{marginTop:'0px'}}>
      <div className="col-sm-6">
      <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Topic</label> <span style={{ color: 'red' }}>*</span>
      <Multiselect
          displayValue="label"
          isObject={true}
          onRemove={(event) => {
            setTopic(event);
          }}
          onSelect={(event) => {
            setTopic(event);
          }}
          options={topiclist}
          selectedValues={[{key:1,label:"Geoscience"}]}
          showCheckbox
          avoidHighlightFirstOption 
        />
    </div>

  </div>
  <div className="col-sm-6">
    <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Publisher</label> <span style={{ color: 'red' }}>*</span>
      
      <Multiselect
      style={{backgroundColor:'red', color:'red', height:"5px", marginTop:"10px"}}
          displayValue="label"
          isObject={true}
          closeMenuOnSelect={false}
          options={[{key:1,label:"Pacific Community"}]}
          selectedValues={[{key:1,label:"Pacific Community"}]}
          showCheckbox
          avoidHighlightFirstOption
        />
  
    </div>
      </div>
      </div>
      <div className="row" style={{marginTop:'0px'}}>
      <div className="col-sm-4">
      <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <input className="form-check-input" type="checkbox" id="fj_ezz" name="fj_ezz" onChange={handleClick} defaultChecked={checked} />&nbsp;
  <label className="form-check-label">Activate Search by Extent</label>
        </div>
        </div>
        <div className="col-sm-8">
        {checked ?
        <div className="form-group form-select-sm" style={{textAlign:'left'}}>
    <input type="email" className="form-control form-select-sm" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Draw polygon on map" disabled value={extent}/>
    </div>
    :null}
    </div>
      </div>
      
      <div className="row" style={{marginTop:'5px'}}>
      <div className="d-flex justify-content-between">
      <div>
         
      </div>
      <div>
         
      <button type="submit" className="btn btn-primary  btn-sm" onClick={getPlayerData}>Search</button>
      </div>
 </div>
 
        </div>
      <br/>
 </div>
 <div className="col-sm-6" id="map"  style={{padding:'0', marginRight:'0%'}}>
 <MapContainer center={[0.878032, 185.843298]} zoom={3} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  />

   <FeatureGroup>
    <EditControl
      position='topleft'
      onEdited={_onEdited}
      onCreated={_onCreated}
      onDeleted={_onDeleted}
      edit={{
        edit: false
      }}
      draw={{
        rectangle: true,
        polygon: false,
        circle: false,
        marker: false,
        polyline: false,
        circlemarker: false
      }}
    />
  </FeatureGroup>
</MapContainer>

  </div>
 </div>

 <div className="row justify-content-center" style={{height:"50vh"}}>
    <div className="col-sm-12"  style={{padding:'2%', textAlign:'center'}}>
        {loading ? (
                <PaginationProvider
                pagination={ paginationFactory(options) }
                >
                {
                    ({
                    paginationProps,
                    paginationTableProps
                    }) => (
                    <div>
                        <PaginationTotalStandalone 
                        { ...paginationProps }
                        />
                        <PaginationListStandalone
                        { ...paginationProps }
                        />
                        <BootstrapTable
                        keyField="id"
                        data={ obsSource }
                        columns={ columns }
                        hover
                        { ...paginationTableProps }
                        />
                    </div>
                    )
                }
                </PaginationProvider>
        ):(
            <ReactBootStrap.Spinner animation="border" variant="primary"/>
        )}

        </div>
        </div>
          </div>
      </main>
      <Modal show={infoshow} onHide={handleinfo} size="lg">
    <Modal.Header>
      Information
      </Modal.Header>
      
        <Modal.Body>
          <div>
            <div style={{height:'200px', width:'100%'}}>
        <MapContainer center={positionRef.current} zoom={zoomRef.current} scrollWheelZoom={true}>
          
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  />
  {isMarkerRef.current ?
  <Marker position={markerRef.current}></Marker>
  :null}

  {isMarkerRef.current ? null:
   <Rectangle
   bounds={bboxRef.current}
   color="#FF5733"
 />
 }

<img className="edit-location-button" src={countryFlagRef.current} style={{width:"100px", height:"60px"}} />
</MapContainer>

</div>
<br/>
        <JSONPretty  id="json-pretty" data={infotext} theme={JSONPrettyMon} mainStyle="padding:-10em; height:300px;" valueStyle="font-size:1em"></JSONPretty>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleinfo}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>

      <Modal show={infoshow2} onHide={handleinfo2} size="lg">
    <Modal.Header>
      Information
      </Modal.Header>
      
        <Modal.Body>
          <div>
          <textarea class="form-control full-width" rows="20" placeholder="Metadata details" width="100%">
          {infotext2}
          </textarea>

         </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="warning" onClick={handleinfo2}>
            Update
          </Button>
          <Button variant="secondary" onClick={handleinfo2}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
      </div>
      
    );  
}

export default Home;