import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollBar from "react-perfect-scrollbar";

class Layers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            layersActive: false,
            dropdown: '',

            selectedValues: []
        }
    }

    changed = (event) => {
        const checkedArr = [];

        const { checked, value } = event.target;
        this.setState((state) => {
            if (checked) {
                return {
                    selectedValues: [...state.selectedValues, value]

                }
            }
            if (!checked) {
                const filterValue = this.state.selectedValues.filter(f => f !== value)
                return {
                    selectedValues: filterValue

                }
            }
            return null

        }, () => {


            if (checked) {

                this.props.addLayers(value)
            } else {
                
                this.props.removeLayers(value)
            }
        })


        fetchVCALayersOne = () => {
            var bodyFormData = new FormData();
            bodyFormData.append('municipality', '524 2 15 3 004')
            bodyFormData.append('ward', 2)
        
            // bodyFormData.append('ward', localStorage.getItem('ward'))
        
        
            Axios({
              method: 'post',
              url: 'http://vca.naxa.com.np/api/kvs_map_data_layers',
              data: bodyFormData,
              headers: {
                'Content-type': 'multipart/form-data',
        
              }
            }).then(res => {
        
        console.log("drop", res.data);
        
        
              this.setState({
                dropdown: res.data
              }
              )
        
            })
        
          }

    }
    componentDidMount() {
       this.props.fetchVCALayers();
        
    }
    render() {

console.log("d", this.props.dropArr);

        return (
            <div class="layers">
                <div class="layer-wrap">
                    <a class={this.state.layersActive == true ? "collapse-btn-layers active" : "collapse-btn-layers"}
                        onClick={() => this.setState({
                             layersActive: !this.state.layersActive },
                          
                             )}
                    >Layers</a>
                    <div class="collapse" style={{ display: `${this.state.layersActive == true ? "block" : "none"}` }}>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="title">Physical Resource</div>
                                <ScrollBar>
                                    <ul>

                                        {this.props.dropArr.map((item, i) => {
                                            return (
                                                <li>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id={item} name="list-1" value={item}
                                                            onChange={(e) => this.changed(e)}
                                                        />
                                                        <label class="custom-control-label" for={item}>{item} </label>
                                                    </div>
                                                </li>

                                            )
                                        })}


                                    </ul>
                                </ScrollBar>
                            </div>
                            <div class="col-md-6">
                                <div class="title">Risk and Hazard</div>
                                <ul>
                                    {
                                        this.props.dropArrHazard.map((h) => {
                                            return (
                                                <li>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id={h} name="list-part1" value={h}
                                                        onChange= {(e) => this.changed(e)}
                                                        />
                                                        <label class="custom-control-label" for={h}>{h}
                                                        </label>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }


                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect()(Layers);