import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (endpoint) => {

  const [resources, setResources] = useState([])

  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = async () => {
    const response = await(axios.get(endpoint))
    return response.data
  }
  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }

    const { data } = await axios.post(endpoint, newObject, config)
    setResources(resources.concat(data))
    return data
  }

  const update = async (id, newObject) => {
    const { data } = await axios.put(`${endpoint}/${id}`, newObject)
    
    const updatedResources = resources.filter(r => 
      r.id === id
        ? data
        : r
    )
    setResources(updatedResources)
    return data
  }

  return [
    resources,
    {setToken, getAll, create, update}
  ]
}