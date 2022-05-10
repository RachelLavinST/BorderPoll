import React, { Suspense, useRef, useState, useEffect } from "react"

import { GraphicContainer, Slide } from './style';

function Graphic(props) {
  const graphicEl = useRef(null)
  const [width, setWidth] = useState(null)

  useEffect(() => {
    setWidth(graphicEl.current.getBoundingClientRect().width)

    window.addEventListener("resize", () => { setWidth(window.innerWidth) })
    return () => window.removeEventListener('resize', setWidth(null))
  }, [])

  return (
    <GraphicContainer ref={graphicEl}>
      {
        props.data.map( (d,i) => {
          return (
            <Slide key={i} style={
              d.transition == "wipe" ?
              {"left": props.active >= i ? "0%" : "100%"}
              : {"opacity": props.active >= i ? 1 : 0}

            }>
            <img src={width < 720 ? d.mobile_image : d.image}/>
          </Slide>
        )
      })
    }
  </GraphicContainer>
)

}

export default Graphic
