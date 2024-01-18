import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice' //register is an action
import Spinner from '../components/Spinner'
//useSelector allows us to select properties and their value from the store
//useDispatch allows to dispatch actions to the store that update state

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData //destructure

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //user, isError, isSuccess, isLoading, message - from initial state in authSlice.js
  const { isLoading } = useSelector((state) => state.auth) //our state is auth, tickets, notes

  const onChange = (e) => {
    setFormData((prevState) => ( //take prevState as input, destructure from prevState, update name with e.target.value
      {...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // NOTE: no need for useEffect here as we can catch the
  // AsyncThunkAction rejection in our onSubmit or redirect them on the
  // resolution
  // Side effects should go in event handlers where possible
  // source: - https://beta.reactjs.org/learn/keeping-components-pure#where-you-can-cause-side-effects

  const onSubmit = (e) => {
    e.preventDefault() // to prevent the default browser from submitting form to the server

    if (password !== password2) { //added the required flag in form-group for password, and password2 so we do not have to check here
      toast.error('Passwords do not match') //see notes on toast in app.js
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData)) //register from authSlice.js
        .unwrap()
        .then((user) => {
          // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
          // getting a good response from our API or catch the AsyncThunkAction
          // rejection to show an error message
          toast.success(`Registered new user - ${user.name}`)
          navigate('/')
        })
        .catch(toast.error)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}> {/* see on submit function above*/}
          <div className='form-group'> {/* form input for name*/}
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='form-group'> {/* form input for email*/}
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'> {/* form input for password */}
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>
          <div className='form-group'> {/* form input for confirming password*/}
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm password'
              required
            />
          </div>
          <div className='form-group'> {/* form input for submit button*/}
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register