import { useState, useEffect } from "react"
import { categories } from "../data/categories"
import type { Activity } from "../types"
import {v4 as uuidv4} from 'uuid'
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
  dispatch: React.Dispatch<ActivityActions>
  state: ActivityState
} 
const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}
export default function Form({dispatch, state}: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() =>{
    if(state.activeID){
     const selectedActivity = state.activities.filter( act => act.id === state.activeID)[0]
      setActivity(selectedActivity)
    }

  }, [state.activeID])

  const handlechange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setActivity({
      ...activity,
      [e.target.id]: (e.target.id === 'name' ? e.target.value : +e.target.value)
    })
  }
  const isValidactivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0 && !isNaN(calories)
  }

  const hadleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type: 'save-acitivity', payload: {newActivity: activity}})
    setActivity(
      {
        ...initialState,
        id: uuidv4()
      }

    )
  }

  return (
    <form
        onSubmit={hadleSubmit}
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
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase disabled:opacity-10 text-white cursor-pointer"
        value={activity.category===1 ?'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidactivity() }
       
      />
    </form>
  )
}
