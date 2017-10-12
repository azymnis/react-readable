import moment from 'moment'

export function humanize(timestamp) {
  return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
}
