import React from 'react'
import { useRouter } from 'next/router'

function PlanetRoom() {
  const router = useRouter()
  const { planetId } = router.query
  return <div>PlanetRoom: {planetId}</div>
}

export default PlanetRoom
