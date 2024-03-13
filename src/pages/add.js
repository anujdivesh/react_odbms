import React, {useEffect, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Multiselect from 'multiselect-react-dropdown';
import '../css/date.css';
import TableRows from "./TableRows"
import addimage from '../assets/add.png';

const Add = () => {
    const [rowsData, setRowsData] = useState([]);
    const addTableRows = ()=>{

        const rowsInput={
          datat: datatypelist,
            fullName:'',
            emailAddress:'',
        } 
        setRowsData([...rowsData, rowsInput])
      
    }
   const deleteTableRows = (index)=>{
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
   }
  
   const handleChange = (index, evnt)=>{
    
    const { name, value } = evnt.target;
    //console.log(name, value)
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  
  
  
  }

    const [bbox, setbbox] = useState("grid");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [publisher, setPublisher]  = useState('1');
    const [organizationlist,setOrganizationList] = useState([]);
    const [datatype, setDatatype]  = useState();
    const [datatypelist,setDatatypelist] = useState([]);
    const [country, setCountry]  = useState();
    const [countrylist,setCountrylist] = useState([]);
    const [organization, setOrganization]  = useState('1');
    const [project, setProject]  = useState('TCAP');
    const [projectlist,setProjectlist] = useState([]);
    const [contact, setContact]  = useState('1');
    const [contactlist,setContactlist] = useState([]);
    const [tag, setTag]  = useState([{key:1,label:"Oceanography"}]);
    const [taglist,setTaglist] = useState([]);
    const [topic, setTopic]  = useState([{key:1,label:"Geoscience"}]);
    const [topiclist,setTopiclist] = useState([]);
    const [flag, setFlag]  = useState([{key:1,label:"raw"}]);
    const [flaglist,setflaglist] = useState([]);
    const [parameter, setParameter]  = useState('');
    const [parameterlist,setParameterlist] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [title, setTitle] = useState('Risk data collection using drone.');
    const [description, setDescription] = useState('Drone was flown over the south post part of Nanumaga.');
    const [path, setPath] = useState('/home/anuj/Desktop/angular/crews/filename.las');
    const [restricted, setRestricted] = useState(true);
    const [token, setToken] = useState('');
  
    const handleTitle = event => {
      setTitle(event.target.value);
    };
    const handleDescription = event => {
      setDescription(event.target.value);
    };
    const handlePath = event => {
      setPath(event.target.value);
    };
  
    const fetchOrganizations = () => {
        axios
          .get('https://opmdata.gem.spc.int/api/organizations')
          .then((response) => {
            const { data } = response;
            if(response.status === 200){
                //check the api call is success by stats code 200,201 ...etc
                setOrganizationList(data)
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
    const fetchcontacts = () => {
      axios
        .get('https://opmdata.gem.spc.int/api/contacts')
        .then((response) => {
          const { data } = response;
          if(response.status === 200){
              //check the api call is success by stats code 200,201 ...etc
              setContactlist(data)
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
    const fetchflag = () => {
        axios
          .get('https://opmdata.gem.spc.int/api/flags')
          .then((response) => {
            const { data } = response;
            if(response.status === 200){
              var temp=[]
              for (var i =0; i <data.length; i++){
                temp.push({key:data[i].id, label:data[i].name})
              }
                //check the api call is success by stats code 200,201 ...etc
                setflaglist(temp)
            }else{
                //error handle section 
            }
          })
          .catch((error) => console.log(error));
      };
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
  
    function onChangeValue(event) {
      setbbox(event.target.value);
      console.log(event.target.value);
    }
  
    const optionsArray = [
      { key: "au", label: "Australia" }
    ];
  
  
  
      useEffect(() => {  
        fetchOrganizations();
        fetchdatatype();
        fetchcountry();
        fetchproject();
        fetchcontacts();
        fetchtags();
        fetchtopic();
        fetchflag();
        fetchparameters();
        addTableRows();
  
        const intervalId = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000); // Update every second
    
        return () => clearInterval(intervalId); // Cleanup on component unmount
    
          },[]);
          
          const formattedTime = currentTime.toLocaleTimeString();
          const formattedDate = currentTime.toISOString().slice(0, 10);
  
      function getkeyArray(list){
        var topicarr = [];
          for( var i = 0; i< list.length; i++){
            topicarr.push(list[i]['key'])
          }
        return topicarr;
      }
  
      function formatDate(startDate){
        const date = startDate; // Current date and time
  
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
  
        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  
        return formattedDateTime;
      }
        
      const handleSubmit=(e)=>{
        console.log(rowsData)
        var arr_urls = [];
        for (var i=0; i<rowsData.length; i++){
            console.log(rowsData[i].fullName, rowsData[i].emailAddress)
            arr_urls.push({"url":rowsData[i].fullName,"path":rowsData[i].emailAddress})
        }

        const login = {username:"admin", password:'3fZd6x68FqDgi88cyN8P!'};
        const metadata = { title: title, description: description, version:"1.0.0", temporal_coverage_from: formatDate(startDate), temporal_coverage_to: formatDate(endDate), data_type: datatype, project_id: project,
          publisher_id:publisher, contact_id: contact, tag:getkeyArray(tag), country:[country],parameters: getkeyArray(parameter),extents:[], is_checked:true, is_restricted:restricted, topic: getkeyArray(topic), 
          urls:arr_urls,flag: getkeyArray(flag), user_created_id:contact};
          console.log(metadata)
          //const metadata = { title: title, description: description, temportal_coverage_from: formatDate(startDate), temportal_coverage_to: formatDate(endDate), data_type: datatype };
          
        axios.post('https://opmdata.gem.spc.int/api/auth/signin', login)
          .then(response => {
            const access = response.data.accessToken;
            const header = {
              'Content-Type': 'application/json',
              'x-access-token': access
            }
    
            axios.post('https://opmdata.gem.spc.int/api/metadata/add', metadata, {headers:header})
              .then(response2 => {
                console.log(response2.data.message)
            });
  
          });
          
       
      // const formattedDateTime = startDate.toISOString();
  
       // console.log(metadata)
        e.currentTarget.blur();
        }
  
      return (
  
  <>
  
          <div className="container">
            <br/>
          <div class="card">
    <div class="card-header  text-white" style={{backgroundColor: "#5cb85c"}}>
    <div className="col-sm-12 d-flex justify-content-start">
    <h5 class="card-title">Metadata Add</h5>
              </div>
    </div>
    <div class="card-body">
      
      <div className="row" >
      <div className="col-sm-4">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Title</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleTitle} value={title}/>
    </div>
        </div>
        <div className="col-sm-8">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Description</label> <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" onChange={handleDescription} value={description}/>
    </div>
        </div>
          </div>
          <div className="row" >
      <div className="col-sm-2">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Temportal coverage from</label> <span style={{ color: 'red' }}>*</span>
      <div style={{paddingTop:'2px',width:'900px'}}>
  
      <DatePicker wrapperClassName="datepicker" style={{marginTop:100}} selected={startDate} onChange={(date) => setStartDate(date)} />
  
    </div>
    </div>
        </div>
        <div className="col-sm-2">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Temportal coverage to</label> <span style={{ color: 'red' }}>*</span>
      <div style={{paddingTop:'2px'}}>
      <DatePicker id="exampleInputEmail1" selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
    </div>
        </div>
        <div className="col-sm-8">
        <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Parameters</label>
      <Multiselect
          displayValue="label"
          placeholder="--Select Parameters--"
          isObject={true}
          closeMenuOnSelect={false}
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
      
          </div>
          <div className="row">
      <div className="col-sm-2">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Data Type</label> <span style={{ color: 'red' }}>*</span>
      <select  className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"
              value={datatype}
              onChange={(e) => setDatatype(e.currentTarget.value)}
          >
             <option value="select">-- Select --</option>
              {datatypelist.map((item) => (
              <option key={item.id} value={item.id}>
                  {item.datatype_name}
              </option>
              ))}
          </select>
    </div>
        </div>
        <div className="col-sm-2">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Country</label> <span style={{ color: 'red' }}>*</span>
      <select  className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"
              disabled={false}
              value={country}
              onChange={(e) => setCountry(e.currentTarget.value)}
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
      
        <div className="col-sm-2">
        <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Restricted</label> <span style={{ color: 'red' }}>*</span>
      <select className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example" value={restricted}
              onChange={(e) => setRestricted(e.currentTarget.value)}>
                <option value="select">-- Select --</option>
      <option value={true}>Yes</option>
      <option value={false}>No</option>
  </select>
    </div>
        </div>
        <div className="col-sm-3">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Contact</label> <span style={{ color: 'red' }}>*</span>
      <select  className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"
              disabled={false}
              value={contact}
              onChange={(e) => setContact(e.currentTarget.value)}
          >
            <option value="select">-- Select --</option>
              {contactlist.map((item) => (
              <option key={item.id} value={item.id}>
                  {item.first_name} {item.last_name}
              </option>
              ))}
          </select>
    </div>
        </div>
        <div className="col-sm-3">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Project</label> <span style={{ color: 'red' }}>*</span>
      <select  className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"
              disabled={false}
              value={project}
              onChange={(e) => setProject(e.currentTarget.value)}
          >
            <option value="select">-- Select --</option>
              {projectlist.map((item) => (
              <option key={item.id} value={item.id}>
                  {item.project_name}
              </option>
              ))}
          </select>
    </div>
        </div>
  
          </div>
       <br/>
            <div className="row">
        <div className="col-sm-12">
                <table className="table table-bordered table-sm">
                <thead class="thead-dark">
                      <tr>
                          <th scope="col" style={{backgroundColor: "#0096FB ", color:'#FFFF', fontWeight:'normal'}}>Data Store <span style={{ color: 'red' }}>*</span></th>
                          <th scope="col" style={{backgroundColor: "#0096FB ", color:'#FFFF', fontWeight:'normal'}}>URL Path <span style={{ color: 'red' }}>*</span></th>
                          <th scope="col">
                            <img src={addimage} style={{width:"18px", height:"18px"}} onClick={addTableRows}/>
                            </th>
                      </tr>
                    </thead>
                   <tbody>
                   <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                   </tbody> 
                </table>
                </div>
          </div>
          <div className="row">
          <div className="col-sm-4">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
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
        <div className="col-sm-4">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
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
        <div className="col-sm-4">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Flags</label> <span style={{ color: 'red' }}>*</span>
      <Multiselect
          displayValue="label"
          isObject={true}
          onRemove={(event) => {
            setFlag(event);
          }}
          onSelect={(event) => {
            setFlag(event);
          }}
          options={flaglist}
          selectedValues={[{key:1,label:"raw"}]}
          showCheckbox
          avoidHighlightFirstOption 
        />
    </div>
        </div>
          </div>
          <div className="row">
        <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Created by</label>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" value="Divesh Anuj" disabled/>
    </div>
        </div>
        <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Created at</label>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" value={formattedDate+" "+formattedTime} disabled/>
    </div>
        </div>
            </div>
  
        
             
  
          </div>
          <div class="card-footer">
   
          <div className="row">
          <div className="col-sm-12 d-flex justify-content-end">
          <button type="button" class="btn btn-success" onClick={handleSubmit}>Register</button>
          </div>
          </div>
  </div>
  
    </div>
  </div>
          </>
      );
  }
  
  export default Add;