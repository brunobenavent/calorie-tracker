import { useState } from "react"
import { categories } from "../data/category"
import type { Activity } from "../types"

export default function Form() {
  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: '',
    calories: 0
  })

  const handlechange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setActivity({
      ...activity,
      [e.target.id]: (e.target.id === 'name' ? e.target.value : +e.target.value)
    })
  }

  return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoría</label>
        <select
            className=" border border-slate-300 p-2 rounded-lg w-full bg-white"
            name="category"
            id="category"
            value={activity.category}
            onChange={handlechange}
        >
            {categories.map(category =>(
                <option
                    key={category.id}
                    value={category.id}
                >{category.name} </option>
            ))}

        </select>
        
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad</label>
        <input
          id = 'name'
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handlechange}
          />

      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorías</label>
        <input
          id = 'calories'
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorías. Ej. 300 ó 500"
          value={activity.calories}
          onChange={handlechange}
        />

      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
        value="Guardar Comida o Guardr Actividad"
       
      />
    </form>
  )
}
