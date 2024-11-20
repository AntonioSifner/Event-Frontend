import {
  USER_ENDPOINT,
  EVENTS_ENDPOINT,
  ATTENDANCE_ENDPOINT,
  EVENT_TYPES_ENDPOINT,
} from "@/api/endpoints";

export const fetchEvents = async () => {
  try {
    const url = `${EVENTS_ENDPOINT}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching events", response.status);
      console.error("Error fetching events", response.body);
      console.error("Error fetching events", response);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const deleteEvent = async (eventID, userToken) => {
  try {
    const url = `${EVENTS_ENDPOINT}/${eventID}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.ok) {
      const data = await response.text();
      return response.status;
    } else {
      console.error("Error deleting event", response.status);
      console.error("Error deleting event", response.body);
      console.error("Error deleting event", response);
    }
  } catch (error) {
    console.error("Error deleting event", error);
  }
};

export const fetchUserData = async (userID) => {
  try {
    const url = `${USER_ENDPOINT}/${userID}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      console.error("Error fetching user data:", response.status);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const removeUserFromEvent = async (eventId, userId, userToken) => {
  try {
    const url = `${ATTENDANCE_ENDPOINT}`;
    const userAttendance = JSON.stringify({
      eventId,
      userId,
    });
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: userAttendance,
    });

    if (response.ok) {
      const data = await response.text();
      return response.status;
    } else {
      console.error("Error deleting event", response.status);
      console.error("Error deleting event", response.body);
      console.error("Error deleting event", await response.text());
    }
  } catch (error) {
    console.error("Error deleting event", error);
  }
};

export const addUserToEvent = async (eventId, userId, userToken) => {
  try {
    const url = `${ATTENDANCE_ENDPOINT}`;

    const userAttendance = JSON.stringify({
      eventId,
      userId,
    });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: userAttendance,
    });

    if (response.ok) {
      const data = await response.text();
      return response.status;
    } else {
      console.error("Error adding event", response.status);
      console.error("Error adding event", response.body);
      console.error("Error adding event", response);
    }
  } catch (error) {
    console.error("Error adding event", error);
  }
};

export const fetchEventTypes = async () => {
  const url = `${EVENT_TYPES_ENDPOINT}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const eventTypes = await response.json();
      return eventTypes;
    } else {
      console.error("Error fetching event types", response.status);
      console.error("Error fetching event types", response);
    }
  } catch (error) {
    console.error("Error fetching event types", error);
  }
};

export const addEventType = async (name, userToken) => {
  try {
    const url = `${EVENT_TYPES_ENDPOINT}`;
    const eventTypeData = JSON.stringify({
      name,
    });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: eventTypeData,
    });

    if (response.ok) {
      const data = await response.text();
      return response.status;
    } else {
      console.error("Error adding event type", response.status);
      console.error("Error adding event type", response);
    }
  } catch (error) {
    console.error("Error adding event type", error);
  }
};

export const removeEventType = async (eventTypeId, userToken) => {
  try {
    const url = `${EVENT_TYPES_ENDPOINT}/${eventTypeId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.ok) {
      const data = await response.text();
      return response.status;
    } else {
      console.error("Error deleting event type", response.status);
      console.error("Error deleting event type", response);
    }
  } catch (error) {
    console.error("Error deleting event type", error);
  }
};

export const updateUser = async (userID, userToken, userData) => {
  try {
    const url = `${USER_ENDPOINT}/${userID}`;
    const userDataJSON = JSON.stringify(userData);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: userDataJSON,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error updating user data", response.status);
      console.error("Error updating user data", response);
    }
  } catch (error) {
    console.error("Error updating user data", error);
  }
};
