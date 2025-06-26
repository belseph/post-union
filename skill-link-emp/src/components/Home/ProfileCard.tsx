import { Link } from "react-router-dom"


export const ProfileCard = ()=>{
  return(
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <div className="flex flex-row gap-2 pb-4">
        <img
          className="w-12 h-12 rounded-full object-cover" 
          src={"https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"} alt="Profile" />
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold">John Doe</h3>
          <p className="text-white/70 text-sm">Enprendedor</p>
        </div>
      </div>
    <h3 className="font-semibold text-white mb-4">Estadísticas</h3>
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-white/70 text-sm">Publicaciones</span>
        <span className="font-medium text-white">{7}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/70 text-sm">Mentorías</span>
        <span className="font-medium text-white">{6}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/70 text-sm">Proyectos</span>
        <span className="font-medium text-white">{4}</span>
      </div>
    </div>
  </div>
  )
}

