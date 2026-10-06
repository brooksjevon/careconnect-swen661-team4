import { Heart } from 'lucide-react'
export default function Brand({light=false}) {
  return <div className={`brand ${light?'brand-light':''}`}><span className="brand-icon"><Heart size={18} fill="currentColor"/></span><span>CareConnect</span></div>
}
