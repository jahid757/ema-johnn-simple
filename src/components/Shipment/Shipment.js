import './Shipment.css'
import React from 'react';
import { useForm} from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    const onSubmit = data => console.log(data);

  console.log(loggedInUser); 

  return (
    <div className="shipment-container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>

            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Name is required</span>}

            <input name="email" defaultValue={loggedInUser.email}  ref={register({ required: true })} placeholder="Your Email"/>
            {errors.email && <span className="error">Email is required</span>}

            <input name="address" ref={register({ required: true })} placeholder="Address" />
            {errors.address && <span className="error">Address is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="Phone"/>
            {errors.phone && <span className="error">Phone is required</span>}

            <input type="submit" />
        </form>
    </div>
  );
};

export default Shipment;