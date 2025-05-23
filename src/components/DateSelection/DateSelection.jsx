import React from "react";
import { format, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { IconButton } from "@/components";

export default function DateSelection({ date, setDate, onContinue, onBack }) {
  const handleChange = (selectedDate) => {
    if (selectedDate && isValid(selectedDate)) {
      setDate(selectedDate);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-bold">Sélectionner une date</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Choisissez la date à laquelle vous souhaitez venir. Les billets ne sont
        valables que pour la date sélectionnée.
      </p>
      <div className="mb-6 ">
        <div className="custom-datepicker-wrapper">
          <style>{`
    .react-datepicker {
 
    max-width: 100% !important;
    display: flex;
    justify-content: center;
}
  .react-datepicker__month-container {
    font-family: 'Inter', sans-serif;
  }
  .react-datepicker__header {
    background-color: white;
    border-bottom: 1px solid #f3f4f6;
  }
  .react-datepicker__day--selected {
    background-color: #2563eb !important;
    border-radius: 9999px;
  }
  .react-datepicker__day:hover {
    border-radius: 9999px;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: rgba(37, 99, 235, 0.2);
    border-radius: 9999px;
  }
  .react-datepicker-wrapper {
    width: 100%;
  }
  .custom-datepicker-wrapper {
    display: flex;
    justify-content: center;
  }
    .react-datepicker__day {
  width: 3rem;
  line-height: 3rem;
  font-size: 1.1rem;
}
    
`}</style>
          <DatePicker
            selected={date}
            onChange={handleChange}
            minDate={new Date()}
            locale={fr}
            dateFormat="dd/MM/yyyy"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholderText="Sélectionnez une date"
            previousMonthButtonLabel={<ChevronLeft size={16} />}
            nextMonthButtonLabel={<ChevronRight size={16} />}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex items-center justify-between px-2 py-2">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type="button"
                  className={`p-1 rounded-full ${
                    prevMonthButtonDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-lg font-medium">
                  {format(date, "MMMM yyyy", { locale: fr })}
                </span>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type="button"
                  className={`p-1 rounded-full ${
                    nextMonthButtonDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
            inline
          />
        </div>
      </div>

      {date && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-blue-50 border border-blue-100 rounded-lg mb-6"
        >
          <p className="font-medium text-blue-900">
            Date sélectionnée :{" "}
            {format(date, "EEEE d MMMM yyyy", { locale: fr })}
          </p>
        </motion.div>
      )}

      <div>
        <IconButton icon={ChevronRight} onClick={onContinue} color="blue">
          Suivant
        </IconButton>
        <IconButton icon={ChevronLeft} onClick={onBack} color="transparent">
          Retour
        </IconButton>
      </div>
    </div>
  );
}
