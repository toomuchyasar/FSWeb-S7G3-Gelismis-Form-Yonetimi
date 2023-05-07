import React, { useEffect, useState } from 'react'
import { Button, Form , FormFeedback , FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import * as Yup from "yup";


const FormPage = () => {

  const [isFormValid, setFormValid] = useState(false);
  const [users , setUsers ] = useState([])
  const [form,setForm] = useState({
    name: "",
    surname:"",
    email:"",
    password:"",
    check: false
  })

  const [formErrors, setFormErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    check: "",
  });

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name").min(2,"should be min 2 characters"),
    surname: Yup.string().required("Please enter your surname").min(2,"should bemin 2 characters"),
    password: Yup.string().required("Please enter password").min(6,"should bemin 6 characters"),
    email: Yup.string().email("Please enter valid a email."),
    check : Yup.boolean().oneOf([true],"Please accept Terms of Services Rules"),
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", users)
  .then((res) => {
    setUsers((users) => [...users, res.data]);
  });
}  

  const HandleChange = (e) => {
    const { name , value , type , checked } = e.target;
    const val = (type === "checkbox" ? checked : value);
    setForm({...form,[name]: val})

    Yup.reach(formSchema, name)
      .validate(val)
      .then((valid) => {
        setFormErrors({...formErrors, [name]:" "});
      })
      .catch((err) => {
        setFormErrors({...formErrors, [name] : err.errors[0]});
      });
  }

    useEffect(() => {
        formSchema.
        isValid(form)
        .then((valid) => 
        setFormValid(valid))
        },[form, formSchema]);

  return (

    <div>
      <Form onSubmit={handleSubmit}>
    <FormGroup>
     <Label htmlFor='name'>Name : </Label>
     <Input 
     id='name'
     name="name"
     type='text'
     onChange={HandleChange}
     value={form.name}
     invalid={!!formErrors.name}
        />
        {formErrors.name && <FormFeedback> {formErrors.name} </FormFeedback>}
     </FormGroup>

     <br/>

     <FormGroup>
     <Label htmlFor='surname'>Surname : </Label>
     <Input 
     id='surname'
     name="surname"
     type='text'
     onChange={HandleChange}
     value={form.surname}
     invalid={!!formErrors.surname}
      />
      {formErrors.surname && <FormFeedback> {formErrors.surname} </FormFeedback>}
     </FormGroup>

     <br/>

     <FormGroup>
     <Label htmlFor='email'>E-Mail : </Label>
     <Input
     id='email'
     name='email'
     type='email'
     onChange={HandleChange}
     value={form.email}
     invalid={!!formErrors.email}
     />
     {formErrors.email && <FormFeedback> {formErrors.email} </FormFeedback>}
     </FormGroup>

     <br/>

     <FormGroup>
     <Label htmlFor='password'>Password : </Label>
     <Input 
     id='password'
     name='password'
     type="password"
     onChange={HandleChange}
     value={form.password}
     invalid={!!formErrors.password}
     />
     {formErrors.password && <FormFeedback> {formErrors.password} </FormFeedback>}
     </FormGroup>
     <br/>

     <FormGroup>
     <Label htmlFor='check'>Terms of Service : </Label>
     <Input
     id='check'
     name='check'
     type="checkbox"
     onChange={HandleChange}
     value={form.check}
     invalid={!!formErrors.check}
     />
     {formErrors.check && <FormFeedback> {formErrors.check} </FormFeedback>}
     </FormGroup>
     <br/>

     <button type='submit' disabled={!isFormValid}>Send</button>
     </Form>

    </div>
  )
}

export default FormPage