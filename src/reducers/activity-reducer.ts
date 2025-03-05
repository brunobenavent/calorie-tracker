import { Activity } from "../types"


export type ActivityActions =
    {type: 'save-acitivity', payload: {newActivity: Activity}} |
    {type: 'set-activeId', payload: {id: Activity['id']}}|
    {type: 'delete-acitivity', payload: {id: Activity['id']}}|
    {type: 'restart-app'}



export type ActivityState = {
    activities: Activity[]
    activeID: Activity['id']

}
const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initilaState : ActivityState = {
    activities: localStorageActivities(),
    activeID: ''
}

export const activityReducer = (

    state: ActivityState = initilaState,
    action: ActivityActions

    ) =>{
    
    if(action.type==='save-acitivity'){
        let updatedActivities: Activity[] = []
        if(state.activeID){
            updatedActivities = state.activities.map(activitySt => {
                if(activitySt.id === state.activeID){
                    return action.payload.newActivity
                }
                return activitySt
            })
        }else{
            updatedActivities = [...state.activities, action.payload.newActivity]
        } 

        return {
            ...state,
            activities: updatedActivities,
            activeID: ''
        }
    }
    if(action.type==='set-activeId'){
        return {
            ...state,
            activeID: action.payload.id
        }
    }
    if(action.type==='delete-acitivity'){
        return {
            ...state,
            activities: state.activities.filter(act => act.id !== action.payload.id)
        }
    }
    if(action.type==='restart-app'){
        return {
            
            activities: [],
            activeID: ''
        }
    }
    return state
        
}