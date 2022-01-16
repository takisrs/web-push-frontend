export default {
  actions: {
    getNotification({ dispatch }, payload) {
      return dispatch('fetch', {
        endpoint: `/notifications/${payload.id}`,
      });
    },

    getNotifications({ dispatch }, payload) {
      return dispatch('fetch', {
        endpoint: `/notifications?page=${payload.page}`,
      });
    },

    deleteNotification({ dispatch }, payload) {
      return dispatch('fetch', {
        endpoint: `/notifications/${payload.id}`,
        method: 'DELETE',
        updateLoadingState: false,
      });
    },

    copyNotification({ dispatch }, payload) {
      return dispatch('fetch', {
        endpoint: `/notifications/${payload.id}`,
        method: 'COPY',
        updateLoadingState: false,
      });
    },

    createNotification({ dispatch }, payload) {
      let notificationData = {
        title: payload.title,
        message: payload.message,
        image: payload.image,
        icon: payload.icon,
        badge: payload.badge,
        vibrate: payload.vibrate,
        tag: 'alert',
        renotify: true,
        status: payload.status,
        scheduledAt: payload.scheduledAt,
      };

      if (payload.url) {
        notificationData = {
          ...notificationData,
          data: {
            url: payload.url,
          },
          actions: [
            {
              action: 'confirm',
              title: 'Read More',
            },
            {
              action: 'cancel',
              title: 'Close',
            },
          ],
        };
      }

      return dispatch('fetch', {
        endpoint: '/notifications',
        method: 'POST',
        payload: JSON.stringify(notificationData),
      });
    },

    editNotification({ dispatch }, payload) {
      let notificationData = {
        title: payload.title,
        message: payload.message,
        image: payload.image,
        icon: payload.icon,
        badge: payload.badge,
        vibrate: payload.vibrate,
        status: payload.status,
        data: {
          url: payload.url,
        },
        scheduledAt: payload.scheduledAt,
      };

      return dispatch('fetch', {
        endpoint: `/notifications/${payload.id}`,
        method: 'PUT',
        payload: JSON.stringify(notificationData),
      });
    },
  },
};
