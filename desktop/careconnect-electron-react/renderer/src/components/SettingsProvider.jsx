import { createContext, useContext, useEffect, useState } from 'react'
import { DEFAULT_SETTINGS, mergeSettings } from '../utils/settings'

const SettingsContext=createContext(null)

export function SettingsProvider({children}){
  const [settings,setSettings]=useState(()=>{
    try{return mergeSettings(JSON.parse(localStorage.getItem('careconnect.settings')||'{}'))}catch{return DEFAULT_SETTINGS}
  })
  useEffect(()=>{
    localStorage.setItem('careconnect.settings',JSON.stringify(settings))
    const root=document.documentElement
    root.dataset.mode=settings.mode
    root.dataset.theme=settings.theme
    root.dataset.font=settings.fontSize
  },[settings])
  const update=(key,value)=>setSettings(s=>({...s,[key]:value}))
  const reset=()=>setSettings(DEFAULT_SETTINGS)
  return <SettingsContext.Provider value={{settings,update,reset}}>{children}</SettingsContext.Provider>
}
export const useSettings=()=>useContext(SettingsContext)
