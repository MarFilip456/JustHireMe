import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/redux-hooks'
import { offersActions } from '../../../store/offers-slice'
import { useNavigate } from 'react-router-dom'
import useAddOffer from '../../../hooks/use-addOffer'
import Button from '../../../UI/Button'
import Card from '../../../UI/Card'
import OfferForm1 from './OfferForm1'
import OfferForm2 from './OfferForm2'
import OfferForm3 from './OfferForm3'
import OfferForm4 from './OfferForm4'
import OfferForm5 from './OfferForm5'

import classes from './OfferForm.module.css'

const OfferForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const offer = useAppSelector((state) => state.offers.addingOffer)
  const addOffer = useAddOffer(offer)

  const [formNumber, setFormNumber] = useState(0)
  // i assumed there is 5 steps
  const calculateWidth = (value: number) => {
    return ((value - 1) / 5) * 100
  }

  const startHandler = () => {
    dispatch(offersActions.addOffer({}))
    setFormNumber((prevState) => prevState + 1)
  }

  const incrementHandler = () => {
    setFormNumber((prevState) => prevState + 1)
  }
  const decrementHandler = () => {
    setFormNumber((prevState) => prevState - 1)
  }

  const addOfferHandler = () => {
    addOffer()
    navigate('/')
  }

  return (
    <Card styles={classes.main_card}>
      {formNumber === 0 && (
        <React.Fragment>
          <div className={classes.introduction_title}>
            <h1>Here you can add new offers.</h1>
          </div>
          <div className={classes.introduction__description}>
            <p>
              Our offer creator will take you through 5 steps. In the end you
              will be able to preview the effect of your work. In case of a
              mistake or a change of mind, you can always take a step back and
              implement any changes.
            </p>
            <p>Start when you`&apos`re ready!</p>
          </div>
        </React.Fragment>
      )}
      {formNumber !== 0 && (
        <div className={classes.progress_bar__container}>
          <p>Completed: {Math.round(calculateWidth(formNumber))}%</p>
          <div className={classes.progress_bar__background}>
            <div
              className={classes.progress_bar__fill}
              style={{ width: calculateWidth(formNumber).toString() + '%' }}
            />
          </div>
        </div>
      )}
      {formNumber === 1 && (
        <OfferForm1
          onIncrement={incrementHandler}
          onDecrement={decrementHandler}
        />
      )}
      {formNumber === 2 && (
        <OfferForm2
          onIncrement={incrementHandler}
          onDecrement={decrementHandler}
        />
      )}
      {formNumber === 3 && (
        <OfferForm3
          onIncrement={incrementHandler}
          onDecrement={decrementHandler}
        />
      )}
      {formNumber === 4 && (
        <OfferForm4
          onIncrement={incrementHandler}
          onDecrement={decrementHandler}
        />
      )}
      {formNumber === 5 && (
        <OfferForm5
          onIncrement={incrementHandler}
          onDecrement={decrementHandler}
        />
      )}
      {formNumber === 6 && <p>End</p>}

      {formNumber === 0 && (
        <Button styles={classes.CTA_button} onClick={startHandler}>
          Start
        </Button>
      )}
      {formNumber === 6 && (
        <div>
          <Button onClick={decrementHandler}>Back</Button>
          <Button onClick={addOfferHandler}>Add offer!</Button>
        </div>
      )}
    </Card>
  )
}

export default OfferForm
