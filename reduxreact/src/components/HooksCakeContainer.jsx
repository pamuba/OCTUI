import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
//equivalent of mapStateToProps is useSelector
import { buyCake } from '../redux'

function HooksCakeContainer() {
  const numOfCakes = useSelector(state => state.numOfCakes)
  const dispatch = useDispatch()
  return <>
    <h2>Num of Cakes - {numOfCakes}</h2>
    <button onClick={() => dispatch(buyCake())}>Buy Cake</button>
  </>;
}

export default HooksCakeContainer;