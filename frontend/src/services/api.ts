import axios from 'axios'
import type { Threat } from '../types/threat'

export const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 5000,
})

export async function getThreats(): Promise<Threat[]> {
  const response = await api.get<Threat[]>('/threats')
  return response.data
}
