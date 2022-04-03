import React from 'react'
import { getAppStore } from '@store'
import { callUserChangedApi } from '@api/auth'
import { EMAIL_REGEX, PASSWORD_REGEX } from '@utils/regex'

export const isUserLoggedIn = () => {
  const { loggedInUserData = {} } = getAppStore()
  return !!Object.keys(loggedInUserData).length
}

export const generateUniqueId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

export const getYearsDiff = (startingDate = '', endingDate = '') => {
  if (!startDate || !endDate) return false
  let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10))
  if (!endingDate) {
    endingDate = new Date().toISOString().substr(0, 10) // need date in YYYY-MM-DD format
  }
  let endDate = new Date(endingDate)
  if (startDate > endDate) {
    let swap = startDate
    startDate = endDate
    endDate = swap
  }
  let startYear = startDate.getFullYear()
  let february =
    (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0
      ? 29
      : 28
  let daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  let yearDiff = endDate.getFullYear() - startYear
  let monthDiff = endDate.getMonth() - startDate.getMonth()
  if (monthDiff < 0) {
    yearDiff--
    monthDiff += 12
  }
  let dayDiff = endDate.getDate() - startDate.getDate()
  if (dayDiff < 0) {
    if (monthDiff > 0) {
      monthDiff--
    } else {
      yearDiff--
      monthDiff = 11
    }
    dayDiff += daysInMonth[startDate.getMonth()]
  }

  return yearDiff + '.' + monthDiff
}

export const getDateDiff = (startDate, endDate) => {
  return Date.parse(startDate) - Date.parse(endDate)
}

// Validate password
export const validatePassword = password => {
  return password && PASSWORD_REGEX.test(password)
}

// Validate email
export const validateEmail = email => {
  return email && EMAIL_REGEX.test(email)
}

// Get alphabets trimed from start and number not allow
export const getAlphabets = value => {
  return value.replace(/[^A-Za-z ]/gi, '').trimStart()
}

// Get number alphabets not allow
export const getNumber = value => {
  return value.replace(/[^0-9 ]/gi, '').trim()
}

// Get date 19 April 2021 and time 9:00:00 AM
export const getDateTime = d => {
  if (!d) return false
  const newDate = new Date(d)
  const date = newDate.toLocaleString('en-GB', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZone: 'UTC'
  })
  const time = newDate.toLocaleTimeString('en-GB')
  const dateTime = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(new Date(newDate))

  return { date, time, dateTime }
}

export const getDateTimestamp = (d = {}) => {
  if (!d) return false
  const { seconds = 0, nanoseconds = 0 } = d
  const newDate = new Date(seconds * 1000 + nanoseconds / 1000000)
  const dateTime = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(new Date(newDate))
  return { date: newDate, dateTime }
}

// Get input value as per type alphabets not allow
export const getInputVal = (value, type, max) => {
  if (max && value.length > Number(max)) return false
  if (type && type === 'number') {
    if (value.startsWith(0)) return false
    return Number(getNumber(value))
  } else return value.trimStart()
}

// load script dynamicly
export const loadScript = src => {
  return new Promise(resolve => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

export const getAvg = (araay = []) => {
  const total = araay.reduce((acc, c) => acc + c, 0)
  return total / araay.length || 0
}
