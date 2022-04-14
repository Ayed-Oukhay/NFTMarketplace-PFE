import { React, useState } from 'react';
import './Attributes.css'


const Attributes = (props) => {

    const [formValues, setFormValues] = useState([{ type: "", value: "" }]);

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { type: "", value: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    return (
        <form onSubmit={handleSubmit}>
            {formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                    <label style={{color:"white"}}>Type</label>
                    <input type="text" name="name" placeholder='Exp: Class' class="form-control" value={element.name || ""} onChange={e => handleChange(index, e)} />
                    <label style={{color:"white"}}>Value</label>
                    <input type="text" name="value" placeholder='Exp: Warrior' class="form-control" value={element.value || ""} onChange={e => handleChange(index, e)} />
                    {
                        index ?
                            <button type="button" class="btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>
                            : null
                    }
                </div>
            ))}
            {/* <div className="button-section"> */}
            <button class="btn btn-secondary" type="button" onClick={() => addFormFields()}>+ Add Properties</button>
            {/* </div> */}
        </form>
    );
}

export default Attributes; 