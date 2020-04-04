import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from "../components/Sushi"

const SushiContainer = (props) => {
  console.log("sushi container", props)
  return (
    <Fragment>
      <div className="belt">
        {props.sushis.map( sushi => <Sushi key={sushi.id} sushi={sushi} eat={props.eat}/> )}
        <MoreButton handleMore={props.handleMore}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer