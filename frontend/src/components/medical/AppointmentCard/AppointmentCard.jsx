import React from "react";
import "./AppointmentCard.css";
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Button from "../../common/Button/Button"; // шлях з medical → common → Button

const AppointmentCard = ({ appointment, onCancel, onViewDetails, userRole }) => {
  // Форматування дати та часу
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });

  // Стилі для різних статусів
  const statusConfig = {
    pending: {
      border: "card--pending",
      color: "badge--pending",
      icon: <AlertCircle className="icon icon--pending" size={18} />,
    },
    confirmed: {
      border: "card--confirmed",
      color: "badge--confirmed",
      icon: <CheckCircle className="icon icon--confirmed" size={18} />,
    },
    cancelled: {
      border: "card--cancelled",
      color: "badge--cancelled",
      icon: <XCircle className="icon icon--cancelled" size={18} />,
    },
    completed: {
      border: "card--completed",
      color: "badge--completed",
      icon: <CheckCircle className="icon icon--completed" size={18} />,
    },
  };

  const status = statusConfig[appointment.status] || statusConfig.pending;

  return (
    <div className={`appointment-card ${status.border}`}>
      <div className="appointment-card__header">
        <div className="appointment-card__status">
          {status.icon}
          <span className={`badge ${status.color}`}>{appointment.status}</span>
        </div>
        <div className="appointment-card__date">
          <Calendar size={16} />
          {formatDate(appointment.date)}
        </div>
      </div>

      <div className="appointment-card__info">
        <div className="info-row">
          <Clock size={16} />
          <span>
            {formatTime(appointment.date)}, {appointment.duration} хв
          </span>
        </div>

        <div className="info-row">
          <User size={16} />
          {userRole === "patient"
            ? `${appointment.doctor.name} (${appointment.doctor.specialization})`
            : appointment.patient.name}
        </div>

        <p className="info-text">Тип прийому: {appointment.type}</p>
        {appointment.reason && (
          <p className="info-text">Причина візиту: {appointment.reason}</p>
        )}
      </div>

      <div className="appointment-card__buttons">
        <Button onClick={() => onViewDetails(appointment.id)}>Деталі</Button>

        {appointment.status !== "cancelled" &&
          appointment.status !== "completed" && (
            <Button
              onClick={() => onCancel(appointment.id)}
              className="btn--cancel"
            >
              Скасувати
            </Button>
          )}
      </div>
    </div>
  );
};

export default AppointmentCard;
