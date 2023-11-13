import {useState} from 'react'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const {name, email, password, confirmPassword} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({ 
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    if (password !== confirmPassword) {
      toast.error('passwords do not match')
    }
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit = {onSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id = 'name'
              name = 'name'
              value = {name}
              onChange={onChange}
              placeholder='Enter your name'
              required
              />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id = 'email'
              name = 'email'
              value = {email}
              onChange={onChange}
              placeholder='Enter your email'
              required  
              />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id = 'password'
              name = 'password'
              value = {password}
              onChange={onChange}
              placeholder='Enter your password'
              required  
              />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id = 'confirmPassword'
              name = 'confirmPassword'
              value = {confirmPassword}
              onChange={onChange}
              placeholder='Confirm your password'  
              required
              />
          </div>
          <div className="form-group">
              <button className="btn btn-block">Submit</button>
          </div>          
        </form>
      </section>
    </>
  )
}
export default Register