import type { Threat } from '../types/threat'

export const threats: Threat[] = [
  {
    id: 1,
    lat: 9.0765,
    lng: 7.3986,
    type: 'Insurgent Movement',
    location: 'Abuja, FCT',
  },
  {
    id: 2,
    lat: 11.8469,
    lng: 13.1603,
    type: 'Border Security Alert',
    location: 'Maiduguri, Borno',
  },
  {
    id: 3,
    lat: 12.0022,
    lng: 8.592,
    type: 'Civil Unrest',
    location: 'Kano, Kano State',
  },
  {
    id: 4,
    lat: 6.5244,
    lng: 3.3792,
    type: 'Critical Infrastructure Risk',
    location: 'Lagos, Lagos State',
  },
  {
    id: 5,
    lat: 4.8156,
    lng: 7.0498,
    type: 'Pipeline Sabotage',
    location: 'Port Harcourt, Rivers State',
  },
  {
    id: 6,
    lat: 7.3775,
    lng: 3.947,
    type: 'Armed Robbery Cluster',
    location: 'Ibadan, Oyo State',
  },
]
