import Notifications from './Notifications.vue'

const NotificationStore = {
  state: [], // here the notifications will be added
  total: 0,
  removeNotification (index) {
    this.state.splice(index, 1)
  },
  notify (notification) {
    // default notification place
    if (!notification.horizontalAlign) {
      notification.horizontalAlign = 'right'
    }
    if (!notification.verticalAlign) {
      notification.verticalAlign = 'top'
    }

    // set notifcation id to track place
    notification.id = 'notification-' + ++this.total

    this.state.push(notification)
  },
  getLastNotification (horizontalAlign, verticalAlign) {
    let notifyList = this.state.filter((alert) => {
      return alert.horizontalAlign === horizontalAlign && alert.verticalAlign === verticalAlign
    })

    return notifyList[notifyList.length - 1]
  }
}

var NotificationsPlugin = {

  install (Vue) {
    Object.defineProperty(Vue.prototype, '$notifications', {
      get () {
        return NotificationStore
      }
    })
    Vue.component('Notifications', Notifications)
  }
}

export default NotificationsPlugin
