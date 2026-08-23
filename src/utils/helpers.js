export function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function defaultDays() {
  return Array.from({ length: 7 }, (_, i) => ({
    id: makeId('day'),
    name: `Day ${i + 1}`,
    description: '',
    status: 'not-started', // not-started | in-progress | completed
    exercises: []
  }))
}

export function newExercise(name = 'New Exercise') {
  return {
    id: makeId('exercise'),
    name,
    description: '',
    completed: false,
    sets: []
  }
}

export function newSet(index) {
  return {
    id: makeId('set'),
    index,
    weight: '',
    reps: '',
    notes: ''
  }
}

export function dayStats(day) {
  const exercises = day.exercises || []
  const totalExercises = exercises.length
  const totalSets = exercises.reduce((sum, ex) => sum + (ex.sets?.length || 0), 0)
  const completedExercises = exercises.filter((ex) => ex.completed).length
  const completion = totalExercises === 0 ? 0 : Math.round((completedExercises / totalExercises) * 100)
  return { totalExercises, totalSets, completedExercises, completion }
}

export function globalStats(days) {
  const totalDays = days.length
  let totalExercises = 0
  let totalSets = 0
  let totalWeightEntries = 0
  let completedDays = 0

  days.forEach((day) => {
    const s = dayStats(day)
    totalExercises += s.totalExercises
    totalSets += s.totalSets
    if (day.status === 'completed') completedDays += 1
    day.exercises?.forEach((ex) => {
      ex.sets?.forEach((set) => {
        if (set.weight !== '' && set.weight !== null && !Number.isNaN(Number(set.weight))) {
          totalWeightEntries += 1
        }
      })
    })
  })

  const workoutCompletion = totalDays === 0 ? 0 : Math.round((completedDays / totalDays) * 100)

  return { totalDays, totalExercises, totalSets, totalWeightEntries, completedDays, workoutCompletion }
}

export function isValidWorkoutData(data) {
  if (!data || typeof data !== 'object') return false
  if (!Array.isArray(data.days)) return false
  return data.days.every(
    (d) =>
      typeof d.id === 'string' &&
      typeof d.name === 'string' &&
      Array.isArray(d.exercises)
  )
}
