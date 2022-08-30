import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (val) => val.trim() === "";
const isFiveChars = (val) => val.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
  })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    setFormInputsValidity({
      name: !isEmpty(enteredName),
      street: !isEmpty(enteredStreet),
      postalCode: isFiveChars(enteredPostal),
      city: !isEmpty(enteredCity)
    })

    const formIsValid =
      !isEmpty(enteredName) &&
      !isEmpty(enteredStreet) &&
      !isEmpty(enteredCity) &&
      isFiveChars(enteredPostal);

    if (!formIsValid) {
      return
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity
    })
  };

  const nameInputClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
  const streetInputClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
  const postalInputClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`;
  const cityInputClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code! (5 chars long)</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
