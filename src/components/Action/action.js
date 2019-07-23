export const nextMonth = () => ({
    type: 'NEXT_MONTH',
  });

export const previousMonth = () => ({
  type: 'PREVIOUS_MONTH',
});

export const currentMonth = () => ({
  type: 'CURRENT_MONTH'
})

export const openContext = (id) => ({
  type: 'OPEN_CONTEXT',
  payload: {
    id
  }
})

export const closeContext = () => ({
  type: 'CLOSE_CONTEXT',
})

export const addEvent = (time, event, description, id) => ({
  type: 'ADD_EVENT',
  payload: {
    time,
    event,
    description,
    id,
    done: false
  }
})

export const removeEvent = (id, time) => ({
  type: 'REMOVE_EVENT',
  payload: {
    id,
    time
  }
})

export const changeStatus = (id, time) => ({
  type: 'CHANGE_STATUS',
  payload: {
    id,
    time
  }
})