import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_STRAPI_API });

export async function queryAllLocations(filters) {

  const { name = "", category = '' } = filters
  let query = []
  if (name) {
    query.push(`name=${name}`)
  }
  if (category) {
    query.push(`category=${category}`)
  }
  try {
    const res = await api.get(`/api/organisation?${query.join('&')}`)
    return res.data

  } catch (error) {
    return []
  }
}

