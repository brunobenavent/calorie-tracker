import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
  activities: Activity[]
}
export default function CalorieTracker({activities}: CalorieTrackerProps) {

    const caloriesConsumed = useMemo(()=> activities.reduce((total, item)=> total + (item.category === 1 ? item.calories : 0), 0), [activities])
    const caloriesBurned = useMemo(()=> activities.reduce((total, item)=> total + (item.category === 2 ? item.calories : 0), 0), [activities])
    const netCalories = useMemo(()=> caloriesConsumed - caloriesBurned , [activities])
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
      <div className="flex flex-col items-center md:flex-row justify-between gap-5 mt-10">
         <CalorieDisplay 
            calories={caloriesConsumed}
            text="consumed"
            color="text-lime-500"
         />
         <CalorieDisplay
            calories={netCalories}
            text="Diferencia"
            color= {netCalories >= 0 ? netCalories === 0 ? "text-white" : " text-lime-500" :"text-orange-500" }
         />
         <CalorieDisplay
            calories={caloriesBurned}
            text="burned"
            color="text-orange-500"
         />
        </div>
    </>
  )
}
